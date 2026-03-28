'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, addDays, differenceInDays } from 'date-fns';

type DateRange = {
  start: Date | null;
  end: Date | null;
};

interface BookingCalendarProps {
  onDateSelect: (dates: DateRange, nights: number, total: number) => void;
}

const RATE_PER_NIGHT = 100;

// Mock booked dates (you'll replace this with real data later)
const BOOKED_DATES = [
  new Date(2026, 3, 15), // April 15, 2026
  new Date(2026, 3, 16), // April 16, 2026  
  new Date(2026, 4, 1),  // May 1, 2026
  new Date(2026, 4, 2),  // May 2, 2026
  new Date(2026, 4, 3),  // May 3, 2026
];

export default function BookingCalendar({ onDateSelect }: BookingCalendarProps) {
  const [selectedDates, setSelectedDates] = useState<DateRange>({ start: null, end: null });
  const [selectingEnd, setSelectingEnd] = useState(false);

  const isDateBooked = (date: Date): boolean => {
    return BOOKED_DATES.some(bookedDate => 
      date.getFullYear() === bookedDate.getFullYear() &&
      date.getMonth() === bookedDate.getMonth() &&
      date.getDate() === bookedDate.getDate()
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateBooked(date);
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      // Starting new selection
      setSelectedDates({ start: date, end: null });
      setSelectingEnd(true);
      onDateSelect({ start: date, end: null }, 0, 0);
    } else if (selectingEnd && selectedDates.start) {
      // Selecting end date
      if (date <= selectedDates.start) {
        // If end date is before start date, restart with this date as start
        setSelectedDates({ start: date, end: null });
        onDateSelect({ start: date, end: null }, 0, 0);
        return;
      }

      // Check if any dates in range are booked
      let currentDate = new Date(selectedDates.start);
      let hasBookedDates = false;
      
      while (currentDate <= date) {
        if (isDateBooked(currentDate)) {
          hasBookedDates = true;
          break;
        }
        currentDate = addDays(currentDate, 1);
      }

      if (hasBookedDates) {
        // Reset selection if range contains booked dates
        setSelectedDates({ start: date, end: null });
        setSelectingEnd(true);
        onDateSelect({ start: date, end: null }, 0, 0);
        return;
      }

      // Valid end date selected
      const nights = differenceInDays(date, selectedDates.start);
      const total = nights * RATE_PER_NIGHT;
      
      setSelectedDates({ start: selectedDates.start, end: date });
      setSelectingEnd(false);
      onDateSelect({ start: selectedDates.start, end: date }, nights, total);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isStart = selectedDates.start && 
        date.getTime() === selectedDates.start.getTime();
      const isEnd = selectedDates.end && 
        date.getTime() === selectedDates.end.getTime();
      const isInRange = selectedDates.start && selectedDates.end &&
        date > selectedDates.start && date < selectedDates.end;
      const isBooked = isDateBooked(date);

      let classes = '';
      
      if (isBooked) {
        classes += ' bg-red-200 text-red-800 cursor-not-allowed';
      } else if (isStart || isEnd) {
        classes += ' bg-forest-green text-white';
      } else if (isInRange) {
        classes += ' bg-green-200 text-forest-green';
      }
      
      return classes;
    }
    return '';
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return isDateDisabled(date);
    }
    return false;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
          Select Your Dates
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {selectedDates.start && !selectedDates.end
            ? "Now select your check-out date"
            : "Click your check-in date to start"
          }
        </p>
      </div>

      <Calendar
        value={selectedDates.start}
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        formatMonthYear={(locale, date) => format(date, 'MMMM yyyy')}
      />

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-forest-green rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span>In Range</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-200 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-warm-gold rounded"></div>
          <span>Today</span>
        </div>
      </div>

      {selectedDates.start && selectedDates.end && (
        <div className="card mt-6 bg-green-50 border-2 border-forest-green">
          <h4 className="text-lg font-serif font-bold text-forest-green mb-2">
            Selected Stay
          </h4>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span className="font-semibold">
                {format(selectedDates.start, 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span className="font-semibold">
                {format(selectedDates.end, 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Nights:</span>
              <span className="font-semibold">
                {differenceInDays(selectedDates.end, selectedDates.start)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold text-forest-green">
              <span>Total:</span>
              <span>
                ${differenceInDays(selectedDates.end, selectedDates.start) * RATE_PER_NIGHT}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}