import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKRND_URL } from '../config'

export function Balance() {
  const [balance, setBalance] = useState<number | string>('Loading...')

  useEffect(() => {
    axios.get(`${BACKRND_URL}/api/v1/account/balance`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setBalance(res.data.balance))
    .catch(() => setBalance('Error'))
  }, [])

  const displayBalance = typeof balance === 'number' ? `Rs ${balance.toFixed(2)}` : balance

  return <div className="font-bold">  Your balance: {displayBalance}</div>
}
