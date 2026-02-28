import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-gray-50">
            <div className="flex h-16 shrink-0 items-center px-6">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                    HRMS Lite
                </span>
            </div>
            <nav className="flex flex-1 flex-col mt-6 px-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-center text-gray-500">
                    Admin Panel &bull; v1.0.0
                </div>
            </div>
        </div>
    );
}
