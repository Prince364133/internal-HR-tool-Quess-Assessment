import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { AddEmployee } from './pages/AddEmployee';
import { EmployeeDetail } from './pages/EmployeeDetail';
import { Attendance } from './pages/Attendance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
