import api from "../axiosInstance";

// DASHBOARD
export const getDashboard = () => api.get("/admin/dashboard");

// DOCTORS
export const getDoctors = () => api.get("/admin/doctors");
export const addDoctor = (data) => api.post("/admin/doctor/add", data);
export const editDoctor = (id, data) =>
  api.put(`/admin/doctor/edit/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/admin/doctor/delete/${id}`);

// STAFF
export const getStaff = () => api.get("/admin/staff");
export const addStaff = (data) => api.post("/admin/staff/add", data);
export const editStaff = (id, data) => api.put(`/admin/staff/edit/${id}`, data);
export const deleteStaff = (id) => api.delete(`/admin/staff/delete/${id}`);

// PATIENTS
export const getPatients = () => api.get("/admin/patients");
export const addPatient = (data) => api.post("/admin/patient/add", data);
export const editPatient = (id, data) =>
  api.put(`/admin/patient/edit/${id}`, data);
export const deletePatient = (id) => api.delete(`/admin/patient/delete/${id}`);

// ROOMS
export const getRooms = () => api.get("/admin/rooms");
export const addRoom = (data) => api.post("/admin/room/add", data);
export const deleteRoom = (id) => api.delete(`/admin/room/delete/${id}`);

// INVENTORY
export const getInventory = () => api.get("/admin/inventory");
export const addInventory = (data) => api.post("/admin/inventory/add", data);
export const deleteInventory = (id) =>
  api.delete(`/admin/inventory/delete/${id}`);

// FINANCE
export const getFinance = () => api.get("/admin/finance");
export const getAnalytics = () => api.get("/admin/analytics");

// ACTIVITIES
export const getActivities = () => api.get("/admin/activities");

// CHARGES
export const getCharges = () => api.get("/admin/charges");
export const addCharge = (data) => api.post("/admin/charge/add", data);
export const deleteCharge = (id) => api.delete(`/admin/charge/delete/${id}`);

// EXPENSE
export const addExpense = (data) => api.post("/admin/expense/add", data);
export const deleteExpense = (id) => api.delete(`/admin/expense/delete/${id}`);

// INCOME
export const addIncome = (data) => api.post("/admin/income/add", data);
export const deleteIncome = (id) => api.delete(`/admin/income/delete/${id}`);
