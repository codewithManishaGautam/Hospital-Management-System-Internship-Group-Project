const express=require("express");

const router=express.Router();

const{

getTodayPrescriptions,

searchPatient,

getPrescriptionByUHID,

createBill,

updatePayment

}=require("../controllers/pharmacyController");

router.get("/pharmacy/prescriptions",getTodayPrescriptions);

router.get("/pharmacy/search",searchPatient);

router.get("/pharmacy/:uhid",getPrescriptionByUHID);

router.post("/pharmacy/bill",createBill);

router.put("/pharmacy/payment/:id",updatePayment);

module.exports=router;