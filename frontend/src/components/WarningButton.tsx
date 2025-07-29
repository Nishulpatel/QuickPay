import React from "react"
import { Link } from "react-router-dom"

export function WarningButton({ label, buttonText, to }) {
  return (
    <div className="px-14 flex items-center gap-x-2  w-full py-2.5 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">
      {label}
      <Link
        to={to}
        className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  )
}
