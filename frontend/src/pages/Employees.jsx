import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { DeleteConfirm } from '../components/employees/DeleteConfirm';
import { useEmployees } from '../hooks/useEmployees';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Plus } from 'lucide-react';

export function Employees() {
    const navigate = useNavigate();
    const { employees, loading, error, fetchEmployees, removeEmployee } = useEmployees();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (employee) => {
        setEmployeeToDelete(employee);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!employeeToDelete) return;
        setIsDeleting(true);
        const result = await removeEmployee(employeeToDelete.id);
        setIsDeleting(false);

        if (result.success) {
            setDeleteModalOpen(false);
            setEmployeeToDelete(null);
        } else {
            // Could show a toast, but keeping it lightweight. The error is logged or ignored.
            alert(`Failed to delete employee: ${result.error}`);
        }
    };

    const renderContent = () => {
        if (loading && !employees.length) return <Spinner size="lg" />;
        if (error && !employees.length) return <ErrorState message={error} onRetry={fetchEmployees} />;

        return (
            <div className="animate-in fade-in duration-500">
                <EmployeeTable
                    employees={employees}
                    onDeleteClick={handleDeleteClick}
                />

                {employeeToDelete && (
                    <DeleteConfirm
                        isOpen={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                        employeeName={employeeToDelete.full_name}
                        isDeleting={isDeleting}
                    />
                )}
            </div>
        );
    };

    return (
        <PageWrapper>
            <Header
                title="Employees"
                description="Manage your team members and directory."
            >
                <Button onClick={() => navigate('/employees/add')}>
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add Employee
                </Button>
            </Header>
            {renderContent()}
        </PageWrapper>
    );
}
