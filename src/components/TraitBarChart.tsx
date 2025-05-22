import React from 'react';
import type { DomainScore } from '../types';

interface TraitBarChartProps {
  scores: DomainScore[];
}

// Define colors for each domain based on the reference image
const domainColors: { [key: string]: string } = {
  N: '#a78bfa', // Purple
  E: '#3b82f6', // Blue
  O: '#ec4899', // Pink
  A: '#f59e0b', // Orange
  C: '#10b981', // Green
};

const TraitBarChart: React.FC<TraitBarChartProps> = ({ scores }) => {
  // Sort scores to match the order in the reference image (N, E, O, A, C)
  const sortedScores = scores.sort((a, b) => {
    const order = ['N', 'E', 'O', 'A', 'C'];
    return order.indexOf(a.domain) - order.indexOf(b.domain);
  });

  const chartHeight = 200; // Height of the chart area
  const chartWidth = 600; // Width of the chart area
  const padding = 40; // Padding around the chart
  const innerHeight = chartHeight - padding;
  const innerWidth = chartWidth - padding * 2;
  const barWidth = innerWidth / sortedScores.length / 1.5; // Adjust bar width and spacing
  const maxScoreValue = 120; // Max value for the Y-axis based on the reference image

  // Y-axis labels and grid lines
  const yAxisLabels = [0, 20, 40, 60, 80, 100, 120];

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {/* Y-axis and Grid Lines */}
        <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#e5e7eb" strokeWidth="1" /> {/* Y-axis line */}
        <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#e5e7eb" strokeWidth="1" /> {/* X-axis line */}

        {yAxisLabels.map(label => {
          const y = chartHeight - padding - (label / maxScoreValue) * innerHeight;
          return (
            <g key={label}>
              <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
              <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#6b7280">
                {label}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {sortedScores.map((scoreData, index) => {
          const barHeight = (scoreData.score / maxScoreValue) * innerHeight;
          const x = padding + (innerWidth / sortedScores.length) * index + (innerWidth / sortedScores.length - barWidth) / 2;
          const y = chartHeight - padding - barHeight;
          const color = domainColors[scoreData.domain] || '#6b7280'; // Default color if domain not found

          return (
            <g key={scoreData.domain}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx="4" // Rounded corners
                ry="4"
              />
              {/* Score Text */}
              <text
                x={x + barWidth / 2}
                y={y + barHeight / 2 + 5} // Position text in the middle of the bar
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#ffffff" // White text color
              >
                {scoreData.score}
              </text>
              {/* Domain Label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding + 15} // Position label below the x-axis
                textAnchor="middle"
                fontSize="12"
                fill="#4b5563"
              >
                {scoreData.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TraitBarChart;
