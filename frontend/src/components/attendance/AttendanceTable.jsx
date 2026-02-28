import React from 'react';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import { formatDate } from '../../utils/formatDate';
import { CalendarX2 } from 'lucide-react';

export function AttendanceTable({ records, employeeName }) {
    if (!records?.length) {
        return (
            <EmptyState
                icon={CalendarX2}
                title="No attendance records"
                message={employeeName ? `There are no attendance records for ${employeeName}` : "No attendance records found."}
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Employee ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {records.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{formatDate(record.date)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{record.employee_id}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    <Badge variant={record.status === 'Present' ? 'success' : 'danger'}>
                                        {record.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
