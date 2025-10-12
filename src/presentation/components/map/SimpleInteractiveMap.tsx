/**
 * SimpleInteractiveMap - Working Version
 * Simplified map that actually works!
 */

"use client";

import { useState } from "react";
import type { Destination } from "@/src/data/master/destinations.master";
import { THAILAND_BORDER_PATH } from "@/src/data/maps/thailand.data";

export interface SimpleInteractiveMapProps {
  destinations: Destination[];
  height?: string;
  onDestinationClick?: (destination: Destination) => void;
}

export function SimpleInteractiveMap({
  destinations,
  height = "600px",
  onDestinationClick,
}: SimpleInteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Thailand bounds
  const bounds = {
    north: 20.463194,
    south: 5.612851,
    east: 105.639389,
    west: 97.343396,
  };

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 1000;

  // Convert lat/lng to x/y (simple projection)
  const latLngToXY = (lat: number, lng: number) => {
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * svgWidth;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * svgHeight;
    return { x, y };
  };

  // Filter Thailand destinations only
  const thailandDestinations = destinations.filter(
    (d) => d.country === "ประเทศไทย" || d.country === "Thailand"
  );

  // Handle zoom
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.3, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.3, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.5, Math.min(z + delta, 3)));
  };

  // Handle marker click
  const handleMarkerClick = (destination: Destination) => {
    setSelectedId(destination.id);
    onDestinationClick?.(destination);
  };

  return (
    <div className="relative" style={{ height }}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center font-bold text-xl"
        >
          +
        </button>
        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-xs font-bold">
          {zoom.toFixed(1)}x
        </div>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center font-bold text-xl"
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
        >
          ⊙
        </button>
      </div>

      {/* Info */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
        <div className="text-sm font-bold">
          📍 {thailandDestinations.length} จุดหมาย
        </div>
      </div>

      {/* Map */}
      <div
        className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
            fill="#e0f2fe"
            opacity="0.5"
          />

          {/* Thailand Map */}
          <g transform="translate(-50, -50)">
            <path
              d={THAILAND_BORDER_PATH}
              fill="#f0fdf4"
              stroke="#94a3b8"
              strokeWidth="2"
            />
          </g>

          {/* Markers */}
          {thailandDestinations.map((dest) => {
            const { x, y } = latLngToXY(dest.coordinates.lat, dest.coordinates.lng);
            const isSelected = selectedId === dest.id;
            const isHovered = hoveredId === dest.id;
            const size = dest.popularityScore >= 90 ? 16 : dest.popularityScore >= 75 ? 12 : 10;

            return (
              <g
                key={dest.id}
                transform={`translate(${x}, ${y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(dest);
                }}
                onMouseEnter={() => setHoveredId(dest.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  cursor: "pointer",
                  transform: isSelected || isHovered ? "scale(1.3)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                {/* Pulse for selected */}
                {isSelected && (
                  <circle
                    r={size + 5}
                    fill="#06b6d4"
                    opacity="0.3"
                    className="animate-ping"
                  />
                )}

                {/* Shadow */}
                <circle
                  r={size}
                  fill="rgba(0,0,0,0.2)"
                  transform="translate(0, 2)"
                  filter="blur(2px)"
                />

                {/* Main marker */}
                <circle
                  r={size}
                  fill={isSelected ? "#06b6d4" : "#3b82f6"}
                  stroke="white"
                  strokeWidth="2"
                />

                {/* Icon */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={size * 1.2}
                  style={{ pointerEvents: "none" }}
                >
                  📍
                </text>

                {/* Label on hover */}
                {isHovered && !isDragging && (
                  <g transform="translate(0, -30)">
                    <rect
                      x="-60"
                      y="-25"
                      width="120"
                      height="40"
                      fill="white"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      rx="8"
                      filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                    />
                    <text
                      textAnchor="middle"
                      y="-12"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#111827"
                    >
                      {dest.name}
                    </text>
                    <text
                      textAnchor="middle"
                      y="2"
                      fontSize="10"
                      fill="#6b7280"
                    >
                      ⭐ {dest.popularityScore}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>🖱️ ลากเพื่อเลื่อน</strong> | <strong>🔍 Scroll เพื่อซูม</strong> | 
          <strong> 👆 คลิกจุดหมายเพื่อดูรายละเอียด</strong>
        </p>
        <p className="mt-1 text-xs">
          Selected: {selectedId ? destinations.find(d => d.id === selectedId)?.name : "None"}
        </p>
      </div>
    </div>
  );
}
