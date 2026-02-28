import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center animate-in fade-in duration-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-red-900">{title}</h3>
            <p className="mt-1 text-sm text-red-700 max-w-sm">{message || "An unexpected error occurred while loading this content."}</p>
            {onRetry && (
                <div className="mt-6">
                    <Button variant="danger" onClick={onRetry}>Try Again</Button>
                </div>
            )}
        </div>
    );
}
