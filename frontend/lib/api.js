const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getJobs(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "All") {
    query.append("category", params.category);
  }
  if (params.status) {
    query.append("status", params.status);
  }
  if (params.search) {
    query.append("search", params.search);
  }

  const res = await fetch(`${API_URL}/api/jobs?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch jobs");
  }

  return res.json();
}

export async function getJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch job");
  }

  return res.json();
}

export async function createJob(data) {
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create job");
  }

  return res.json();
}

export async function updateJobStatus(id, status) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update job status");
  }

  return res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete job");
  }

  return res.json();
}
