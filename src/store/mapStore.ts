/**
 * Map Store - Zustand
 * Global state management for Interactive Map
 * Following Clean Architecture: separate business logic from UI
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Destination } from "@/src/data/master/destinations.master";
import type { LatLng, Point, MapBounds } from "@/src/utils/map/coordinates";
import { THAILAND_BOUNDS, getBoundsCenter } from "@/src/utils/map/coordinates";

export type MapRegion = "thailand" | "southeast-asia" | "all";
export type ProjectionType = "mercator" | "equirectangular";

export interface MapMarker {
  id: string;
  destinationId: string;
  position: LatLng;
  type: "city" | "beach" | "mountain" | "cultural";
  size: "small" | "medium" | "large";
  priority: number;
  icon?: string;
  color?: string;
}

export interface MapState {
  // View settings
  region: MapRegion;
  zoom: number;
  center: LatLng;
  bounds: MapBounds;
  projectionType: ProjectionType;

  // Map dimensions
  width: number;
  height: number;
  viewBox: string;

  // Markers
  markers: MapMarker[];
  visibleMarkers: MapMarker[];

  // Interaction state
  selectedMarkerId: string | null;
  hoveredMarkerId: string | null;
  isDragging: boolean;
  dragStart: Point | null;

  // UI state
  showControls: boolean;
  showLegend: boolean;
  showLabels: boolean;
  isLoading: boolean;

  // Filter
  destinationFilter: string[];
  typeFilter: string[];
}

export interface MapActions {
  // Region & View
  setRegion: (region: MapRegion) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: LatLng) => void;
  setBounds: (bounds: MapBounds) => void;
  setProjectionType: (type: ProjectionType) => void;

  // Map dimensions
  setDimensions: (width: number, height: number) => void;

  // Zoom actions
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // Pan actions
  startDrag: (point: Point) => void;
  updateDrag: (point: Point) => void;
  endDrag: () => void;
  panTo: (center: LatLng) => void;

  // Markers
  setMarkers: (markers: MapMarker[]) => void;
  updateVisibleMarkers: () => void;
  selectMarker: (markerId: string | null) => void;
  hoverMarker: (markerId: string | null) => void;
  getMarkerById: (markerId: string) => MapMarker | undefined;

  // Destinations
  loadDestinations: (destinations: Destination[]) => void;
  focusDestination: (destinationId: string) => void;

  // UI controls
  setShowControls: (show: boolean) => void;
  setShowLegend: (show: boolean) => void;
  setShowLabels: (show: boolean) => void;
  setLoading: (loading: boolean) => void;

  // Filters
  setDestinationFilter: (filter: string[]) => void;
  setTypeFilter: (filter: string[]) => void;
  clearFilters: () => void;

  // Reset
  reset: () => void;
}

export type MapStore = MapState & MapActions;

// Initial state
const initialState: MapState = {
  // View settings
  region: "thailand",
  zoom: 1,
  center: getBoundsCenter(THAILAND_BOUNDS),
  bounds: THAILAND_BOUNDS,
  projectionType: "equirectangular",

  // Map dimensions
  width: 1000,
  height: 1000,
  viewBox: "0 0 1000 1000",

  // Markers
  markers: [],
  visibleMarkers: [],

  // Interaction state
  selectedMarkerId: null,
  hoveredMarkerId: null,
  isDragging: false,
  dragStart: null,

  // UI state
  showControls: true,
  showLegend: true,
  showLabels: true,
  isLoading: false,

  // Filters
  destinationFilter: [],
  typeFilter: [],
};

// Zoom constraints
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 10;
const ZOOM_STEP = 0.5;

/**
 * Map Store using Zustand
 */
export const useMapStore = create<MapStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Region & View
      setRegion: (region) => {
        set({ region }, false, "map/setRegion");
        get().updateVisibleMarkers();
      },

      setZoom: (zoom) => {
        const clampedZoom = Math.max(ZOOM_MIN, Math.min(zoom, ZOOM_MAX));
        set({ zoom: clampedZoom }, false, "map/setZoom");
        get().updateVisibleMarkers();
      },

      setCenter: (center) => {
        set({ center }, false, "map/setCenter");
      },

      setBounds: (bounds) => {
        set({ bounds }, false, "map/setBounds");
      },

      setProjectionType: (projectionType) => {
        set({ projectionType }, false, "map/setProjectionType");
      },

      // Map dimensions
      setDimensions: (width, height) => {
        set(
          {
            width,
            height,
            viewBox: `0 0 ${width} ${height}`,
          },
          false,
          "map/setDimensions"
        );
      },

      // Zoom actions
      zoomIn: () => {
        const { zoom } = get();
        get().setZoom(zoom + ZOOM_STEP);
      },

      zoomOut: () => {
        const { zoom } = get();
        get().setZoom(zoom - ZOOM_STEP);
      },

      resetZoom: () => {
        set({ zoom: 1 }, false, "map/resetZoom");
        get().updateVisibleMarkers();
      },

      // Pan actions
      startDrag: (point) => {
        set(
          {
            isDragging: true,
            dragStart: point,
          },
          false,
          "map/startDrag"
        );
      },

      updateDrag: (point) => {
        const { isDragging, dragStart, center, zoom, bounds } = get();

        if (!isDragging || !dragStart) return;

        // Calculate delta
        const dx = point.x - dragStart.x;
        const dy = point.y - dragStart.y;

        // Convert pixel delta to lat/lng delta
        const latDelta = (dy / get().height) * (bounds.north - bounds.south) / zoom;
        const lngDelta = (dx / get().width) * (bounds.east - bounds.west) / zoom;

        // Update center
        const newCenter: LatLng = {
          lat: center.lat - latDelta,
          lng: center.lng - lngDelta,
        };

        set(
          {
            center: newCenter,
            dragStart: point,
          },
          false,
          "map/updateDrag"
        );
      },

      endDrag: () => {
        set(
          {
            isDragging: false,
            dragStart: null,
          },
          false,
          "map/endDrag"
        );
      },

      panTo: (center) => {
        set({ center }, false, "map/panTo");
      },

      // Markers
      setMarkers: (markers) => {
        set({ markers }, false, "map/setMarkers");
        get().updateVisibleMarkers();
      },

      updateVisibleMarkers: () => {
        const { markers, bounds, destinationFilter, typeFilter } = get();

        let visible = markers;

        // Filter by bounds
        visible = visible.filter((marker) => {
          const { lat, lng } = marker.position;
          return (
            lat >= bounds.south &&
            lat <= bounds.north &&
            lng >= bounds.west &&
            lng <= bounds.east
          );
        });

        // Filter by destination
        if (destinationFilter.length > 0) {
          visible = visible.filter((marker) =>
            destinationFilter.includes(marker.destinationId)
          );
        }

        // Filter by type
        if (typeFilter.length > 0) {
          visible = visible.filter((marker) => typeFilter.includes(marker.type));
        }

        set({ visibleMarkers: visible }, false, "map/updateVisibleMarkers");
      },

      selectMarker: (markerId) => {
        set({ selectedMarkerId: markerId }, false, "map/selectMarker");
      },

      hoverMarker: (markerId) => {
        set({ hoveredMarkerId: markerId }, false, "map/hoverMarker");
      },

      getMarkerById: (markerId) => {
        return get().markers.find((m) => m.id === markerId);
      },

      // Destinations
      loadDestinations: (destinations) => {
        // Convert destinations to markers
        const markers: MapMarker[] = destinations.map((dest) => ({
          id: `marker-${dest.id}`,
          destinationId: dest.id,
          position: dest.coordinates,
          type: getMarkerType(dest.tags),
          size: getMarkerSize(dest.popularityScore),
          priority: dest.popularityScore,
          icon: getMarkerIcon(dest.tags[0]),
          color: getMarkerColor(dest.region),
        }));

        get().setMarkers(markers);
      },

      focusDestination: (destinationId) => {
        const marker = get().markers.find((m) => m.destinationId === destinationId);
        if (marker) {
          get().panTo(marker.position);
          get().selectMarker(marker.id);
          get().setZoom(4);
        }
      },

      // UI controls
      setShowControls: (show) => {
        set({ showControls: show }, false, "map/setShowControls");
      },

      setShowLegend: (show) => {
        set({ showLegend: show }, false, "map/setShowLegend");
      },

      setShowLabels: (show) => {
        set({ showLabels: show }, false, "map/setShowLabels");
      },

      setLoading: (loading) => {
        set({ isLoading: loading }, false, "map/setLoading");
      },

      // Filters
      setDestinationFilter: (filter) => {
        set({ destinationFilter: filter }, false, "map/setDestinationFilter");
        get().updateVisibleMarkers();
      },

      setTypeFilter: (filter) => {
        set({ typeFilter: filter }, false, "map/setTypeFilter");
        get().updateVisibleMarkers();
      },

      clearFilters: () => {
        set(
          {
            destinationFilter: [],
            typeFilter: [],
          },
          false,
          "map/clearFilters"
        );
        get().updateVisibleMarkers();
      },

      // Reset
      reset: () => {
        set({ ...initialState }, false, "map/reset");
      },
    }),
    { name: "MapStore" }
  )
);

// Helper functions
function getMarkerType(tags: string[]): MapMarker["type"] {
  if (tags.includes("beach") || tags.includes("island")) return "beach";
  if (tags.includes("mountain") || tags.includes("nature")) return "mountain";
  if (tags.includes("culture") || tags.includes("historical")) return "cultural";
  return "city";
}

function getMarkerSize(popularityScore: number): MapMarker["size"] {
  if (popularityScore >= 90) return "large";
  if (popularityScore >= 75) return "medium";
  return "small";
}

function getMarkerIcon(tag: string): string {
  const iconMap: Record<string, string> = {
    beach: "🏖️",
    island: "🏝️",
    mountain: "⛰️",
    nature: "🌳",
    city: "🏙️",
    culture: "🏛️",
    historical: "🏰",
    food: "🍜",
    shopping: "🛍️",
    adventure: "🎿",
  };

  return iconMap[tag] || "📍";
}

function getMarkerColor(region: string): string {
  const colorMap: Record<string, string> = {
    "Southeast Asia": "#06b6d4",
    "East Asia": "#f59e0b",
    "South Asia": "#8b5cf6",
    "Central Asia": "#10b981",
  };

  return colorMap[region] || "#3b82f6";
}
