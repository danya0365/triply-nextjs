"use client";

import { useCalendarPresenter } from "@/src/presentation/presenters/calendar/useCalendarPresenter";
import type { CalendarViewModel } from "@/src/presentation/presenters/calendar/CalendarPresenter";

interface CalendarViewProps {
  userId: string;
  initialViewModel: CalendarViewModel;
}

export function CalendarView({ userId, initialViewModel }: CalendarViewProps) {
  const [state, actions] = useCalendarPresenter(userId, initialViewModel);

  const viewModel = state.viewModel || initialViewModel;

  // Get month/year names
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const dayNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  // Calculate calendar grid
  const firstDay = new Date(state.currentYear, state.currentMonth, 1).getDay();
  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(state.currentYear, state.currentMonth, 0).getDate();

  const calendarDays: Array<{ day: number; isCurrentMonth: boolean; dateStr: string }> = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = state.currentMonth === 0 ? 11 : state.currentMonth - 1;
    const prevYear = state.currentMonth === 0 ? state.currentYear - 1 : state.currentYear;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      dateStr: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      dateStr: `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonth = state.currentMonth === 11 ? 0 : state.currentMonth + 1;
    const nextYear = state.currentMonth === 11 ? state.currentYear + 1 : state.currentYear;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      dateStr: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    const prevMonth = state.currentMonth === 0 ? 11 : state.currentMonth - 1;
    const prevYear = state.currentMonth === 0 ? state.currentYear - 1 : state.currentYear;
    actions.changeMonth(prevMonth, prevYear);
  };

  const goToNextMonth = () => {
    const nextMonth = state.currentMonth === 11 ? 0 : state.currentMonth + 1;
    const nextYear = state.currentMonth === 11 ? state.currentYear + 1 : state.currentYear;
    actions.changeMonth(nextMonth, nextYear);
  };

  const goToToday = () => {
    const now = new Date();
    actions.changeMonth(now.getMonth(), now.getFullYear());
  };

  // Get today's date string
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Get selected day events
  const selectedDayEvents = state.selectedDate ? viewModel.dayEvents.get(state.selectedDate) : null;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดปฏิทิน...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📅 ปฏิทินกิจกรรม
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ดูการจอง ทริป และภารกิจทั้งหมดในปฏิทิน
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
            {state.error}
          </div>
        )}

        {/* Legend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🏨 การจอง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-violet-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🗺️ ทริป</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🎯 ภารกิจ</span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-sky-400 to-violet-400 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousMonth}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                disabled={state.loading}
              >
                ← ก่อนหน้า
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[state.currentMonth]} {state.currentYear + 543}
                </h2>
                <button
                  onClick={goToToday}
                  className="mt-2 px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-lg hover:bg-white/30 transition-colors"
                  disabled={state.loading}
                >
                  วันนี้
                </button>
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                disabled={state.loading}
              >
                ถัดไป →
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((dayInfo, index) => {
              const dayEvents = viewModel.dayEvents.get(dayInfo.dateStr);
              const isToday = dayInfo.dateStr === todayStr;
              const isSelected = dayInfo.dateStr === state.selectedDate;

              return (
                <div
                  key={index}
                  onClick={() => dayInfo.isCurrentMonth && actions.openEventModal(dayInfo.dateStr)}
                  className={`min-h-[100px] p-2 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    !dayInfo.isCurrentMonth ? "bg-gray-50 dark:bg-gray-900" : ""
                  } ${isSelected ? "bg-sky-50 dark:bg-sky-900/20 ring-2 ring-sky-500" : ""}`}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={`text-sm font-semibold mb-1 ${
                        isToday
                          ? "w-7 h-7 bg-gradient-to-r from-sky-500 to-violet-500 text-white rounded-full flex items-center justify-center"
                          : dayInfo.isCurrentMonth
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      {dayInfo.day}
                    </div>
                    {dayEvents && dayInfo.isCurrentMonth && (
                      <div className="flex-1 space-y-1">
                        {dayEvents.events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs px-1 py-0.5 rounded truncate"
                            style={{ backgroundColor: event.color + "20", color: event.color }}
                          >
                            {event.icon} {event.title}
                          </div>
                        ))}
                        {dayEvents.events.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                            +{dayEvents.events.length - 2} เพิ่มเติม
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {state.isEventModalOpen && selectedDayEvents && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-sky-400 to-violet-400 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {new Date(selectedDayEvents.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button
                  onClick={actions.closeEventModal}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {selectedDayEvents.events.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayEvents.events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg border-l-4"
                      style={{ borderColor: event.color, backgroundColor: event.color + "10" }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {event.description}
                          </p>
                          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>ประเภท: {event.type === "booking" ? "การจอง" : event.type === "trip" ? "ทริป" : "ภารกิจ"}</span>
                            {event.status && <span>สถานะ: {event.status}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    ไม่มีกิจกรรมในวันนี้
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
