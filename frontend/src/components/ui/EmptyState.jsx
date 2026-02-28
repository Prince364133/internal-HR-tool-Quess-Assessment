import { FileX } from 'lucide-react';

export function EmptyState({
    icon: Icon = FileX,
    title = "No data available",
    message = "There is nothing to display right now.",
    action
}) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center animate-in fade-in duration-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
