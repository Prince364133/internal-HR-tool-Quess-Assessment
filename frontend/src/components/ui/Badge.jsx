import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = "default", className }) {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800"
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
