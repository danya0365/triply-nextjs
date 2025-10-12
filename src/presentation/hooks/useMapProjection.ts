/**
 * useMapProjection Hook
 * Business logic for coordinate projection
 * Converts lat/lng to SVG x/y coordinates
 */

import { useMemo } from "react";
import { useMapStore } from "@/src/store/mapStore";
import { project, unproject } from "@/src/utils/map/projections";
import type { LatLng, Point } from "@/src/utils/map/coordinates";
import type { ProjectionOptions } from "@/src/utils/map/projections";

export function useMapProjection() {
  const { width, height, bounds, projectionType, zoom, center } = useMapStore();

  /**
   * Projection options
   */
  const projectionOptions: ProjectionOptions = useMemo(
    () => ({
      width,
      height,
      bounds,
      type: projectionType,
    }),
    [width, height, bounds, projectionType]
  );

  /**
   * Project lat/lng to SVG x/y
   */
  const projectPoint = useMemo(
    () => (latLng: LatLng): Point => {
      // Apply zoom and pan
      const projected = project(latLng, projectionOptions);

      // Apply zoom
      const centerPoint = project(center, projectionOptions);
      const dx = (projected.x - centerPoint.x) * zoom;
      const dy = (projected.y - centerPoint.y) * zoom;

      return {
        x: centerPoint.x + dx,
        y: centerPoint.y + dy,
      };
    },
    [projectionOptions, zoom, center]
  );

  /**
   * Unproject SVG x/y to lat/lng
   */
  const unprojectPoint = useMemo(
    () => (point: Point): LatLng => {
      // Reverse zoom
      const centerPoint = project(center, projectionOptions);
      const dx = (point.x - centerPoint.x) / zoom;
      const dy = (point.y - centerPoint.y) / zoom;

      const adjustedPoint: Point = {
        x: centerPoint.x + dx,
        y: centerPoint.y + dy,
      };

      return unproject(adjustedPoint, projectionOptions);
    },
    [projectionOptions, zoom, center]
  );

  /**
   * Get viewBox for SVG
   */
  const viewBox = useMemo(() => {
    const padding = 50;
    return `${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}`;
  }, [width, height]);

  /**
   * Check if point is visible in viewport
   */
  const isPointVisible = useMemo(
    () => (point: Point): boolean => {
      return (
        point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height
      );
    },
    [width, height]
  );

  return {
    projectPoint,
    unprojectPoint,
    viewBox,
    isPointVisible,
    width,
    height,
  };
}
