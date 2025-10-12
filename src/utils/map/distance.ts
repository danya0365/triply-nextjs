/**
 * Distance Calculation Utilities
 * Calculate distances between coordinates using Haversine formula
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} ม.`;
  }
  return `${km.toFixed(1)} กม.`;
}

/**
 * Calculate total distance for a route (multiple points)
 */
export function calculateRouteDistance(
  coordinates: Array<{ lat: number; lng: number }>
): number {
  if (coordinates.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const dist = calculateDistance(
      coordinates[i].lat,
      coordinates[i].lng,
      coordinates[i + 1].lat,
      coordinates[i + 1].lng
    );
    totalDistance += dist;
  }

  return Math.round(totalDistance * 10) / 10;
}

/**
 * Estimate travel time (rough approximation)
 * Assumes average speed of 60 km/h
 */
export function estimateTravelTime(distanceKm: number): string {
  const hours = distanceKm / 60; // Average speed 60 km/h
  
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} นาที`;
  }
  
  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);
  
  if (minutes === 0) {
    return `${fullHours} ชั่วโมง`;
  }
  
  return `${fullHours} ชม. ${minutes} นาที`;
}
