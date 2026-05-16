import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-11 h-11">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-[6px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg border border-indigo-400/30 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <path d="M14 6L20 12L14 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12H10C7.79086 12 6 13.7909 6 16V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 18L4 12L10 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                  <path d="M4 12H14C16.2091 12 18 10.2091 18 8V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                </svg>
              </div>
            </div>
            <Link href="/" className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
              Trade<span className="text-indigo-600 group-hover:text-purple-600 transition-colors duration-300">Link</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/jobs/new"
              className="btn-primary inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-xl text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
