import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { useDashboardSummary } from '../hooks/useAttendance';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Users, UserCheck, UserMinus, Building2 } from 'lucide-react';

export function Dashboard() {
    const { summary, loading, error, fetchSummary } = useDashboardSummary();

    const renderContent = () => {
        if (loading) return <Spinner size="lg" />;
        if (error) return <ErrorState message={error} onRetry={fetchSummary} />;
        if (!summary) return null;

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition-all hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-50 rounded-lg p-3">
                                <Users className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dt className="truncate text-sm font-medium text-gray-500">Total Employees</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{summary.total_employees}</dd>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition-all hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-50 rounded-lg p-3">
                                <UserCheck className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dt className="truncate text-sm font-medium text-gray-500">Present Today</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{summary.today_attendance.present}</dd>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition-all hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-red-50 rounded-lg p-3">
                                <UserMinus className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dt className="truncate text-sm font-medium text-gray-500">Absent Today</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{summary.today_attendance.absent}</dd>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100">
                    <div className="px-4 py-5 sm:px-6 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
                        <Building2 className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg leading-6 font-semibold text-gray-900">Department Breakdown</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        {Object.keys(summary.department_breakdown).length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No departments currently populated.</p>
                        ) : (
                            <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                {Object.entries(summary.department_breakdown).map(([dept, count]) => (
                                    <div key={dept} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <dt className="text-sm font-medium text-gray-600">{dept}</dt>
                                        <dd className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-full">{count}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <PageWrapper>
            <Header
                title="Dashboard Overview"
                description="High-level metrics and current daily attendance figures."
            />
            {renderContent()}
        </PageWrapper>
    );
}
