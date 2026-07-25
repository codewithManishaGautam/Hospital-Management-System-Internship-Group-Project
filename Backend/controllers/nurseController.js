const Patient = require('../models/Patient');
const Bed = require('../models/Bed'); 
const DailyReport = require('../models/DailyReport');
const Handover = require('../models/Handover');
const ActivityChart = require('../models/ActivityChart');

// ==========================================
// 1. PATIENTS CONTROLLERS
// ==========================================
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        const formattedPatients = patients.map(p => ({
            id: p.uhid,
            name: p.name,
            ward: p.role || p.ward || "General Ward",
            disease: p.disease || "General Checkup"
        }));
        res.status(200).json(formattedPatients);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.searchPatientByUHID = async (req, res) => {
    try {
        const { uhid } = req.query;
        if (!uhid) return res.status(400).json({ message: "UHID is required" });

        const patient = await Patient.findOne({ uhid: String(uhid) });
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        res.status(200).json([{ 
            id: patient.uhid, 
            name: patient.name, 
            ward: patient.role || "General Ward", 
            disease: patient.disease || "General" 
        }]);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getPatientDetailsByUHID = async (req, res) => {
    try {
        const { uhid } = req.params;
        const patient = await Patient.findOne({ uhid: String(uhid) });
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        const dailyReports = await DailyReport.find({ patientId: patient._id }).sort({ createdAt: -1 });

        res.status(200).json({
            id: patient.uhid,
            mongoId: patient._id, 
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            bed: patient.bedNo || "N/A",
            ward: patient.role || "General Ward",
            admissionDate: patient.admissionDate || "",
            bloodGroup: patient.bloodGroup || "",
            phone: patient.mobile || "",
            address: patient.address || "",
            tests: patient.tests || [],
            precautions: patient.precautions || [],
            medicines: patient.medicines || [],
            nursingReports: dailyReports
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.updatePatientAdmissionDate = async (req, res) => {
    try {
        const { uhid } = req.params;
        const { admissionDate } = req.body;
        const updated = await Patient.findOneAndUpdate({ uhid: String(uhid) }, { admissionDate }, { new: true });
        res.status(200).json({ message: "Admission Date updated!", admissionDate: updated.admissionDate });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ==========================================
// 2. BEDS CONTROLLERS
// ==========================================

exports.saveBedStatus = async (req, res) => {
    try {
        const { general, special, icu } = req.body;
    
        if (Bed && typeof Bed.findOneAndUpdate === 'function') {
            await Bed.findOneAndUpdate({ wardName: 'General' }, general, { upsert: true, new: true });
            await Bed.findOneAndUpdate({ wardName: 'Special' }, special, { upsert: true, new: true });
            await Bed.findOneAndUpdate({ wardName: 'ICU' }, icu, { upsert: true, new: true });
        }
        res.status(200).json({ message: "Saved Bed Status Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getBedStatus = async (req, res) => {
    try {
        let general = { occupied: 1, available: 5 };
        let special = { occupied: 1, available: 4 };
        let icu = { occupied: 2, available: 5 };

        if (Bed && typeof Bed.find === 'function') {
            const bedsData = await Bed.find();
            general = bedsData.find(b => b.wardName === 'General') || general;
            special = bedsData.find(b => b.wardName === 'Special') || special;
            icu = bedsData.find(b => b.wardName === 'ICU') || icu;
        }
        res.status(200).json({ general, special, icu });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ==========================================
// 3. DAILY REPORTS CONTROLLERS
// ==========================================

exports.saveDailyReport = async (req, res) => {
    try {
        const { patientId, bp, pulse, temp, spo2, sugar, intake, output, notes } = req.body;
        const newReport = new DailyReport({ patientId, bp, pulse, temp, spo2, sugar, intake, output, notes });
        await newReport.save();
        res.status(201).json({ message: "Daily Report saved successfully!", report: newReport });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ==========================================
// 4. HANDOVER NOTES CONTROLLERS
// ==========================================

exports.saveHandoverNote = async (req, res) => {
    try {
        const { patientId, text, time } = req.body;
        const newHandover = new Handover({ patientId, text, time });
        await newHandover.save();
        res.status(201).json({ message: "Shift Handover Note successfully submit!", note: newHandover });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getHandoverHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const history = await Handover.find({ patientId }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ==========================================
// 5. MEDICATION CONTROLLERS
// ==========================================

exports.updateMedicationStatus = async (req, res) => {
    try {
        const { uhid } = req.params;
        const { medicineId, status } = req.body;
        const patient = await Patient.findOne({ uhid: String(uhid) });
        
        const medicine = patient.medicines.id(medicineId);
        if(medicine) {
            medicine.status = status;
            await patient.save();
        }
        res.status(200).json({ message: "Medication status updated successfully!", medicines: patient.medicines });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ==========================================
// 6. ACTIVITY CHART CONTROLLERS
// ==========================================

exports.saveActivityChart = async (req, res) => {
    try {
        const { patientId, days, gridData } = req.body;
        const updatedChart = await ActivityChart.findOneAndUpdate({ patientId }, { days, gridData }, { upsert: true, new: true });
        res.status(200).json({ message: "Activity Chart saved successfully!", chart: updatedChart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.getActivityChart = async (req, res) => {
    try {
        const { patientId } = req.params;
        const chart = await ActivityChart.findOne({ patientId });
        res.status(200).json(chart || { days: [], gridData: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};