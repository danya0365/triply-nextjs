/**
 * InteractiveMap Component
 * Main map component that orchestrates all map functionality
 * Combines business logic hooks with UI components
 * Following Clean Architecture pattern
 */

"use client";

import { useState, useEffect } from "react";
import type { Destination } from "@/src/data/master/destinations.master";
import { useMapStore } from "@/src/store/mapStore";
import { useMapInteraction } from "@/src/presentation/hooks/useMapInteraction";
import { useMapProjection } from "@/src/presentation/hooks/useMapProjection";
import { useMapData } from "@/src/presentation/hooks/useMapData";
import { MapCanvas } from "./MapCanvas";
import { MapMarker } from "./MapMarker";
import { MapControls } from "./MapControls";
import { MapTooltip } from "./MapTooltip";

export interface InteractiveMapProps {
  destinations: Destination[];
  region?: "thailand" | "southeast-asia" | "all";
  height?: string;
  showControls?: boolean;
  showTooltip?: boolean;
  theme?: "light" | "dark";
  onDestinationClick?: (destination: Destination) => void;
  onDestinationHover?: (destination: Destination | null) => void;
  className?: string;
}

export function InteractiveMap({
  destinations,
  region = "thailand",
  height = "600px",
  showControls = true,
  showTooltip = true,
  theme = "light",
  onDestinationClick,
  onDestinationHover,
  className = "",
}: InteractiveMapProps) {
  // Store state
  const { zoom, zoomIn, zoomOut, resetZoom } = useMapStore();

  // Data hook first
  const {
    visibleMarkers,
    getSelectedDestination,
    getHoveredDestination,
  } = useMapData({
    destinations,
    region,
    autoLoad: true,
  });

  // Projection hook
  const { projectPoint, viewBox, width, height: mapHeight } = useMapProjection();

  // Interaction hook (must be after data is loaded)
  const { mapRef, handleMarkerClick, handleMarkerHover, isDragging } =
    useMapInteraction({
      enableZoom: true,
      enablePan: true,
      enableClick: true,
      onMarkerClick: () => {
        const destination = getSelectedDestination();
        if (destination) {
          onDestinationClick?.(destination);
        }
      },
      onMarkerHover: () => {
        const destination = getHoveredDestination();
        onDestinationHover?.(destination);
      },
    });

  // Local state for tooltip
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const hoveredDestination = getHoveredDestination();
  const selectedDestination = getSelectedDestination();

  // Update tooltip position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`interactive-map relative ${className}`}
      style={{ height }}
    >
      {/* Map Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <svg
          ref={mapRef}
          viewBox={viewBox}
          width="100%"
          height="100%"
          className={`w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "none" }}
        >
          {/* Base Map Canvas */}
          <MapCanvas
            viewBox={viewBox}
            width={width}
            height={mapHeight}
            theme={theme}
            showGrid={false}
          />

          {/* Markers Layer */}
          <g id="markers-layer">
            {visibleMarkers.map((marker) => {
              const point = projectPoint(marker.position);
              const isSelected = selectedDestination?.id === marker.destinationId;
              const isHovered = hoveredDestination?.id === marker.destinationId;

              return (
                <MapMarker
                  key={marker.id}
                  marker={marker}
                  x={point.x}
                  y={point.y}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  isVisible={true}
                  onClick={() => handleMarkerClick(marker.id)}
                  onMouseEnter={() => handleMarkerHover(marker.id)}
                  onMouseLeave={() => handleMarkerHover(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 right-4 z-10">
            <MapControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
              currentZoom={zoom}
              minZoom={0.5}
              maxZoom={10}
            />
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            คำอธิบาย
          </div>
          <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>เมือง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span>ชายหาด</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>ภูเขา</span>
            </div>
          </div>
        </div>

        {/* Info Badge */}
        <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
          <div className="text-sm font-bold text-gray-900 dark:text-white">
            📍 {visibleMarkers.length} จุดหมาย
          </div>
        </div>
      </div>

      {/* Tooltip (outside SVG) */}
      {showTooltip && hoveredDestination && (
        <MapTooltip
          destination={hoveredDestination}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          visible={true}
        />
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          🖱️ <strong>ลากเพื่อเลื่อน</strong> | 🔍 <strong>Scroll เพื่อซูม</strong> | 
          👆 <strong>คลิกจุดหมายเพื่อดูรายละเอียด</strong>
        </p>
      </div>
    </div>
  );
}
