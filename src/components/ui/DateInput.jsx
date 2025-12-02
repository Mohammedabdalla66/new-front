import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Calendar as CalendarIcon } from "lucide-react";

/**
 * Custom DateInput component that ensures ISO format (YYYY-MM-DD) with zero-padding
 * @param {Date|null} value - The date value (Date object)
 * @param {Function} onChange - Callback when date changes (receives Date object)
 * @param {Date} minDate - Minimum selectable date
 * @param {string} className - Additional CSS classes
 * @param {boolean} required - Whether the field is required
 * @param {string} placeholder - Placeholder text
 */
const DateInput = ({ 
  value, 
  onChange, 
  minDate = new Date(), 
  className = "",
  required = false,
  placeholder = "Select date"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const wrapperRef = useRef(null);

  // Format date to ISO string (YYYY-MM-DD) with zero-padding
  const formatDateToISO = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Update display value when value prop changes
  useEffect(() => {
    setDisplayValue(formatDateToISO(value));
  }, [value]);

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDateChange = (newDate) => {
    if (onChange) {
      onChange(newDate);
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Visible Input Field - Read-only with formatted date */}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={displayValue}
          onClick={handleInputClick}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <CalendarIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Calendar Popup - Opens as overlay */}
      {isOpen && (
        <div className="absolute z-50 mt-1 left-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl">
          <DatePicker
            onChange={handleDateChange}
            value={value}
            minDate={minDate}
            format="yyyy-MM-dd"
            clearIcon={null}
            calendarIcon={null}
            calendarClassName="dark:bg-gray-800 dark:text-white dark:border-gray-700 [&_.react-calendar__tile]:dark:text-white [&_.react-calendar__tile--active]:dark:bg-blue-600 [&_.react-calendar__tile:enabled:hover]:dark:bg-gray-700 [&_.react-calendar__navigation__label]:dark:text-white [&_.react-calendar__month-view__weekdays__weekday]:dark:text-gray-300"
            className="[&_.react-date-picker__wrapper]:border-0 [&_.react-date-picker__inputGroup]:hidden"
            openCalendarOnFocus={false}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;

