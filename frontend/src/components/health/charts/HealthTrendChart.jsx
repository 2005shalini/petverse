import React from "react";
import { motion } from "framer-motion";

const METRIC_CONFIG = {
  weight: {
    label: "Weight (kg)",
    color: "#10b981"
  },
  healthScore: {
    label: "Health Score",
    color: "#6366f1"
  },
  heartRate: {
    label: "Heart Rate (bpm)",
    color: "#f43f5e"
  }
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function HealthTrendChart({
  data = [],
  metrics = ["weight", "healthScore"],
  height = 220
}) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100"
        style={{ height }}
      >
        <p className="text-sm font-semibold text-slate-400">No trend data available yet.</p>
      </div>
    );
  }

  // Sort chronologically
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Chart dimensions
  const width = 500;
  const paddingX = 45;
  const paddingY = 30;
  const chartHeight = height;

  const pointsCount = sortedData.length;

  // Render multiple line paths
  return (
    <div className="w-full">
      <div className="overflow-x-auto scrollbar-none">
        <div className="min-w-[450px]">
          <svg viewBox={`0 0 ${width} ${chartHeight}`} width="100%" height={chartHeight} className="overflow-visible">
            <defs>
              {metrics.map((metric) => {
                const cfg = METRIC_CONFIG[metric];
                if (!cfg) return null;
                return (
                  <React.Fragment key={metric}>
                    <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={cfg.color} stopOpacity={0.0} />
                    </linearGradient>
                  </React.Fragment>
                );
              })}
            </defs>

            {/* Grid lines (3 lines) */}
            {[0.25, 0.5, 0.75].map((ratio, idx) => {
              const y = paddingY + ratio * (chartHeight - paddingY * 2);
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Draw Area & Lines for each metric */}
            {metrics.map((metric) => {
              const cfg = METRIC_CONFIG[metric];
              if (!cfg) return null;

              // Find min and max for this metric to scale properly
              const values = sortedData.map(d => d[metric] || d.weight || 0);
              const minVal = Math.max(0, Math.min(...values) - (metric === "healthScore" ? 5 : 2));
              const maxVal = Math.max(...values) + (metric === "healthScore" ? 5 : 2);

              const points = sortedData.map((d, index) => {
                const val = d[metric] || d.weight || 0;
                const x = paddingX + (index / Math.max(1, pointsCount - 1)) * (width - paddingX * 2);
                const ratio = (val - minVal) / (maxVal - minVal || 1);
                const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                return { x, y, value: val, date: d.date };
              });

              let linePath = "";
              let areaPath = "";

              if (points.length > 0) {
                linePath = `M ${points[0].x} ${points[0].y}`;
                for (let i = 1; i < points.length; i++) {
                  const cpX1 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
                  const cpY1 = points[i - 1].y;
                  const cpX2 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
                  const cpY2 = points[i].y;
                  linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
                }
                areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;
              }

              return (
                <g key={metric}>
                  {/* Fill Area */}
                  {points.length > 0 && (
                    <motion.path
                      d={areaPath}
                      fill={`url(#grad-${metric})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}

                  {/* Stroke Line */}
                  {points.length > 0 && (
                    <motion.path
                      d={linePath}
                      fill="none"
                      stroke={cfg.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  )}

                  {/* Points Dots */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={4}
                        fill="#ffffff"
                        stroke={cfg.color}
                        strokeWidth={2}
                      />
                      {/* Only label last point or points when hovered */}
                      {(idx === points.length - 1 || idx === 0) && (
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          fill={cfg.color}
                          fontSize={9}
                          fontWeight="extrabold"
                          textAnchor="middle"
                        >
                          {pt.value}
                        </text>
                      )}
                    </g>
                  ))}
                </g>
              );
            })}

            {/* X Axis Labels */}
            {sortedData.map((d, index) => {
              const x = paddingX + (index / Math.max(1, pointsCount - 1)) * (width - paddingX * 2);
              return (
                <text
                  key={index}
                  x={x}
                  y={chartHeight - 8}
                  fill="#94a3b8"
                  fontSize={8}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {formatDate(d.date)}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 flex-wrap">
        {metrics.map((metric) => {
          const cfg = METRIC_CONFIG[metric];
          if (!cfg) return null;
          return (
            <div key={metric} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
              <span className="text-[10px] font-bold text-slate-500 uppercase">{cfg.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
