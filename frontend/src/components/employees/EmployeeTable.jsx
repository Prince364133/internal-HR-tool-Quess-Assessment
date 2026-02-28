import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';
import { Link } from 'react-router-dom';

export function EmployeeTable({ employees, onDeleteClick }) {
    if (!employees?.length) {
        return <EmptyState title="No employees found" message="Get started by creating a new employee." />;
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm mt-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Employee ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-indigo-600 hover:text-indigo-900 group">
                                    <Link to={`/employees/${employee.id}`} className="flex items-center gap-1 group-hover:underline">
                                        {employee.id}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{employee.full_name}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{employee.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => onDeleteClick(employee)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
