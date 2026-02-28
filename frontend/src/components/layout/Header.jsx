import React from 'react';

export function Header({ title, description, children }) {
    return (
        <div className="mb-8 sm:flex sm:items-center sm:justify-between px-2 pt-2">
            <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold leading-6 text-gray-900">{title}</h1>
                {description && (
                    <p className="mt-2 text-sm text-gray-700">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    {children}
                </div>
            )}
        </div>
    );
}
