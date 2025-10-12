/**
 * MapTooltip Component
 * Pure UI component for displaying tooltip on hover
 * No business logic - only receives data and renders
 */

"use client";

import type { Destination } from "@/src/data/master/destinations.master";

export interface MapTooltipProps {
  destination: Destination;
  x: number;
  y: number;
  visible: boolean;
}

export function MapTooltip({ destination, x, y, visible }: MapTooltipProps) {
  if (!visible) return null;

  // Adjust position to avoid edges
  const tooltipWidth = 200;
  const tooltipHeight = 120;
  const padding = 10;

  // Simple positioning (can be improved)
  const adjustedX = x + tooltipWidth > window.innerWidth ? x - tooltipWidth - padding : x + padding;
  const adjustedY = y + tooltipHeight > window.innerHeight ? y - tooltipHeight - padding : y + padding;

  return (
    <div
      className="fixed z-50 pointer-events-none animate-in fade-in zoom-in duration-200"
      style={{
        left: adjustedX,
        top: adjustedY,
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border-2 border-sky-200 dark:border-sky-800 max-w-xs">
        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {destination.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>📍</span>
          <span>{destination.country}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
          {destination.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Popularity */}
        <div className="flex items-center gap-1 mt-2 text-xs text-yellow-600 dark:text-yellow-400">
          <span>⭐</span>
          <span className="font-bold">{destination.popularityScore}</span>
        </div>

        {/* Arrow pointer */}
        <div
          className="absolute w-3 h-3 bg-white dark:bg-gray-800 border-l-2 border-b-2 border-sky-200 dark:border-sky-800 transform rotate-45"
          style={{
            left: x > adjustedX ? "-6px" : "auto",
            right: x <= adjustedX ? "-6px" : "auto",
            top: "20px",
          }}
        />
      </div>
    </div>
  );
}
