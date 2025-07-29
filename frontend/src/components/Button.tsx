import React from 'react'

export function Button({label , onClick}){
    return(
        <div>
        <button onClick={onClick} type="button" className=" w-full py-2.5 px-5 me-2 mb-2 text-sm bg-slate-700 font-medium focus:outline-none text-white rounded-lg border transition-all border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{label}</button>
        </div>
    )
}