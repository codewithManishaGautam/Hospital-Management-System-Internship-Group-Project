import api from './api';

const INSURANCE_BASE = '/insurance';

export const insuranceService = {
  // Dashboard
  getDashboardStats: () => api.get(`${INSURANCE_BASE}/claims/dashboard-stats`),

  // Policies
  registerPolicy: (data) => api.post(`${INSURANCE_BASE}/policies`, data),
  getPolicies: () => api.get(`${INSURANCE_BASE}/policies`),
  getPolicyById: (id) => api.get(`${INSURANCE_BASE}/policies/${id}`),
  updatePolicy: (id, data) => api.put(`${INSURANCE_BASE}/policies/${id}`, data),
  verifyPolicy: (id) => api.patch(`${INSURANCE_BASE}/policies/${id}/verify`),
  deletePolicy: (id) => api.delete(`${INSURANCE_BASE}/policies/${id}`),

  // Schemes
  enrollScheme: (data) => api.post(`${INSURANCE_BASE}/schemes`, data),
  getSchemes: () => api.get(`${INSURANCE_BASE}/schemes`),
  updateScheme: (id, data) => api.put(`${INSURANCE_BASE}/schemes/${id}`, data),
  verifyScheme: (id) => api.patch(`${INSURANCE_BASE}/schemes/${id}/verify`),

  // Pre-Auth
  createPreAuth: (data) => api.post(`${INSURANCE_BASE}/pre-auth`, data),
  getPreAuths: () => api.get(`${INSURANCE_BASE}/pre-auth`),
  getPreAuthById: (id) => api.get(`${INSURANCE_BASE}/pre-auth/${id}`),
  updatePreAuthStatus: (id, data) => api.patch(`${INSURANCE_BASE}/pre-auth/${id}/status`, data),
  respondToPreAuthQuery: (id, data) => api.post(`${INSURANCE_BASE}/pre-auth/${id}/query-response`, data),
  enhancePreAuth: (id, data) => api.post(`${INSURANCE_BASE}/pre-auth/${id}/enhance`, data),

  // Claims
  createClaim: (data) => api.post(`${INSURANCE_BASE}/claims`, data),
  getClaims: () => api.get(`${INSURANCE_BASE}/claims`),
  getClaimById: (id) => api.get(`${INSURANCE_BASE}/claims/${id}`),
  updateClaimStatus: (id, data) => api.patch(`${INSURANCE_BASE}/claims/${id}/status`, data),
  updateClaimSettlement: (id, data) => api.patch(`${INSURANCE_BASE}/claims/${id}/settlement`, data),

  // Documents
  uploadDocument: (formData) => api.post(`${INSURANCE_BASE}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getClaimDocuments: (claimId) => api.get(`${INSURANCE_BASE}/documents/claim/${claimId}`),
  getPreAuthDocuments: (preAuthId) => api.get(`${INSURANCE_BASE}/documents/pre-auth/${preAuthId}`),
  deleteDocument: (id) => api.delete(`${INSURANCE_BASE}/documents/${id}`),

  // Billing
  getBillingSummary: (patientId) => api.get(`${INSURANCE_BASE}/billing/${patientId}`),
  createBillingMapping: (data) => api.post(`${INSURANCE_BASE}/billing/mapping`, data),

  // Master Data
  getTPAs: () => api.get(`${INSURANCE_BASE}/master-data/tpas`),
  createTPA: (data) => api.post(`${INSURANCE_BASE}/master-data/tpas`, data),
  getCompanies: () => api.get(`${INSURANCE_BASE}/master-data/companies`),
  createCompany: (data) => api.post(`${INSURANCE_BASE}/master-data/companies`, data),
  getForms: () => api.get(`${INSURANCE_BASE}/master-data/forms`),
  createForm: (data) => api.post(`${INSURANCE_BASE}/master-data/forms`, data),

  // Notifications
  getNotifications: () => api.get(`${INSURANCE_BASE}/notifications`),
  markNotificationRead: (id) => api.put(`${INSURANCE_BASE}/notifications/${id}/read`)
};
