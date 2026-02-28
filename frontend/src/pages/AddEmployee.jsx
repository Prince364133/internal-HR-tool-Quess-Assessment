import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { EmployeeForm } from '../components/employees/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';

export function AddEmployee() {
    const navigate = useNavigate();
    const { addEmployee } = useEmployees(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        setSubmitError('');

        const result = await addEmployee(formData);

        if (result.success) {
            navigate('/employees');
        } else {
            setSubmitError(result.error);
            setIsSubmitting(false);
        }
    };

    return (
        <PageWrapper>
            <Header
                title="Add New Employee"
                description="Create a new employee profile to begin tracking their attendance."
            />

            <div className="animate-in fade-in duration-500">
                {submitError && (
                    <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200 text-sm text-red-700 max-w-md">
                        {submitError}
                    </div>
                )}
                <EmployeeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </PageWrapper>
    );
}
