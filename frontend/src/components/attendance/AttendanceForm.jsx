import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function AttendanceForm({ employees, onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        status: ''
    });

    const [errors, setErrors] = useState({});

    const employeeOptions = employees.map(emp => ({
        value: emp.id,
        label: `${emp.full_name} (${emp.id})`
    }));

    const statusOptions = [
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' }
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.employee_id) newErrors.employee_id = 'Please select an employee';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.status) newErrors.status = 'Please select a status';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-6">
            <Select
                label="Employee"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                error={errors.employee_id}
                options={employeeOptions}
            />

            <Input
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />

            <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                error={errors.status}
                options={statusOptions}
            />

            <div className="pt-2">
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                    Mark Attendance
                </Button>
            </div>
        </form>
    );
}
