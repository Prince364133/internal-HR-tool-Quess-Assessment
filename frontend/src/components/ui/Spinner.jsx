import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Spinner({ className, size = "default" }) {
    const sizes = {
        sm: "h-4 w-4",
        default: "h-8 w-8",
        lg: "h-12 w-12"
    };

    return (
        <div className="flex w-full items-center justify-center p-4">
            <Loader2 className={cn("animate-spin text-indigo-600", sizes[size], className)} />
        </div>
    );
}
