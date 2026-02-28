import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { AttendanceForm } from '../components/attendance/AttendanceForm';
import { AttendanceFilter } from '../components/attendance/AttendanceFilter';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { useEmployees } from '../hooks/useEmployees';
import { useAttendance } from '../hooks/useAttendance';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';

export function Attendance() {
    const { employees, loading: empLoading, error: empError } = useEmployees();
    // For the global attendance view, we will use a separate specific logic if PRD allowed fetching all attendance.
    // Wait, PRD: "GET /attendance/{employee_id} Get attendance (optional ?date= filter)"
    // There is NO endpoint to get ALL attendance for ALL employees at once globally!
    // So the "Attendance" page functionality should probably be: Select an employee to view OR Mark attendance for an employee.
    // We'll manage state for the selected employee to view their attendance history here.

    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const { attendance, loading: attLoading, error: attError, fetchAttendance, recordAttendance } = useAttendance(selectedEmployeeId, filterDate);

    const handleMarkAttendance = async (formData) => {
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        // The useAttendance hook is tied to selectedEmployeeId, but recordAttendance is a generic POST /attendance.
        // If the marked attendance is for the currently viewed employee, it updates the list automatically.
        const result = await recordAttendance(formData);

        if (result.success) {
            setSubmitMessage({ type: 'success', text: 'Attendance recorded successfully!' });
        } else {
            setSubmitMessage({ type: 'error', text: result.error });
        }

        setIsSubmitting(false);

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSubmitMessage(prev => prev.type === 'success' ? { type: '', text: '' } : prev);
        }, 3000);
    };

    const handleFilter = (date) => {
        setFilterDate(date);
        // useAttendance hook's fetchAttendance will re-trigger via useEffect (or we optionally call it if we don't use auto-fetching dependencies)
    };

    const renderContent = () => {
        if (empLoading) return <Spinner size="lg" />;
        if (empError) return <ErrorState message={empError} />;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">

                {/* Left Col: Mark Attendance Form */}
                <div className="lg:col-span-1 border-r border-gray-100 pr-0 lg:pr-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Mark Attendance</h3>

                    {submitMessage.text && (
                        <div className={`mb-4 rounded-md p-4 text-sm ${submitMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                            {submitMessage.text}
                        </div>
                    )}

                    <AttendanceForm employees={employees} onSubmit={handleMarkAttendance} isSubmitting={isSubmitting} />
                </div>

                {/* Right Col: View Attendance History */}
                <div className="lg:col-span-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">View Records</h3>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-end">
                        <div className="w-full sm:w-1/2 space-y-2">
                            <label className="text-sm font-medium leading-none">Select Employee</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 appearance-none"
                                value={selectedEmployeeId}
                                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                            >
                                <option value="">-- Choose an employee --</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.id})</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <AttendanceFilter onFilter={handleFilter} initialDate={filterDate} />
                        </div>
                    </div>

                    {selectedEmployeeId ? (
                        attLoading ? (
                            <Spinner />
                        ) : attError ? (
                            <ErrorState message={attError} onRetry={() => fetchAttendance()} />
                        ) : (
                            <AttendanceTable
                                records={attendance}
                                employeeName={employees.find(e => e.id === selectedEmployeeId)?.full_name}
                            />
                        )
                    ) : (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            Please select an employee to view their attendance history.
                        </div>
                    )}
                </div>

            </div>
        );
    };

    return (
        <PageWrapper>
            <Header
                title="Attendance Center"
                description="Mark and review daily attendance records."
            />
            {renderContent()}
        </PageWrapper>
    );
}
