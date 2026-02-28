import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function AttendanceFilter({ onFilter, initialDate = '' }) {
    const [date, setDate] = useState(initialDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(date);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="w-full sm:w-64">
                <Input
                    type="date"
                    className="h-10"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <Button
                type="submit"
                variant="secondary"
                className="w-full sm:w-auto text-indigo-600 hover:text-indigo-700 bg-white"
            >
                Filter
            </Button>
            {date && (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                        setDate('');
                        onFilter('');
                    }}
                    className="w-full sm:w-auto"
                >
                    Clear
                </Button>
            )}
        </form>
    );
}
