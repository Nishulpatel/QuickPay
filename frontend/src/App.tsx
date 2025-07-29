import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { SendMoney } from './pages/sendMoney';
import { Dashboard } from './pages/dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sendmoney" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
