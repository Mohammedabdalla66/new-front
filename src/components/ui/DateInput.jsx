import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

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

  // Calculate calendar position when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      
      // Position calendar below the input
      const top = rect.bottom + scrollY + 4; // 4px gap
      const left = rect.left + scrollX;
      
      // Check if there's enough space below, otherwise position above
      const spaceBelow = window.innerHeight - rect.bottom;
      const calendarHeight = 350; // Approximate calendar height
      
      if (spaceBelow < calendarHeight && rect.top > calendarHeight) {
        // Position above
        setCalendarPosition({
          top: rect.top + scrollY - calendarHeight - 4,
          left: left
        });
      } else {
        // Position below
        setCalendarPosition({
          top: top,
          left: left
        });
      }
    }
  }, [isOpen]);

  // Handle click outside and scroll to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOnInput = wrapperRef.current && wrapperRef.current.contains(event.target);
      const clickedOnCalendar = calendarRef.current && calendarRef.current.contains(event.target);
      
      if (!clickedOnInput && !clickedOnCalendar) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      // Small delay to avoid closing immediately when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
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
    <>
      <div ref={wrapperRef} className={`relative ${className}`}>
        {/* Visible Input Field - Read-only with formatted date */}
        <div className="relative">
          <input
            ref={inputRef}
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
      </div>

      {/* Calendar Popup - Rendered via Portal to avoid clipping */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={calendarRef}
          className="fixed z-[9999] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl"
          style={{
            top: `${calendarPosition.top}px`,
            left: `${calendarPosition.left}px`,
          }}
        >
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
        </div>,
        document.body
      )}
    </>
  );
};

export default DateInput;

