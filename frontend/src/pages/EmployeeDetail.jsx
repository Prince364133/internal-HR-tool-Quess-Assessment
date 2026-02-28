import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { useEmployees } from '../hooks/useEmployees';
import { useAttendance } from '../hooks/useAttendance';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';
import { ArrowLeft, User, Mail, Building2 } from 'lucide-react';

export function EmployeeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { employees, loading: empLoading, error: empError, fetchEmployees } = useEmployees();
    const { attendance, loading: attLoading, error: attError, fetchAttendance } = useAttendance(id);

    const employee = employees.find(e => e.id === id);

    const renderContent = () => {
        if (empLoading || attLoading) return <Spinner size="lg" />;
        if (empError || attError) return <ErrorState message={empError || attError} onRetry={() => { fetchEmployees(); fetchAttendance(); }} />;
        if (!employee) return <ErrorState title="Employee not found" message="This employee might have been deleted." />;

        return (
            <div className="space-y-8 animate-in fade-in duration-500">

                {/* Profile Details Card */}
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-2xl font-semibold text-indigo-700">{employee.full_name.charAt(0)}</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{employee.full_name}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Employee Profile Information</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2"><User className="h-4 w-4" /> Employee ID</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-semibold">{employee.id}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2"><Mail className="h-4 w-4" /> Email Address</dt>
                                <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2"><Building2 className="h-4 w-4" /> Department</dt>
                                <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Attendance History */}
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Attendance History</h3>
                    <AttendanceTable records={attendance} employeeName={employee.full_name} />
                </div>
            </div>
        );
    };

    return (
        <PageWrapper>
            <div className="mb-4">
                <Button variant="ghost" onClick={() => navigate('/employees')} className="px-0 text-indigo-600 hover:bg-transparent hover:text-indigo-800">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Employees
                </Button>
            </div>
            <Header
                title="Employee Profile"
            />
            {renderContent()}
        </PageWrapper>
    );
}
