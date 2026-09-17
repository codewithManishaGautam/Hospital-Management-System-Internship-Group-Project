import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Pharmacy/prescription.css";

function PharmacyPrescription({
  prescription,
  setStep,
  setSelectedPrescription,
}) {
  console.log("========== PHARMACY PRESCRIPTION ==========");
  console.log("Selected Prescription:", prescription);
  console.log("Inner Prescription:", prescription?.prescription);
  console.log("Patient Name:", prescription?.prescription?.patientName);
  console.log("UHID:", prescription?.prescription?.patientUHID);
  console.log("Doctor:", prescription?.prescription?.doctor);
  console.log("Medicines:", prescription?.prescription?.medicines);
  console.log("============================================");

  const [availableMedicines, setAvailableMedicines] = useState([]);

  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);

  const patient = prescription?.prescription;

  const doctorMedicines = prescription?.prescription?.medicines || [];

  const renderPrescriptionContent = (value) => {
    if (!value) {
      return <p>Not provided</p>;
    }

    // Handwritten content is stored as base64 image
    if (typeof value === "string" && value.startsWith("data:image")) {
      return (
        <img
          src={value}
          alt="Handwritten Prescription"
          className="pharmacy-prescription-handwritten-image"
        />
      );
    }

    // Typed content
    return <p className="pharmacy-prescription-typed-text">{value}</p>;
  };

  console.log("===== PHARMACY DATA CHECK =====");
  console.log("FULL SENT PRESCRIPTION =", prescription);
  console.log("INNER PRESCRIPTION =", prescription?.prescription);
  console.log("PATIENT NAME =", prescription?.prescription?.patientName);
  console.log("UHID =", prescription?.prescription?.patientUHID);
  console.log("DOCTOR =", prescription?.prescription?.doctor);
  console.log("DOCTOR MEDICINES =", doctorMedicines);
  console.log("AVAILABLE INVENTORY MEDICINES =", availableMedicines);

  useEffect(() => {
    loadMedicines();
  }, []);

  useEffect(() => {
    if (doctorMedicines.length > 0) {
      setPharmacyMedicines(
        doctorMedicines.map((medicine) => ({
          medicineName: "",
          quantity: Number(medicine.quantity || 1),
          price: 0,
          amount: 0,
        })),
      );
    } else {
      setPharmacyMedicines([]);
    }
  }, [prescription]);

  const loadMedicines = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pharmacy/medicines",
      );

      setAvailableMedicines(res.data.data || []);
    } catch (err) {
      console.log("Medicines Load Error:", err);
    }
  };

  if (!prescription) {
    return <h2>No Prescription Selected</h2>;
  }

  const addMedicine = () => {
    setPharmacyMedicines([
      ...pharmacyMedicines,
      {
        medicineName: "",
        quantity: 1,
        price: 0,
        amount: 0,
      },
    ]);
  };

  const updateMedicine = (index, field, value) => {
    const temp = [...pharmacyMedicines];

    if (field === "medicineName") {
      const selectedMedicine = availableMedicines.find(
        (medicine) => medicine.itemName === value,
      );

      temp[index].medicineName = value;

      if (selectedMedicine) {
        temp[index].price = Number(selectedMedicine.unitPrice || 0);

        temp[index].amount =
          Number(temp[index].quantity || 0) *
          Number(selectedMedicine.unitPrice || 0);
      }
    }

    if (field === "quantity") {
      temp[index].quantity = Number(value);

      temp[index].amount = Number(value || 0) * Number(temp[index].price || 0);
    }

    setPharmacyMedicines(temp);
  };

  const total = pharmacyMedicines.reduce(
    (sum, medicine) => sum + Number(medicine.amount || 0),
    0,
  );

  const openBillPreview = () => {
    if (pharmacyMedicines.length === 0) {
      alert("Please add medicines");
      return;
    }

    const invalidMedicine = pharmacyMedicines.some(
      (medicine) =>
        !medicine.medicineName ||
        Number(medicine.quantity) <= 0 ||
        Number(medicine.price) <= 0,
    );

    if (invalidMedicine) {
      alert("Please select medicine and enter valid quantity");
      return;
    }

    setSelectedPrescription({
      ...prescription,

      pharmacyMedicines: pharmacyMedicines,
    });

    setStep("billpreview");
  };

  return (
    <>
      <h1 className="pharmacy-prescription-title">Pharmacy Prescription</h1>

      <div className="pharmacy-prescription-container">
        <div>
          <h2>Patient Details</h2>

          <p>
            <strong>Patient Name:</strong> {patient?.patientName || "-"}
          </p>

          <p>
            <strong>UHID:</strong> {patient?.patientUHID || "-"}
          </p>

          <p>
            <strong>Doctor:</strong> {patient?.doctor || "-"}
          </p>

          <div className="pharmacy-prescription-info-grid">
            <div className="pharmacy-prescription-info-card">
              <h3>Diagnosis</h3>
              {renderPrescriptionContent(patient?.diagnosis)}
            </div>

            <div className="pharmacy-prescription-info-card">
              <h3>Prescription / Instructions</h3>
              {renderPrescriptionContent(patient?.prescription)}
            </div>

            <div className="pharmacy-prescription-info-card">
              <h3>Advice</h3>
              {renderPrescriptionContent(patient?.advice)}
            </div>

            <div className="pharmacy-prescription-info-card">
              <h3>Notes</h3>
              {renderPrescriptionContent(patient?.notes)}
            </div>
          </div>

          <hr />

          <h2>Doctor Prescribed Medicines</h2>

          {doctorMedicines.length > 0 ? (
            <table className="pharmacy-prescription-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {doctorMedicines.map((medicine, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{medicine.medicineName}</td>
                    <td>{medicine.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No medicines prescribed by doctor.</p>
          )}

          <hr />

          <h2>Pharmacy Medicine Entry</h2>

          {pharmacyMedicines.map((medicine, index) => (
            <div key={index} className="pharmacy-prescription-medicine-row">
              <select
                value={medicine.medicineName}
                onChange={(e) =>
                  updateMedicine(index, "medicineName", e.target.value)
                }
              >
                <option value="">Select Medicine</option>

                {availableMedicines.map((item) => (
                  <option key={item._id} value={item.itemName}>
                    {item.itemName} - ₹{item.unitPrice}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={medicine.quantity}
                onChange={(e) =>
                  updateMedicine(index, "quantity", e.target.value)
                }
                placeholder="Quantity"
              />

              <input
                type="number"
                value={medicine.price}
                readOnly
                placeholder="Price"
              />

              <input
                type="number"
                value={medicine.amount}
                readOnly
                placeholder="Amount"
              />

              <button
                type="button"
                onClick={() => {
                  setPharmacyMedicines(
                    pharmacyMedicines.filter(
                      (_, medicineIndex) => medicineIndex !== index,
                    ),
                  );
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="pharmacy-prescription-add-btn"
            onClick={addMedicine}
          >
            + Add Medicine
          </button>

          <div className="pharmacy-prescription-total">
            Total: ₹ {total.toFixed(2)}
          </div>

          <div className="pharmacy-prescription-actions">
            <button
              className="pharmacy-prescription-back-btn"
              onClick={() => setStep("dashboard")}
            >
              Back
            </button>

            <button
              className="pharmacy-prescription-continue-btn"
              onClick={openBillPreview}
            >
              Continue to Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PharmacyPrescription;
