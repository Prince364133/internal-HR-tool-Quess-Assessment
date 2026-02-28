import client from './client';

export const getEmployees = async () => {
    const response = await client.get('/employees');
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await client.post('/employees', employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await client.delete(`/employees/${id}`);
    return response.data;
};
