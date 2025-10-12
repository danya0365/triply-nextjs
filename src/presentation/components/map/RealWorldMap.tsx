/**
 * RealWorldMap - Using actual world.svg with real lat/lng projection
 * No fake coordinates - everything is accurate!
 */

"use client";

import type { Destination } from "@/src/data/master/destinations.master";
import { clusterDestinations, type Cluster } from "@/src/utils/map/clustering";
import {
  calculateDistance,
  formatDistance,
  calculateRouteDistance,
  estimateTravelTime,
} from "@/src/utils/map/distance";
import { useMemo, useRef, useState } from "react";

const maxZoom = 30;
const minZoom = 1;

export interface RealWorldMapProps {
  destinations: Destination[];
  height?: string;
  onDestinationClick?: (destination: Destination) => void;
}

export function RealWorldMap({
  destinations,
  height = "600px",
  onDestinationClick,
}: RealWorldMapProps) {
  const [zoom, setZoom] = useState(minZoom);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<"all" | "thailand" | "sea">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [enableClustering, setEnableClustering] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [showMinimap, setShowMinimap] = useState(true);
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<
    Array<{ lat: number; lng: number; name: string }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // World SVG dimensions (from world.svg)
  const svgWidth = 1009.6727;
  const svgHeight = 665.96301;

  // GeoViewBox from world.svg: -169.110266 83.600842 190.486279 -58.508473
  // Format: [west(minLng), north(maxLat), east(maxLng), south(minLat)]
  const geoViewBox = {
    west: -169.110266,
    north: 83.600842,
    east: 190.486279,
    south: -58.508473,
  };

  /**
   * Convert lat/lng to SVG x/y coordinates
   * Using the geoViewBox from world.svg
   *
   * IMPORTANT: Mercator-like projection adjustment
   */
  const latLngToXY = (lat: number, lng: number) => {
    // Normalize longitude to 0-1
    const xNorm = (lng - geoViewBox.west) / (geoViewBox.east - geoViewBox.west);

    // Mercator projection for Y (to match how world maps work)
    // Convert to radians
    const latRad = (lat * Math.PI) / 180;
    const mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

    // Normalize bounds
    const northRad = (geoViewBox.north * Math.PI) / 180;
    const southRad = (geoViewBox.south * Math.PI) / 180;
    const mercatorNorth = Math.log(Math.tan(Math.PI / 4 + northRad / 2));
    const mercatorSouth = Math.log(Math.tan(Math.PI / 4 + southRad / 2));

    // Normalize to 0-1 (inverted because SVG y goes down)
    const yNorm = (mercatorNorth - mercatorY) / (mercatorNorth - mercatorSouth);

    return {
      x: xNorm * svgWidth,
      y: yNorm * svgHeight,
    };
  };

  // Handle zoom with center point calculation
  const handleZoomIn = () => {
    if (zoom >= maxZoom) return;
    zoomToCenter(zoom + 0.5);
  };

  const handleZoomOut = () => {
    if (zoom <= minZoom) return;
    zoomToCenter(zoom - 0.5);
  };

  const handleResetZoom = () => {
    setZoom(minZoom);
    setOffset({ x: 0, y: 0 });
  };

  // Zoom to center of viewport
  const zoomToCenter = (newZoom: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;

    // Calculate map center in current coordinates
    const mapCenterX = (centerX - offset.x) / zoom;
    const mapCenterY = (centerY - offset.y) / zoom;

    // Calculate new offset to keep center point
    const newOffset = {
      x: centerX - mapCenterX * newZoom,
      y: centerY - mapCenterY * newZoom,
    };

    setZoom(newZoom);
    setOffset(newOffset);
  };

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel zoom at mouse position
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    const newZoom = Math.max(minZoom, Math.min(zoom + delta, maxZoom));

    if (newZoom === zoom) return;

    // Get mouse position relative to container
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate point in map coordinates
    const mapX = (mouseX - offset.x) / zoom;
    const mapY = (mouseY - offset.y) / zoom;

    // Calculate new offset to zoom at mouse position
    const newOffset = {
      x: mouseX - mapX * newZoom,
      y: mouseY - mapY * newZoom,
    };

    setZoom(newZoom);
    setOffset(newOffset);
  };

  // Handle marker click
  const handleMarkerClick = (destination: Destination, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(destination.id);
    onDestinationClick?.(destination);
  };

  // Get marker size based on popularity
  const getMarkerSize = (popularity: number) => {
    if (popularity >= 90) return 8;
    if (popularity >= 75) return 6;
    return 5;
  };

  // Get marker color based on region
  const getMarkerColor = (destination: Destination) => {
    if (
      destination.country === "ประเทศไทย" ||
      destination.country === "Thailand"
    ) {
      return "#10b981"; // Green for Thailand
    }
    return "#3b82f6"; // Blue for others
  };

  // Filter destinations
  const filteredDestinations = destinations.filter((dest) => {
    // Region filter
    if (regionFilter === "thailand") {
      if (dest.country !== "ประเทศไทย" && dest.country !== "Thailand")
        return false;
    } else if (regionFilter === "sea") {
      if (!dest.region.includes("Southeast Asia")) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        dest.name.toLowerCase().includes(query) ||
        dest.nameEn.toLowerCase().includes(query) ||
        dest.country.toLowerCase().includes(query) ||
        dest.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Focus on a specific destination
  const focusOnDestination = (destination: Destination) => {
    const { x, y } = latLngToXY(
      destination.coordinates.lat,
      destination.coordinates.lng
    );

    if (!containerRef.current) return;

    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;

    // Set zoom and position to center on destination
    const newZoom = 3;
    const newOffset = {
      x: centerX - x * newZoom,
      y: centerY - y * newZoom,
    };

    setZoom(newZoom);
    setOffset(newOffset);
    setSelectedId(destination.id);
  };

  // Cluster destinations based on zoom level
  const clusters = useMemo(() => {
    if (!enableClustering) {
      return filteredDestinations.map((dest) => ({
        id: `cluster-${dest.id}`,
        center: dest.coordinates,
        destinations: [dest],
        count: 1,
      }));
    }
    return clusterDestinations(filteredDestinations, zoom);
  }, [filteredDestinations, zoom, enableClustering]);

  // Handle cluster click
  const handleClusterClick = (cluster: Cluster, e: React.MouseEvent) => {
    e.stopPropagation();

    if (cluster.count === 1) {
      // Single destination
      const dest = cluster.destinations[0];
      setSelectedId(dest.id);
      onDestinationClick?.(dest);
    } else {
      // Multiple destinations - zoom in to expand cluster
      const { x, y } = latLngToXY(cluster.center.lat, cluster.center.lng);

      if (!containerRef.current) return;
      const container = containerRef.current;
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;

      const newZoom = Math.min(zoom + 1, 5);
      const newOffset = {
        x: centerX - x * newZoom,
        y: centerY - y * newZoom,
      };

      setZoom(newZoom);
      setOffset(newOffset);
    }
  };

  // Toggle destination for route
  const toggleDestinationForRoute = (destId: string) => {
    setSelectedDestinations((prev) => {
      if (prev.includes(destId)) {
        return prev.filter((id) => id !== destId);
      }
      return [...prev, destId].slice(-5); // Max 5 destinations
    });
  };

  // Handle measure mode
  const toggleMeasurePoint = (destination: Destination) => {
    setMeasurePoints((prev) => {
      const exists = prev.find(
        (p) =>
          p.lat === destination.coordinates.lat &&
          p.lng === destination.coordinates.lng
      );

      if (exists) {
        // Remove point
        return prev.filter((p) => p !== exists);
      }

      // Add point (max 10)
      return [
        ...prev,
        {
          lat: destination.coordinates.lat,
          lng: destination.coordinates.lng,
          name: destination.name,
        },
      ].slice(-10);
    });
  };

  // Calculate total distance in measure mode
  const totalMeasureDistance = useMemo(() => {
    if (measurePoints.length < 2) return 0;
    return calculateRouteDistance(measurePoints);
  }, [measurePoints]);

  return (
    <div className="relative" style={{ height }}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= maxZoom}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center font-bold text-xl transition-all hover:scale-110"
          title="ซูมเข้า"
        >
          +
        </button>
        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
          {zoom.toFixed(1)}x
        </div>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center font-bold text-xl transition-all hover:scale-110"
          title="ซูมออก"
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-lg transition-all hover:scale-110"
          title="รีเซ็ท"
        >
          ⊙
        </button>
        <div className="h-px bg-gray-300 dark:bg-gray-600 my-1" />
        <button
          onClick={() => setShowList(!showList)}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center text-xl transition-all hover:scale-110"
          title="รายการจุดหมาย"
        >
          📋
        </button>
      </div>

      {/* Feature Toggles (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setEnableClustering(!enableClustering)}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all text-sm font-medium ${
            enableClustering
              ? "bg-sky-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          title="เปิด/ปิด Clustering"
        >
          {enableClustering ? "🔵" : "⚪"} Cluster
        </button>
        <button
          onClick={() => {
            setShowRoutes(!showRoutes);
            if (showRoutes) setSelectedDestinations([]);
          }}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all text-sm font-medium ${
            showRoutes
              ? "bg-purple-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          title="เปิด/ปิด เส้นทาง"
        >
          {showRoutes ? "🟣" : "⚪"} เส้นทาง
        </button>
        <button
          onClick={() => {
            setMeasureMode(!measureMode);
            if (measureMode) setMeasurePoints([]);
          }}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all text-sm font-medium ${
            measureMode
              ? "bg-orange-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          title="วัดระยะทาง"
        >
          {measureMode ? "🟠" : "⚪"} วัดระยะ
        </button>
        <button
          onClick={() => setShowMinimap(!showMinimap)}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all text-sm font-medium ${
            showMinimap
              ? "bg-teal-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          title="เปิด/ปิด Minimap"
        >
          {showMinimap ? "🟦" : "⚪"} Minimap
        </button>
        {showRoutes && selectedDestinations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 text-xs">
            <div className="font-bold text-gray-900 dark:text-white mb-1">
              เลือกแล้ว {selectedDestinations.length}/5
            </div>
            <button
              onClick={() => setSelectedDestinations([])}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              ล้างทั้งหมด
            </button>
          </div>
        )}
        {measureMode && measurePoints.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 text-xs max-w-[150px]">
            <div className="font-bold text-gray-900 dark:text-white mb-1">
              📐 จุด: {measurePoints.length}
            </div>
            {measurePoints.length >= 2 && (
              <>
                <div className="text-orange-600 dark:text-orange-400 font-bold">
                  {formatDistance(totalMeasureDistance)}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-[10px]">
                  ⏱️ {estimateTravelTime(totalMeasureDistance)}
                </div>
              </>
            )}
            <button
              onClick={() => setMeasurePoints([])}
              className="text-red-500 hover:text-red-700 text-xs mt-1"
            >
              ล้าง
            </button>
          </div>
        )}
      </div>

      {/* Top Bar - Region Filter & Search */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {/* Region Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setRegionFilter("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              regionFilter === "all"
                ? "bg-sky-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            🌍 ทั้งหมด
          </button>
          <button
            onClick={() => setRegionFilter("thailand")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              regionFilter === "thailand"
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            🇹🇭 ไทย
          </button>
          <button
            onClick={() => setRegionFilter("sea")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              regionFilter === "sea"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            🌏 เอเชียตะวันออกเฉียงใต้
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <input
            type="text"
            placeholder="🔍 ค้นหาจุดหมาย..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Info Badge */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2">
          <div className="text-sm font-bold text-gray-900 dark:text-white">
            📍 แสดง {filteredDestinations.length} / {destinations.length}{" "}
            จุดหมาย
          </div>
          {selectedId && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              เลือก: {destinations.find((d) => d.id === selectedId)?.name}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={containerRef}
        className="w-full h-full bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden relative"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Map Layer (scales with zoom) */}
        <div
          ref={mapRef}
          style={{
            position: "absolute",
            left: offset.x,
            top: offset.y,
            width: svgWidth * zoom,
            height: svgHeight * zoom,
            transition: isDragging ? "none" : "all 0.3s ease-out",
          }}
        >
          {/* World SVG */}
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <image
              href="/world.svg"
              width={svgWidth}
              height={svgHeight}
              preserveAspectRatio="none"
              style={{ pointerEvents: "none" }}
            />
          </svg>
        </div>

        {/* Measure Lines Layer */}
        {measureMode && measurePoints.length > 1 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            {measurePoints.slice(0, -1).map((point, index) => {
              const point2 = measurePoints[index + 1];
              const p1 = latLngToXY(point.lat, point.lng);
              const p2 = latLngToXY(point2.lat, point2.lng);

              const x1 = p1.x * zoom + offset.x;
              const y1 = p1.y * zoom + offset.y;
              const x2 = p2.x * zoom + offset.x;
              const y2 = p2.y * zoom + offset.y;

              const distance = calculateDistance(
                point.lat,
                point.lng,
                point2.lat,
                point2.lng
              );

              // Midpoint for label
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={`measure-${index}`}>
                  {/* Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                  />
                  {/* Distance label */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-30"
                      y="-12"
                      width="60"
                      height="24"
                      fill="white"
                      stroke="#f97316"
                      strokeWidth="2"
                      rx="4"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#f97316"
                      style={{ pointerEvents: "none" }}
                    >
                      {formatDistance(distance)}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        )}

        {/* Routes Layer */}
        {showRoutes && selectedDestinations.length > 1 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            {selectedDestinations.slice(0, -1).map((destId, index) => {
              const dest1 = destinations.find((d) => d.id === destId);
              const dest2 = destinations.find(
                (d) => d.id === selectedDestinations[index + 1]
              );

              if (!dest1 || !dest2) return null;

              const point1 = latLngToXY(
                dest1.coordinates.lat,
                dest1.coordinates.lng
              );
              const point2 = latLngToXY(
                dest2.coordinates.lat,
                dest2.coordinates.lng
              );

              const x1 = point1.x * zoom + offset.x;
              const y1 = point1.y * zoom + offset.y;
              const x2 = point2.x * zoom + offset.x;
              const y2 = point2.y * zoom + offset.y;

              return (
                <g key={`route-${index}`}>
                  {/* Shadow */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth="6"
                    strokeDasharray="5,5"
                  />
                  {/* Main line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="10"
                      to="0"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                  {/* Arrow */}
                  <circle cx={x2} cy={y2} r="4" fill="#a855f7" />
                </g>
              );
            })}
          </svg>
        )}

        {/* Markers/Clusters Layer (fixed size, separate from map) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {clusters.map((cluster) => {
            const { x, y } = latLngToXY(cluster.center.lat, cluster.center.lng);

            // Transform position with zoom and offset
            const markerX = x * zoom + offset.x;
            const markerY = y * zoom + offset.y;

            const isSingleDestination = cluster.count === 1;
            const dest = cluster.destinations[0];
            const isSelected = selectedId === dest.id;
            const isHovered = hoveredId === dest.id;
            const isInRoute =
              showRoutes && selectedDestinations.includes(dest.id);
            const isInMeasure =
              measureMode &&
              measurePoints.some(
                (p) =>
                  p.lat === dest.coordinates.lat &&
                  p.lng === dest.coordinates.lng
              );
            const size = isSingleDestination
              ? getMarkerSize(dest.popularityScore)
              : 10;
            
            let color = isSingleDestination
              ? getMarkerColor(dest)
              : "#f59e0b";
            
            if (isInMeasure) color = "#f97316"; // Orange for measure

            return (
              <div
                key={cluster.id}
                onClick={(e) => {
                  if (measureMode && isSingleDestination) {
                    e.stopPropagation();
                    toggleMeasurePoint(dest);
                  } else if (showRoutes && isSingleDestination) {
                    e.stopPropagation();
                    toggleDestinationForRoute(dest.id);
                  } else if (isSingleDestination) {
                    handleMarkerClick(dest, e);
                  } else {
                    handleClusterClick(cluster, e);
                  }
                }}
                onMouseEnter={() =>
                  isSingleDestination && setHoveredId(dest.id)
                }
                onMouseLeave={() => isSingleDestination && setHoveredId(null)}
                style={{
                  position: "absolute",
                  left: markerX,
                  top: markerY,
                  transform: isSingleDestination
                    ? `translate(-50%, -100%) scale(${
                        isSelected || isHovered || isInRoute || isInMeasure
                          ? 1.3
                          : 1
                      })`
                    : `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
                  transformOrigin: isSingleDestination
                    ? "center bottom"
                    : "center",
                  transition: isDragging
                    ? "none"
                    : "transform 0.2s ease-in-out",
                  cursor: "pointer",
                  zIndex: isSelected ? 100 : isHovered ? 50 : 10,
                  pointerEvents: "auto",
                }}
              >
                {isSingleDestination ? (
                  /* Single Pin Icon */
                  <svg width={size * 4} height={size * 5} viewBox="0 0 24 32">
                    {/* Shadow */}
                    <ellipse
                      cx="12"
                      cy="30"
                      rx="4"
                      ry="2"
                      fill="rgba(0,0,0,0.3)"
                      opacity="0.5"
                    />

                    {/* Pin */}
                    <path
                      d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"
                      fill={color}
                      stroke="white"
                      strokeWidth="2"
                    />

                    {/* Center dot */}
                    <circle cx="12" cy="8" r="3" fill="white" />

                    {/* Pulse animation for selected/route/measure */}
                    {(isSelected || isInRoute || isInMeasure) && (
                      <circle
                        cx="12"
                        cy="8"
                        r="6"
                        fill={
                          isInMeasure
                            ? "#f97316"
                            : isInRoute
                            ? "#a855f7"
                            : color
                        }
                        opacity="0.4"
                        className="animate-ping"
                      />
                    )}

                    {/* Route indicator */}
                    {isInRoute && (
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                      />
                    )}

                    {/* Measure indicator */}
                    {isInMeasure && (
                      <>
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="2"
                        />
                        <text
                          x="12"
                          y="8"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="10"
                          fontWeight="bold"
                          fill="#f97316"
                        >
                          {measurePoints.findIndex(
                            (p) =>
                              p.lat === dest.coordinates.lat &&
                              p.lng === dest.coordinates.lng
                          ) + 1}
                        </text>
                      </>
                    )}
                  </svg>
                ) : (
                  /* Cluster Marker */
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    {/* Outer ring */}
                    <circle
                      cx="30"
                      cy="30"
                      r="28"
                      fill={color}
                      opacity="0.2"
                      className="animate-pulse"
                    />

                    {/* Main circle */}
                    <circle
                      cx="30"
                      cy="30"
                      r="20"
                      fill={color}
                      stroke="white"
                      strokeWidth="3"
                    />

                    {/* Count */}
                    <text
                      x="30"
                      y="30"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="14"
                      fontWeight="bold"
                      fill="white"
                      style={{ pointerEvents: "none" }}
                    >
                      {cluster.count}
                    </text>
                  </svg>
                )}

                {/* Label on hover */}
                {isSingleDestination &&
                  (isHovered || isSelected) &&
                  !isDragging && (
                    <div
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      style={{ pointerEvents: "none" }}
                    >
                      <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-2xl border-2 border-sky-300 dark:border-sky-700">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {dest.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {dest.country} · ⭐ {dest.popularityScore}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Destination List Panel */}
      {showList && (
        <div className="absolute right-20 top-4 bottom-4 w-80 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                📍 รายการจุดหมาย
              </h3>
              <button
                onClick={() => setShowList(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              คลิกเพื่อโฟกัสบนแผนที่
            </p>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredDestinations.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="text-sm">ไม่พบจุดหมาย</div>
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => focusOnDestination(dest)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedId === dest.id
                        ? "bg-sky-100 dark:bg-sky-900/30 border-2 border-sky-500"
                        : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="text-2xl">
                        {getMarkerColor(dest) === "#10b981" ? "🟢" : "🔵"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 dark:text-white truncate">
                          {dest.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {dest.country}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">
                            ⭐ {dest.popularityScore}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {dest.tags[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Minimap */}
      {showMinimap && (
        <div className="absolute top-4 right-20 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-2 border-2 border-gray-300 dark:border-gray-600">
          <div className="w-40 h-28 relative bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded overflow-hidden">
            {/* Mini world map */}
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            >
              <image
                href="/world.svg"
                width={svgWidth}
                height={svgHeight}
                opacity="0.3"
              />
              {/* Show all destinations as tiny dots */}
              {filteredDestinations.map((dest) => {
                const { x, y } = latLngToXY(
                  dest.coordinates.lat,
                  dest.coordinates.lng
                );
                return (
                  <circle
                    key={dest.id}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={getMarkerColor(dest)}
                    opacity="0.8"
                  />
                );
              })}
              {/* Viewport box */}
              <rect
                x={-offset.x / zoom}
                y={-offset.y / zoom}
                width={
                  (containerRef.current?.clientWidth || 800) / zoom
                }
                height={
                  (containerRef.current?.clientHeight || 600) / zoom
                }
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                opacity="0.7"
              />
            </svg>
            <div className="absolute bottom-1 left-1 text-[8px] font-bold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-1 rounded">
              {zoom.toFixed(1)}x
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>🖱️ ลากเพื่อเลื่อน</strong> |{" "}
          <strong>🔍 Scroll เพื่อซูม</strong> |
          <strong> 👆 คลิกจุดหมายเพื่อดูรายละเอียด</strong> |
          <strong> 📋 คลิกรายการเพื่อโฟกัส</strong>
        </p>
        <p className="text-xs mt-1 text-gray-500">
          แผนที่ SVG จริง + พิกัด Lat/Lng · กรอง/ค้นหา · Clustering · เส้นทาง ·
          📐 วัดระยะ · 🗺️ Minimap
        </p>
      </div>
    </div>
  );
}
