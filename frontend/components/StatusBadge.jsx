export default function StatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "In Progress":
        return "bg-amber-100 text-amber-700 border-amber-200 ring-amber-500/20";
      case "Closed":
        return "bg-slate-100 text-slate-600 border-slate-200 ring-slate-500/20";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ring-4 ring-offset-0 ${getStatusStyles(
        status
      )}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === "Open" ? "bg-emerald-500" : 
        status === "In Progress" ? "bg-amber-500" : "bg-slate-400"
      }`}></span>
      {status}
    </span>
  );
}
