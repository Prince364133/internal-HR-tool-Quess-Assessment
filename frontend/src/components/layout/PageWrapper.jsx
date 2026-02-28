import React from 'react';
import { Sidebar } from './Sidebar';

export function PageWrapper({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="mx-auto max-w-7xl p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
