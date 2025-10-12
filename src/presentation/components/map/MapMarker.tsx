/**
 * MapMarker Component
 * Pure UI component for rendering map markers
 * No business logic - only receives props and renders
 */

"use client";

import { memo } from "react";
import type { MapMarker as MapMarkerType } from "@/src/store/mapStore";

export interface MapMarkerProps {
  marker: MapMarkerType;
  x: number;
  y: number;
  isSelected?: boolean;
  isHovered?: boolean;
  isVisible?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function MapMarkerComponent({
  marker,
  x,
  y,
  isSelected = false,
  isHovered = false,
  isVisible = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: MapMarkerProps) {
  if (!isVisible) return null;

  const { size, icon, color, priority } = marker;

  // Size mapping
  const sizeMap = {
    small: 24,
    medium: 32,
    large: 40,
  };

  const radius = sizeMap[size] / 2;
  const scale = isSelected ? 1.3 : isHovered ? 1.15 : 1;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="map-marker cursor-pointer"
      style={{
        transformOrigin: "center",
        transform: `scale(${scale})`,
        transition: "transform 0.2s ease-in-out",
        zIndex: isSelected ? 1000 : priority,
      }}
    >
      {/* Pulse animation for selected marker */}
      {isSelected && (
        <circle
          cx="0"
          cy="0"
          r={radius + 5}
          fill={color}
          opacity="0.3"
          className="animate-ping"
        />
      )}

      {/* Shadow */}
      <circle
        cx="0"
        cy="2"
        r={radius}
        fill="rgba(0,0,0,0.2)"
        filter="blur(3px)"
      />

      {/* Main circle */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={color || "#3b82f6"}
        stroke="white"
        strokeWidth="3"
        className="transition-all duration-200"
        style={{
          filter: isHovered || isSelected ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : "none",
        }}
      />

      {/* Icon */}
      <text
        x="0"
        y="0"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={radius * 1.2}
        className="pointer-events-none select-none"
      >
        {icon || "📍"}
      </text>

      {/* Priority badge for large markers */}
      {size === "large" && (
        <circle
          cx={radius * 0.7}
          cy={-radius * 0.7}
          r="8"
          fill="#fbbf24"
          stroke="white"
          strokeWidth="2"
        />
      )}
    </g>
  );
}

// Memoize to prevent unnecessary re-renders
export const MapMarker = memo(MapMarkerComponent);
