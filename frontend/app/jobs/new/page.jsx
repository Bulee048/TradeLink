"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JobForm from "@/components/JobForm";
import { createJob } from "@/lib/api";

export default function NewJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createJob(formData);
      router.push(`/jobs/${response.data._id}`);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to jobs
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
        
        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
