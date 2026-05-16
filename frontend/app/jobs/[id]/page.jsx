"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { getJob, updateJobStatus, deleteJob } from "@/lib/api";

export default function JobDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const fetchJob = useCallback(async () => {
    try {
      const data = await getJob(id);
      setJob(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    setFeedback({ message: "", type: "" });
    try {
      await updateJobStatus(id, newStatus);
      setJob((prev) => ({ ...prev, status: newStatus }));
      setFeedback({ message: "Status updated successfully!", type: "success" });
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this job request?")) return;

    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Fetching job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">
          Back to Listings
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl transition-all"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all jobs
        </Link>
      </div>

      <div className="bg-white rounded-3xl card-shadow border border-gray-100 overflow-hidden">
        <div className="px-8 py-10 bg-slate-50 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-indigo-600 font-bold uppercase tracking-widest">
                <span>{job.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-gray-400 normal-case tracking-normal font-medium">Ref: {job._id.slice(-8)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                {job.title}
              </h1>
            </div>
            <StatusBadge status={job.status} />
          </div>
          <div className="mt-6 flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </div>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {job.location || "Remote"}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
              Job Description
            </h2>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {job.description}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Requestor Name</p>
                    <p className="font-bold text-gray-900">{job.contactName || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email Address</p>
                    {job.contactEmail ? (
                      <a href={`mailto:${job.contactEmail}`} className="font-bold text-indigo-600 hover:underline">
                        {job.contactEmail}
                      </a>
                    ) : (
                      <p className="font-bold text-gray-900">Not provided</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                Management
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="status" className="block text-xs text-gray-400 mb-2">
                    Modify Current Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      value={job.status}
                      onChange={handleStatusChange}
                      disabled={updating}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-gray-900 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {feedback.message && (
                  <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
                    feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}>
                    {feedback.type === "success" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {feedback.message}
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="hidden sm:block"></div>
            <button
              onClick={handleDelete}
              className="px-8 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
            >
              Delete Job Posting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
