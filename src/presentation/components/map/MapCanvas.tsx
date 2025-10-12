/**
 * MapCanvas Component
 * Pure UI component for rendering SVG map
 * No business logic - only receives props and renders
 */

"use client";

import { THAILAND_BORDER_PATH, THAILAND_MAP_COLORS } from "@/src/data/maps/thailand.data";

export interface MapCanvasProps {
  viewBox: string;
  width: number;
  height: number;
  theme?: "light" | "dark";
  showGrid?: boolean;
  className?: string;
}

export function MapCanvas({
  viewBox,
  width,
  height,
  theme = "light",
  showGrid = false,
  className = "",
}: MapCanvasProps) {
  const colors = THAILAND_MAP_COLORS[theme];

  return (
    <svg
      viewBox={viewBox}
      width="100%"
      height="100%"
      className={`map-canvas ${className}`}
      style={{
        maxWidth: width,
        maxHeight: height,
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Definitions */}
      <defs>
        {/* Grid Pattern */}
        {showGrid && (
          <pattern
            id="map-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={colors.border}
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
        )}

        {/* Gradient for water */}
        <linearGradient id="water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.water} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.water} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="url(#water-gradient)"
      />

      {/* Grid (optional) */}
      {showGrid && (
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#map-grid)"
        />
      )}

      {/* Thailand Map */}
      <g id="map-countries">
        <path
          d={THAILAND_BORDER_PATH}
          fill={colors.land}
          stroke={colors.border}
          strokeWidth="2"
          className="transition-colors duration-300"
          transform="scale(0.8) translate(100, 50)"
        />
      </g>
    </svg>
  );
}
