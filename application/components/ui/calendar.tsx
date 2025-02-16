"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // State for the selected date and the current month
  const [selected, setSelected] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date>(new Date())

  // Generate a range of years (customize as needed)
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 50
  const endYear = currentYear + 10
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  // Array of month names
  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ]

  // Handler for changing the year via the select dropdown
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10)
    setMonth(new Date(newYear, month.getMonth(), 1))
  }

  // Handler for changing the month via the select dropdown
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10)
    setMonth(new Date(month.getFullYear(), newMonth, 1))
  }

  return (
    <div className="space-y-6">
      {/* Year and Month selection dropdowns */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Year</label>
          <select
            value={month.getFullYear()}
            onChange={handleYearChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Month</label>
          <select
            value={month.getMonth()}
            onChange={handleMonthChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        className={cn("p-4 bg-white rounded-lg shadow-md", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell:
            "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-blue-50 [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal transition-colors duration-150"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600",
          day_today: "bg-blue-100 text-blue-800",
          day_outside:
            "text-gray-400 aria-selected:bg-blue-50 aria-selected:text-gray-400",
          day_disabled: "text-gray-300 opacity-50",
          day_range_middle:
            "aria-selected:bg-blue-100 aria-selected:text-blue-800",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: (props) => <ChevronLeft className="h-4 w-4" {...props} />,
          IconRight: (props) => <ChevronRight className="h-4 w-4" {...props} />,
        }}
        {...props}
      />
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
