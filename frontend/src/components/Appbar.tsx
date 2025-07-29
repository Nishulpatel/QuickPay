import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKRND_URL } from '../config'

export function Appbar() {
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKRND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setFirstName(res.data.firstname)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  const firstInitial = firstName ? firstName[0].toUpperCase() : '?'

  return (
    <div className="w-full shadow-md flex justify-between items-center px-4 py-2 bg-white border-b border-slate-200">
      <div className="text-lg font-semibold text-slate-800">QuickPay</div>
      <div className="flex items-center gap-x-2">
        <span className="text-slate-700">Hello {firstName || 'User'}</span>
        <div className="w-8 h-8 flex justify-center items-center bg-slate-300 rounded-full text-slate-600 font-medium">
          {firstInitial}
        </div>
      </div>
    </div>
  )
}
