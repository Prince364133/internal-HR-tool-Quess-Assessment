import { useState, useCallback, useEffect } from 'react';
import * as api from '../api/employees';

export function useEmployees(autoFetch = true) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    }, []);

    const addEmployee = async (employeeData) => {
        try {
            const newEmployee = await api.createEmployee(employeeData);
            setEmployees(prev => [...prev, newEmployee].sort((a, b) => a.id.localeCompare(b.id)));
            return { success: true, data: newEmployee };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const removeEmployee = async (id) => {
        try {
            await api.deleteEmployee(id);
            setEmployees(prev => prev.filter(e => e.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchEmployees();
        }
    }, [autoFetch, fetchEmployees]);

    return { employees, loading, error, fetchEmployees, addEmployee, removeEmployee };
}
