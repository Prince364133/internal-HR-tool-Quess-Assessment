import client from './client';

export const markAttendance = async (attendanceData) => {
    const response = await client.post('/attendance', attendanceData);
    return response.data;
};

export const getAttendance = async (employeeId, date = '') => {
    const params = date ? { date } : {};
    const response = await client.get(`/attendance/${employeeId}`, { params });
    return response.data;
};

export const getDashboardSummary = async () => {
    const response = await client.get('/dashboard/summary');
    return response.data;
};
