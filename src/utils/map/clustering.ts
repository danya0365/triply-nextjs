/**
 * Map Clustering Utilities
 * Groups nearby markers into clusters for better visualization
 */

import type { Destination } from "@/src/data/master/destinations.master";

export interface Cluster {
  id: string;
  center: { lat: number; lng: number };
  destinations: Destination[];
  count: number;
}

/**
 * Simple clustering algorithm
 * Groups destinations within a distance threshold
 */
export function clusterDestinations(
  destinations: Destination[],
  zoom: number,
  maxDistance: number = 100 // pixels
): Cluster[] {
  // Don't cluster at high zoom levels
  if (zoom >= 3) {
    return destinations.map((dest) => ({
      id: `cluster-${dest.id}`,
      center: dest.coordinates,
      destinations: [dest],
      count: 1,
    }));
  }

  const clusters: Cluster[] = [];
  const used = new Set<string>();

  destinations.forEach((dest) => {
    if (used.has(dest.id)) return;

    // Start new cluster
    const cluster: Cluster = {
      id: `cluster-${dest.id}-${Date.now()}`,
      center: dest.coordinates,
      destinations: [dest],
      count: 1,
    };

    used.add(dest.id);

    // Find nearby destinations
    destinations.forEach((other) => {
      if (used.has(other.id)) return;
      if (dest.id === other.id) return;

      const distance = calculateDistance(
        dest.coordinates,
        other.coordinates
      );

      // Adjust threshold based on zoom
      const threshold = maxDistance / (zoom * zoom);

      if (distance < threshold) {
        cluster.destinations.push(other);
        cluster.count++;
        used.add(other.id);

        // Update cluster center (average)
        const totalLat = cluster.destinations.reduce(
          (sum, d) => sum + d.coordinates.lat,
          0
        );
        const totalLng = cluster.destinations.reduce(
          (sum, d) => sum + d.coordinates.lng,
          0
        );
        cluster.center = {
          lat: totalLat / cluster.count,
          lng: totalLng / cluster.count,
        };
      }
    });

    clusters.push(cluster);
  });

  return clusters;
}

/**
 * Calculate distance between two points (rough approximation)
 */
function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const latDiff = point1.lat - point2.lat;
  const lngDiff = point1.lng - point2.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}
