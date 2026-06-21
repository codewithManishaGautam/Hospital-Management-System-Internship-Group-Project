const patientsData = [
  {
     id: "1001",
     name: "Ramesh Sharma",
    age: 45,
    gender: "Male",
    bed: "ICU Bed 1",
    ward: "ICU",
    disease: "Pneumonia",
    bloodGroup: "B+",
    allergies: "Penicillin",
    doctor: "Dr. Amit Patil",

    admissionDate: "10/05/2026",
    dischargeDate: "18/05/2026",

    tests: ["Blood Test", "X-Ray", "ECG"],

    medicines: [
      {
        name: "Ceftriaxone",
        timing: "Morning",
        dose: "1 Injection",
        status: "Pending"
      },
      {
        name: "Paracetamol",
        timing: "Night",
        dose: "1 Tablet",
        status: "Given"
      }
    ],

    precautions: [
      "Drink warm water",
      "Complete bed rest",
      "Monitor oxygen level"
    ],

    nursingReports: [
      {
        day: "Day 1",
        bp: "120/80",
        pulse: "78",
        temp: "98.6 F",
        spo2: "97%",
        sugar: "140",
        intake: "1500ml",
        output: "1200ml",
        notes: "Patient stable today"
      }
    ]
   },

  {
    id: "1002",
    name: "Sunita Patil",
    age: 60,
    gender: "Female",
    bed: "Special 102",
    ward: "Special",
    disease: "Diabetes",
    bloodGroup: "A+",
    allergies: "None",
    doctor: "Dr. Kulkarni",

    admissionDate: "11/05/2026",
    dischargeDate: "19/05/2026",

    tests: ["Sugar Test", "ECG"],

    medicines: [
      {
        name: "Insulin",
        timing: "Morning",
        dose: "5 Units",
        status: "Pending"
      }
    ],

    precautions: [
      "Avoid sugar",
      "Check sugar level regularly"
    ],

    nursingReports: [
      {
        day: "Day 1",
        bp: "130/90",
        pulse: "80",
        temp: "99 F",
        spo2: "98%",
        sugar: "220",
        intake: "2000ml",
        output: "1800ml",
        notes: "Sugar level high today"
      }
    ]
  },

  {
    id: "1003",
    name: "Rahul More",
    age: 35,
    gender: "Male",
    bed: "General 201",
    ward: "General",
    disease: "Typhoid",
    bloodGroup: "O+",
    allergies: "Dust",
    doctor: "Dr. Shah",

    admissionDate: "12/05/2026",
    dischargeDate: "20/05/2026",

    tests: ["CBC", "Typhoid Test"],

    medicines: [
      {
        name: "Azithromycin",
        timing: "Afternoon",
        dose: "1 Tablet",
        status: "Given"
      }
    ],

    precautions: [
      "Soft diet",
      "Drink ORS"
    ],

    nursingReports: [
      {
        day: "Day 1",
        bp: "110/70",
        pulse: "74",
        temp: "100 F",
        spo2: "99%",
        sugar: "120",
        intake: "1700ml",
        output: "1400ml",
        notes: "Patient improving"
      }
    ]
  },

  {
    id: "1004",
    name: "Pooja Jadhav",
    age: 50,
    gender: "Female",
    bed: "ICU Bed 2",
    ward: "ICU",
    disease: "Asthma",
    bloodGroup: "AB+",
    allergies: "Smoke",
    doctor: "Dr. Deshmukh",

    admissionDate: "13/05/2026",
    dischargeDate: "21/05/2026",

    tests: ["Chest CT", "ECG"],

    medicines: [
      {
        name: "Nebulizer",
        timing: "Night",
        dose: "2 Times",
        status: "Pending"
      }
    ],

    precautions: [
      "Avoid smoke",
      "Use mask"
    ],

    nursingReports: [
      {
        day: "Day 1",
        bp: "125/85",
        pulse: "88",
        temp: "99 F",
        spo2: "95%",
        sugar: "130",
        intake: "1600ml",
        output: "1300ml",
        notes: "Breathing improved"
      }
    ]
  }
];

export default patientsData;