/**
 * useMapInteraction Hook
 * Business logic for map interactions (zoom, pan, click)
 * Separates interaction logic from UI components
 */

import { useCallback, useEffect, useRef } from "react";
import { useMapStore } from "@/src/store/mapStore";
import type { Point } from "@/src/utils/map/coordinates";

export interface UseMapInteractionOptions {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableClick?: boolean;
  onMarkerClick?: (markerId: string) => void;
  onMarkerHover?: (markerId: string | null) => void;
}

export function useMapInteraction(options: UseMapInteractionOptions = {}) {
  const {
    enableZoom = true,
    enablePan = true,
    enableClick = true,
    onMarkerClick,
    onMarkerHover,
  } = options;

  const {
    zoom,
    isDragging,
    zoomIn,
    zoomOut,
    resetZoom,
    startDrag,
    updateDrag,
    endDrag,
    selectMarker,
    hoverMarker,
  } = useMapStore();

  const mapRef = useRef<SVGSVGElement>(null);

  /**
   * Handle mouse wheel zoom
   */
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enableZoom) return;

      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = zoom + delta;

      if (newZoom >= 0.5 && newZoom <= 10) {
        if (delta > 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    },
    [enableZoom, zoom, zoomIn, zoomOut]
  );

  /**
   * Handle mouse down (start drag)
   */
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!enablePan) return;
      if (e.button !== 0) return; // Only left click

      const point: Point = {
        x: e.clientX,
        y: e.clientY,
      };

      startDrag(point);
    },
    [enablePan, startDrag]
  );

  /**
   * Handle mouse move (drag)
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !enablePan) return;

      const point: Point = {
        x: e.clientX,
        y: e.clientY,
      };

      updateDrag(point);
    },
    [isDragging, enablePan, updateDrag]
  );

  /**
   * Handle mouse up (end drag)
   */
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      endDrag();
    }
  }, [isDragging, endDrag]);

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback(
    (markerId: string) => {
      if (!enableClick) return;

      selectMarker(markerId);
      onMarkerClick?.(markerId);
    },
    [enableClick, selectMarker, onMarkerClick]
  );

  /**
   * Handle marker hover
   */
  const handleMarkerHover = useCallback(
    (markerId: string | null) => {
      hoverMarker(markerId);
      onMarkerHover?.(markerId);
    },
    [hoverMarker, onMarkerHover]
  );

  /**
   * Handle touch start (mobile)
   */
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enablePan) return;

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const point: Point = {
          x: touch.clientX,
          y: touch.clientY,
        };

        startDrag(point);
      }
    },
    [enablePan, startDrag]
  );

  /**
   * Handle touch move (mobile)
   */
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enablePan) return;

      if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        const point: Point = {
          x: touch.clientX,
          y: touch.clientY,
        };

        updateDrag(point);
      }

      // Pinch zoom
      if (e.touches.length === 2 && enableZoom) {
        e.preventDefault();
        // Calculate pinch distance (implement if needed)
      }
    },
    [enablePan, enableZoom, isDragging, updateDrag]
  );

  /**
   * Handle touch end (mobile)
   */
  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      endDrag();
    }
  }, [isDragging, endDrag]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enableZoom) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
    },
    [enableZoom, zoomIn, zoomOut, resetZoom]
  );

  /**
   * Setup event listeners
   */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Mouse events
    map.addEventListener("wheel", handleWheel, { passive: false });
    map.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch events
    map.addEventListener("touchstart", handleTouchStart, { passive: false });
    map.addEventListener("touchmove", handleTouchMove, { passive: false });
    map.addEventListener("touchend", handleTouchEnd);

    // Keyboard events
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      map.removeEventListener("wheel", handleWheel);
      map.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      map.removeEventListener("touchstart", handleTouchStart);
      map.removeEventListener("touchmove", handleTouchMove);
      map.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  ]);

  return {
    mapRef,
    handleMarkerClick,
    handleMarkerHover,
    isDragging,
    zoom,
  };
}
