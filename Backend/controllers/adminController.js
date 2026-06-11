const getDashboardStats = (req, res) => {
  const dashboardData = {
    totalDoctors: 3,
    totalStaff: 2,
    totalPatients: 5,
    admittedPatients: 4,
    dischargedPatients: 1,
  };

  res.json(dashboardData);
};

let doctors = [
  {
    id: 1,
    name: "Dr. Sharma",
    email: "drsharma@gmail.com",
    specialization: "Cardiologist",
    qualification: "MBBS, MD",
    experience: "10 years",
    phone: "1111111111",
  },

  {
    id: 2,
    name: "Dr. Mehta",
    email: "drmehta@gmail.com",
    specialization: "Neurologist",
    qualification: "MBBS, MD",
    experience: "5 years",
    phone: "2222222222",
  },
];

let staff = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    aadhaar: "4587 9632 1452",
    phone: "9876543210",
    role: "Receptionist",
    salary: "15000",
    status: "Active",
    joining: "12 Jan 2025",
  },

  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@gmail.com",
    aadhaar: "7412 8523 9631",
    phone: "9876501234",
    role: "Nurse",
    salary: "20000",
    status: "Leave",
    joining: "05 Mar 2025",
  },
];

let patients = [
  {
    id: 1,
    name: "Amit",
    age: 19,
    gender: "Male",
    phone: "1010101010",
    disease: "Fever",
    doctor: "Dr. Patel",
    admission: "12 Jan 2026",
    status: "Admitted",

    prescription: "Paracetamol twice a day",

    tests: ["Blood Test", "X-Ray"],

    insurance: "Star Health",

    reports: ["Blood Report", "X-Ray Report"],

    bill: "15000",
  },

  {
    id: 2,
    name: "Sneha",
    age: 40,
    gender: "Female",
    phone: "2020202020",
    disease: "Weakness",
    doctor: "Dr. Sharma",
    admission: "1 April 2026",
    status: "Discharged",

    prescription: "Vitamin Tablets",

    tests: ["Sugar Test", "MRI"],

    insurance: "HDFC Ergo",

    reports: ["MRI Report", "Sugar Report"],

    bill: "25000",
  },
];

let users = [
  {
    id: 1,
    name: "Main Admin",
    role: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
  },

  {
    id: 2,
    name: "Dr Sharma",
    role: "Doctor",
    email: "drsharma@gmail.com",
    password: "doctor123",
  },

  {
    id: 3,
    name: "Rahul Sharma",
    role: "Receptionist",
    email: "rahul@gmail.com",
    password: "recep123",
  },

  {
    id: 4,
    name: "Priya Mehta",
    role: "Nurse",
    email: "priya@gmail.com",
    password: "priya123",
  },
];

const getDoctors = (req, res) => {
  res.json(doctors);
};

const getStaff = (req, res) => {
  res.json(staff);
};

const getPatients = (req, res) => {
  res.json(patients);
};

const addStaff = (req, res) => {
  const newStaff = {
    id: Date.now(),
    ...req.body,
  };

  staff.push(newStaff);

  res.json({
    message: "Staff Added Successfully",
    staff,
  });
};

const deleteStaff = (req, res) => {
  const id = parseInt(req.params.id);

  staff = staff.filter((s) => s.id !== id);

  res.json({
    message: "Staff Deleted Successfully",
    staff,
  });
};

const editStaff = (req, res) => {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  staff = staff.map((s) => (s.id === id ? { ...s, ...updatedData } : s));

  res.json({
    message: "Staff Updated Successfully",
    staff,
  });
};

// ADD PATIENT
const addPatient = (req, res) => {
  const newPatient = {
    id: Date.now(),

    prescription: "Not Available",
    tests: [],
    reports: [],
    insurance: "Not Available",
    bill: "0",

    ...req.body,
  };

  patients.push(newPatient);

  res.json({
    message: "Patient Added Successfully",
    patients,
  });
};

// DELETE PATIENT
const deletePatient = (req, res) => {
  const id = parseInt(req.params.id);

  patients = patients.filter((p) => p.id !== id);

  res.json({
    message: "Patient Deleted Successfully",
    patients,
  });
};

const editPatient = (req, res) => {
  const id = parseInt(req.params.id);

  const updatedData = req.body;

  patients = patients.map((p) => (p.id === id ? { ...p, ...updatedData } : p));

  res.json({
    message: "Patient Updated Successfully",
    patients,
  });
};

const addDoctor = (req, res) => {
  const newDoctor = {
    id: Date.now(),
    ...req.body,
  };
  doctors.push(newDoctor);
  res.json({
    message: "Doctor Added Successfully",
    doctors,
  });
};

const deleteDoctor = (req, res) => {
  const id = parseInt(req.params.id);
  doctors = doctors.filter((d) => d.id !== id);
  res.json({
    message: "Doctor Deleted Successfully",
    doctors,
  });
};

const editDoctor = (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;
  doctors = doctors.map((d) => (d.id === id ? { ...d, ...updateData } : d));
  res.json({
    message: "Doctor Updated Successfully",
    doctors,
  });
};

const getUsers = (req, res) => {
  res.json(users);
};

const updatePassword = (req, res) => {
  const id = parseInt(req.params.id);

  const { password } = req.body;

  users = users.map((u) =>
    u.id === id
      ? {
          ...u,
          password,
        }
      : u,
  );

  res.json({
    message: "Password Updated Successfully",
    users,
  });
};

module.exports = {
  getDashboardStats,
  getDoctors,
  getStaff,
  getPatients,
  addStaff,
  deleteStaff,
  editStaff,
  editPatient,
  addDoctor,
  deleteDoctor,
  editDoctor,
  addPatient,
  deletePatient,
  getUsers,
  updatePassword,
};
