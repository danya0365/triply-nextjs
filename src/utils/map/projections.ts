/**
 * Map Projection Utilities
 * Advanced projection calculations for map rendering
 */

import type { LatLng, Point, MapBounds } from "./coordinates";

export type ProjectionType = "mercator" | "equirectangular";

export interface ProjectionOptions {
  width: number;
  height: number;
  bounds: MapBounds;
  type: ProjectionType;
}

/**
 * Mercator projection (Web Mercator / EPSG:3857)
 * Better for visualizing at zoom levels
 */
export function mercatorProjection(
  latLng: LatLng,
  options: ProjectionOptions
): Point {
  const { lat, lng } = latLng;
  const { width, height, bounds } = options;

  // Convert to radians
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  // Mercator projection
  const x = lngRad;
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

  // Normalize to bounds
  const westRad = (bounds.west * Math.PI) / 180;
  const eastRad = (bounds.east * Math.PI) / 180;
  const northRad = (bounds.north * Math.PI) / 180;
  const southRad = (bounds.south * Math.PI) / 180;

  const yNorth = Math.log(Math.tan(Math.PI / 4 + northRad / 2));
  const ySouth = Math.log(Math.tan(Math.PI / 4 + southRad / 2));

  const xNorm = (x - westRad) / (eastRad - westRad);
  const yNorm = (yNorth - y) / (yNorth - ySouth);

  return {
    x: xNorm * width,
    y: yNorm * height,
  };
}

/**
 * Equirectangular projection (Plate Carrée)
 * Simple linear projection, good for small areas
 */
export function equirectangularProjection(
  latLng: LatLng,
  options: ProjectionOptions
): Point {
  const { lat, lng } = latLng;
  const { width, height, bounds } = options;

  const xNorm = (lng - bounds.west) / (bounds.east - bounds.west);
  const yNorm = (bounds.north - lat) / (bounds.north - bounds.south);

  return {
    x: xNorm * width,
    y: yNorm * height,
  };
}

/**
 * Project coordinates based on projection type
 */
export function project(latLng: LatLng, options: ProjectionOptions): Point {
  switch (options.type) {
    case "mercator":
      return mercatorProjection(latLng, options);
    case "equirectangular":
    default:
      return equirectangularProjection(latLng, options);
  }
}

/**
 * Inverse projection: Point to LatLng
 */
export function unproject(point: Point, options: ProjectionOptions): LatLng {
  const { x, y } = point;
  const { width, height, bounds, type } = options;

  if (type === "equirectangular") {
    const lng = bounds.west + (x / width) * (bounds.east - bounds.west);
    const lat = bounds.north - (y / height) * (bounds.north - bounds.south);
    return { lat, lng };
  }

  // Mercator inverse
  const westRad = (bounds.west * Math.PI) / 180;
  const eastRad = (bounds.east * Math.PI) / 180;
  const northRad = (bounds.north * Math.PI) / 180;
  const southRad = (bounds.south * Math.PI) / 180;

  const yNorth = Math.log(Math.tan(Math.PI / 4 + northRad / 2));
  const ySouth = Math.log(Math.tan(Math.PI / 4 + southRad / 2));

  const xNorm = x / width;
  const yNorm = y / height;

  const lngRad = westRad + xNorm * (eastRad - westRad);
  const yVal = yNorth - yNorm * (yNorth - ySouth);

  const latRad = 2 * Math.atan(Math.exp(yVal)) - Math.PI / 2;

  return {
    lat: (latRad * 180) / Math.PI,
    lng: (lngRad * 180) / Math.PI,
  };
}

/**
 * Calculate scale at a given latitude (for Mercator)
 */
export function calculateScale(lat: number): number {
  return 1 / Math.cos((lat * Math.PI) / 180);
}

/**
 * Get optimal projection for bounds
 */
export function getOptimalProjection(bounds: MapBounds): ProjectionType {
  const latRange = bounds.north - bounds.south;

  // Use Mercator for larger areas (better distortion handling)
  if (latRange > 20) {
    return "mercator";
  }

  // Use Equirectangular for smaller areas (simpler, faster)
  return "equirectangular";
}
