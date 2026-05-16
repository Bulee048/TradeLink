import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function JobCard({ job }) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <Link
              href={`/jobs/${job._id}`}
              className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {job.title}
            </Link>
          </div>
          <div className="ml-4 flex-shrink-0">
            <StatusBadge status={job.status} />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {job.category}
          </span>
          <div className="flex items-center text-sm text-gray-500 bg-slate-50 px-2.5 py-0.5 rounded-lg border border-slate-100">
            <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location || "Remote"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {job.contactName ? job.contactName.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">{job.contactName || "Anonymous"}</p>
              <p className="text-[10px] text-gray-400">Requestor</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Posted</p>
            <p className="text-xs font-medium text-gray-600">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
