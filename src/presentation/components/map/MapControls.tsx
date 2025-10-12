/**
 * MapControls Component
 * Pure UI component for map control buttons
 * No business logic - only receives callbacks
 */

"use client";

export interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleFullscreen?: () => void;
  currentZoom: number;
  minZoom?: number;
  maxZoom?: number;
  showFullscreen?: boolean;
  className?: string;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
  currentZoom,
  minZoom = 0.5,
  maxZoom = 10,
  showFullscreen = false,
  className = "",
}: MapControlsProps) {
  const canZoomIn = currentZoom < maxZoom;
  const canZoomOut = currentZoom > minZoom;

  return (
    <div className={`map-controls flex flex-col gap-2 ${className}`}>
      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-110"
        title="ซูมเข้า (+)"
        aria-label="Zoom in"
      >
        <span className="text-xl font-bold text-gray-700 dark:text-gray-300">+</span>
      </button>

      {/* Zoom Level Display */}
      <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
          {currentZoom.toFixed(1)}x
        </span>
      </div>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-110"
        title="ซูมออก (-)"
        aria-label="Zoom out"
      >
        <span className="text-xl font-bold text-gray-700 dark:text-gray-300">−</span>
      </button>

      {/* Reset Zoom */}
      <button
        onClick={onResetZoom}
        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
        title="รีเซ็ตซูม (0)"
        aria-label="Reset zoom"
      >
        <span className="text-lg text-gray-700 dark:text-gray-300">⊙</span>
      </button>

      {/* Fullscreen (optional) */}
      {showFullscreen && onToggleFullscreen && (
        <>
          <div className="h-px bg-gray-300 dark:bg-gray-600 my-1" />
          <button
            onClick={onToggleFullscreen}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
            title="เต็มจอ"
            aria-label="Toggle fullscreen"
          >
            <span className="text-lg text-gray-700 dark:text-gray-300">⛶</span>
          </button>
        </>
      )}
    </div>
  );
}
