"use client";

import type { AccommodationDetailViewModel } from "@/src/presentation/presenters/accommodation-detail/AccommodationDetailPresenter";
import { useAccommodationDetailPresenter } from "@/src/presentation/presenters/accommodation-detail/useAccommodationDetailPresenter";
import Link from "next/link";

interface AccommodationDetailViewProps {
  initialViewModel: AccommodationDetailViewModel;
}

export function AccommodationDetailView({
  initialViewModel,
}: AccommodationDetailViewProps) {
  const {
    viewModel,
    checkIn,
    checkOut,
    guests,
    setCheckIn,
    setCheckOut,
    setGuests,
    calculateBooking,
    handleBooking,
    openGallery,
  } = useAccommodationDetailPresenter(initialViewModel);

  const {
    accommodation,
    destination,
    type,
    amenities,
    similarAccommodations,
    reviews,
    host,
  } = viewModel;

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">ไม่พบที่พัก</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ที่พักที่คุณกำลังค้นหาไม่มีในระบบ
          </p>
          <Link
            href="/accommodations"
            className="px-6 py-3 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white rounded-lg hover:shadow-lg transition-all"
          >
            กลับไปหน้าค้นหา
          </Link>
        </div>
      </div>
    );
  }

  const booking = calculateBooking();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-br from-teal-500 via-blue-400 to-indigo-500 dark:from-teal-600 dark:via-blue-500 dark:to-indigo-600">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
              {/* Main Image */}
              <div
                className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => openGallery(0)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-blue-100" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    🏨
                  </span>
                </div>
              </div>

              {/* Secondary Images */}
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => openGallery(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              ))}
            </div>

            <button
              onClick={() => openGallery(0)}
              className="mt-6 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2 mx-auto shadow-md hover:shadow-lg"
            >
              <span>📷</span>
              <span>ดูรูปทั้งหมด ({accommodation.images.length + 1} รูป)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {type?.name} • {destination?.name}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {accommodation.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-sky-400 dark:bg-sky-500 text-white font-bold rounded-lg">
                    {accommodation.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({accommodation.reviewCount.toLocaleString()} รีวิว)
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  📍 {accommodation.distanceFromCenter.toFixed(1)} km
                  จากใจกลางเมือง
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  ผู้เข้าพัก
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {accommodation.maxGuests} ท่าน
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  ห้องนอน
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {accommodation.bedrooms} ห้อง
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  เตียง
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {accommodation.beds} เตียง
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  ห้องน้ำ
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {accommodation.bathrooms} ห้อง
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                เกี่ยวกับที่พักนี้
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {accommodation.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {accommodation.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    ✓ {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                สิ่งอำนวยความสะดวก
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">{amenity.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {amenity.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {amenity.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                รีวิวจากผู้เข้าพัก ({reviews.length})
              </h2>
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white font-bold">
                        {review.userName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {review.userName}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm px-2 py-0.5 bg-sky-400 dark:bg-sky-500 text-white rounded">
                            {review.rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString("th-TH")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                เจ้าของที่พัก
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-300 to-violet-300 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {host.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {host.name}
                    </span>
                    {host.verified && (
                      <span className="text-green-500" title="ยืนยันตัวตนแล้ว">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        อัตราตอบกลับ:
                      </span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {host.responseRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        เวลาตอบกลับ:
                      </span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {host.responseTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        ที่พัก:
                      </span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {host.properties} แห่ง
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        คะแนนเฉลี่ย:
                      </span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {host.averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {similarAccommodations.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ที่พักอื่นๆ ในบริเวณนี้
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {similarAccommodations.map((acc) => (
                    <Link
                      key={acc.id}
                      href={`/accommodations/${acc.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-40 bg-gradient-to-br from-sky-200 to-violet-200 dark:from-sky-300/20 dark:to-violet-300/20" />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                          {acc.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-sky-400 dark:bg-sky-500 text-white text-xs font-bold rounded">
                            {acc.averageRating.toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({acc.reviewCount})
                          </span>
                        </div>
                        <div className="mt-2 text-lg font-bold text-sky-600 dark:text-sky-400">
                          ฿{acc.basePricePerNight.toLocaleString()}
                          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                            {" "}
                            / คืน
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ฿{accommodation.basePricePerNight.toLocaleString()}
                  <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                    {" "}
                    / คืน
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Check-in */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันเช็คอิน
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันเช็คเอาท์
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    จำนวนผู้เข้าพัก
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Array.from(
                      { length: accommodation.maxGuests },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} ท่าน
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Breakdown */}
                {booking.nights > 0 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        ฿{accommodation.basePricePerNight.toLocaleString()} x{" "}
                        {booking.nights} คืน
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ฿{booking.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        ค่าทำความสะอาด
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ฿{booking.cleaningFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        ค่าบริการ
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ฿{booking.serviceFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">
                        ยอดรวมทั้งหมด
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ฿{booking.grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  className="w-full py-3 bg-gradient-to-r from-sky-300 to-violet-300 dark:from-sky-400 dark:to-violet-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  จองเลย
                </button>

                <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                  คุณจะยังไม่ถูกเรียกเก็บเงินในขณะนี้
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
