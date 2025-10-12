/**
 * Map Coordinate Utilities
 * Handles lat/lng to x/y conversions for SVG rendering
 */

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Thailand geographic bounds
export const THAILAND_BOUNDS: MapBounds = {
  north: 20.463194,
  south: 5.612851,
  east: 105.639389,
  west: 97.343396,
};

// Southeast Asia geographic bounds
export const SOUTHEAST_ASIA_BOUNDS: MapBounds = {
  north: 28.0,
  south: -10.0,
  east: 141.0,
  west: 92.0,
};

// Default SVG dimensions
export const DEFAULT_MAP_WIDTH = 1000;
export const DEFAULT_MAP_HEIGHT = 1000;

/**
 * Convert latitude/longitude to SVG x/y coordinates
 * Uses simple equirectangular projection (suitable for small areas)
 */
export function latLngToPoint(
  latLng: LatLng,
  bounds: MapBounds,
  width: number = DEFAULT_MAP_WIDTH,
  height: number = DEFAULT_MAP_HEIGHT
): Point {
  const { lat, lng } = latLng;
  const { north, south, east, west } = bounds;

  // Normalize to 0-1 range
  const x = (lng - west) / (east - west);
  const y = (north - lat) / (north - south);

  return {
    x: x * width,
    y: y * height,
  };
}

/**
 * Convert SVG x/y coordinates back to latitude/longitude
 */
export function pointToLatLng(
  point: Point,
  bounds: MapBounds,
  width: number = DEFAULT_MAP_WIDTH,
  height: number = DEFAULT_MAP_HEIGHT
): LatLng {
  const { x, y } = point;
  const { north, south, east, west } = bounds;

  // Denormalize from pixel space
  const lng = west + (x / width) * (east - west);
  const lat = north - (y / height) * (north - south);

  return { lat, lng };
}

/**
 * Check if a point is within bounds
 */
export function isInBounds(latLng: LatLng, bounds: MapBounds): boolean {
  const { lat, lng } = latLng;
  const { north, south, east, west } = bounds;

  return lat >= south && lat <= north && lng >= west && lng <= east;
}

/**
 * Calculate distance between two points in kilometers
 * Uses Haversine formula
 */
export function calculateDistance(from: LatLng, to: LatLng): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get center point of bounds
 */
export function getBoundsCenter(bounds: MapBounds): LatLng {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };
}

/**
 * Calculate zoom level to fit bounds in viewport
 */
export function calculateZoomLevel(
  bounds: MapBounds,
  viewportWidth: number,
  viewportHeight: number
): number {
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;

  const latZoom = Math.log2(360 / latDiff);
  const lngZoom = Math.log2(360 / lngDiff);

  return Math.min(latZoom, lngZoom, 10); // Max zoom 10
}

/**
 * Validate coordinates
 */
export function validateLatLng(latLng: LatLng): boolean {
  const { lat, lng } = latLng;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
