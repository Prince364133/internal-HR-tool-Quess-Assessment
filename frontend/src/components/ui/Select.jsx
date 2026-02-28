import React from 'react';
import { cn } from '../../utils/cn';

const Select = React.forwardRef(({ className, label, error, options, ...props }, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                    error && "border-red-500 focus-visible:ring-red-600",
                    className
                )}
                ref={ref}
                {...props}
            >
                <option value="" disabled selected hidden>Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export { Select };
