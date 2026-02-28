import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const departments = [
    { value: "Engineering", label: "Engineering" },
    { value: "HR", label: "Human Resources" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
];

export function EmployeeForm({ onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        id: '',
        full_name: '',
        email: '',
        department: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.id) newErrors.id = 'Employee ID is required';
        else if (!/^EMP\d+$/.test(formData.id)) newErrors.id = 'Format must be EMP###';

        if (!formData.full_name) newErrors.full_name = 'Full Name is required';
        else if (formData.full_name.length < 2) newErrors.full_name = 'Must be at least 2 characters';

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.department) newErrors.department = 'Department is required';

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
            <Input
                label="Employee ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                error={errors.id}
                placeholder="e.g. EMP001"
            />
            <Input
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                error={errors.full_name}
                placeholder="John Doe"
            />
            <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
            />
            <Select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                options={departments}
            />

            <div className="pt-2">
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                    Create Employee
                </Button>
            </div>
        </form>
    );
}
