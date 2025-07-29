import React from 'react'

export function InputBox({label , placeholder , onChange}) {
    return(
        <div>
        <div className="font-bold text-sm text-left py-2">
            {label}
        </div>
        <div>
            <input onChange={onChange} placeholder={placeholder} className='w-full px-2 py-1 border '>
            </input>
        </div>
        </div>
    )
}