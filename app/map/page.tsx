"use client";

import { RealWorldMap } from "@/src/presentation/components/map/RealWorldMap";
import { DESTINATIONS } from "@/src/data/master/destinations.master";

/**
 * Map Page - Full screen interactive map
 * Shows all destinations on custom SVG map
 */
export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🗺️ แผนที่จุดหมายท่องเที่ยว
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            สำรวจ {DESTINATIONS.length} จุดหมายบนแผนที่ไทย - แผนที่ SVG ออกแบบเอง ไม่มีค่าใช้จ่าย!
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="container mx-auto px-4 py-8">
        <RealWorldMap
          destinations={DESTINATIONS}
          height="calc(100vh - 250px)"
          onDestinationClick={(destination) => {
            console.log("Clicked destination:", destination);
            alert(`คุณเลือก: ${destination.name}\nLat: ${destination.coordinates.lat}, Lng: ${destination.coordinates.lng}`);
            // Optional: Navigate to destination page
            // window.location.href = `/destinations/${destination.slug}`;
          }}
        />

        {/* Debug Info */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📊 ข้อมูลแผนที่
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">จำนวนจุดหมาย</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {DESTINATIONS.length}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">ประเทศไทย</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {DESTINATIONS.filter(d => d.country === "ประเทศไทย").length}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">ต่างประเทศ</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {DESTINATIONS.filter(d => d.country !== "ประเทศไทย").length}
              </div>
            </div>
          </div>

          {/* Coordinates Debug */}
          <div className="mt-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
              🎯 ตรวจสอบพิกัด (Lat/Lng)
            </h4>
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">จุดหมาย</th>
                    <th className="px-3 py-2 text-left">Lat</th>
                    <th className="px-3 py-2 text-left">Lng</th>
                    <th className="px-3 py-2 text-left">ประเทศ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {DESTINATIONS.map((dest) => (
                    <tr key={dest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-3 py-2 font-medium">{dest.name}</td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                        {dest.coordinates.lat.toFixed(4)}
                      </td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                        {dest.coordinates.lng.toFixed(4)}
                      </td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                        {dest.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
