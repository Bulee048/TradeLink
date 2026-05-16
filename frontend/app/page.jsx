"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    search: "",
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJobs(filters);
      setJobs(data.data);
      setIsDemo(data.isMock || false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 text-center animate-fade-in">
        {isDemo && (
          <div className="mb-8 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-700 text-sm font-bold animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Demo Mode: Using local data as MongoDB is connecting...
          </div>
        )}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Connecting <span className="gradient-text">Trade Experts</span><br />
            with Local Homes
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
            The UK's most trusted service request board. Post jobs in seconds, 
            browse verified listings, and get the job done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/jobs/new"
              className="btn-primary px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-100 min-w-[200px]"
            >
              Post a Job Request
            </Link>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                +1k
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-400 ml-2">Join 1,000+ local users</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="glass p-6 md:p-8 rounded-3xl card-shadow border border-gray-100 flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-2 px-1">
            Find specific work
          </label>
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by keyword, skill, or detail..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-64">
          <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2 px-1">
            Expertise
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-4 pr-10 text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none appearance-none cursor-pointer"
            >
              <option>All</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Painting</option>
              <option>Joinery</option>
              <option>Other</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-indigo-600 font-bold animate-pulse">Scanning live requests...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Connection Issue</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button onClick={fetchJobs} className="px-6 py-3 bg-white border border-red-200 rounded-xl font-bold text-red-700 hover:bg-red-50 transition-colors">
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching jobs</h3>
            <p className="text-gray-500">We couldn't find any results for your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
