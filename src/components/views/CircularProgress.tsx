export function CircularProgress({ value, max, color, label, lCount, pCount, percentText }: { value: number, max: number, color: string, label: string, lCount: number, pCount: number, percentText: string, key?: any }) {
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  const colorClasses = {
    violet: {
      stroke: "stroke-violet-500",
      track: "stroke-violet-100",
      text: "text-violet-600",
      border: "border-violet-200",
      badge: "bg-violet-500 text-white"
    },
    sky: {
      stroke: "stroke-sky-500",
      track: "stroke-sky-100",
      text: "text-sky-600",
      border: "border-sky-200",
      badge: "bg-sky-500 text-white"
    },
    emerald: {
      stroke: "stroke-emerald-500",
      track: "stroke-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
      badge: "bg-emerald-500 text-white"
    },
    rose: {
      stroke: "stroke-rose-500",
      track: "stroke-rose-100",
      text: "text-rose-600",
      border: "border-rose-200",
      badge: "bg-rose-500 text-white"
    }
  }[color as 'violet' | 'sky' | 'emerald' | 'rose'] || {
    stroke: "stroke-sky-500",
    track: "stroke-sky-100",
    text: "text-sky-600",
    border: "border-sky-200",
    badge: "bg-sky-500 text-white"
  };

  return (
    <div className={`bg-white border ${colorClasses.border} rounded-2xl p-6 shadow-sm flex flex-col items-center justify-between space-y-4 hover:shadow-md transition duration-300`} id={`stat-circle-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <h4 className="text-xs font-sans font-black uppercase tracking-wider text-slate-800 text-center min-h-[32px] flex items-center justify-center">
        {label}
      </h4>

      {/* SVG Circle indicator */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            className={`fill-transparent ${colorClasses.track}`}
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={50}
            cy={50}
          />
          {/* Active progress */}
          <circle
            className={`fill-transparent ${colorClasses.stroke} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={50}
            cy={50}
          />
        </svg>
        {/* Inner label */}
        <div className="absolute text-center space-y-0.5">
          <div className="text-base font-serif font-black text-slate-900 leading-none">
            {value} PM
          </div>
          <div className="text-[10px] font-sans font-extrabold text-slate-500">
            L: {lCount} P: {pCount}
          </div>
        </div>
      </div>

      {/* Capaian badge */}
      <div className={`w-full text-center py-1 rounded-lg text-[9px] font-sans font-black tracking-wider uppercase ${colorClasses.badge}`}>
        Capaian {value} PM ({percentText})
      </div>
    </div>
  );
}
