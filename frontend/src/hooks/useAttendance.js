import { useState, useCallback, useEffect } from 'react';
import * as api from '../api/attendance';

export function useAttendance(employeeId, initialDate = '', autoFetch = true) {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAttendance = useCallback(async (date = initialDate) => {
        if (!employeeId && autoFetch) return; // Only prevent fetch if using hook without ID
        setLoading(true);
        setError(null);
        try {
            const data = await api.getAttendance(employeeId, date);
            setAttendance(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch attendance');
        } finally {
            setLoading(false);
        }
    }, [employeeId, initialDate, autoFetch]);

    const recordAttendance = async (attendanceData) => {
        try {
            const newRecord = await api.markAttendance(attendanceData);
            setAttendance(prev => [newRecord, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
            return { success: true, data: newRecord };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        if (autoFetch && employeeId) {
            fetchAttendance();
        }
    }, [autoFetch, fetchAttendance, employeeId]);

    return { attendance, loading, error, fetchAttendance, recordAttendance };
}

export function useDashboardSummary(autoFetch = true) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getDashboardSummary();
            setSummary(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch dashboard summary');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchSummary();
        }
    }, [autoFetch, fetchSummary]);

    return { summary, loading, error, fetchSummary };
}
