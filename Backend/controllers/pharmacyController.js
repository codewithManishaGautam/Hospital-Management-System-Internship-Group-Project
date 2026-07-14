//1. Imports
const SentPrescription = require("../models/SentPrescription");
const PharmacyBill = require("../models/PharmacyBill");

//2.  Get Today's prescription
const getTodayPrescriptions = async (req, res) => {
  try {
    const prescriptions = await SentPrescription.find({
      target: "pharmacy",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//3. Search Patient
const searchPatient = async(req,res)=>{

const name=req.query.name;

try{

const data=await SentPrescription.find({

target:"pharmacy",

"prescription.patientName":{

$regex:name,

$options:"i"

}

});

res.json(data);

}

catch(err){

res.status(500).json(err);

}

};
//4.  Get Prescription By UHID
const getPrescriptionByUHID=async(req,res)=>{

try{

const data=await SentPrescription.findOne({

target:"pharmacy",

"prescription.patientUHID":req.params.uhid

});

res.json(data);

}

catch(err){

res.status(500).json(err);

}

};
// 5. Create Bill
const createBill=async(req,res)=>{

try{

const bill=new PharmacyBill(req.body);

await bill.save();

res.json({

message:"Bill Generated",

bill

});

}

catch(err){

res.status(500).json(err);

}

};
// 6. Update Payment
const updatePayment=async(req,res)=>{

try{

const bill=await PharmacyBill.findByIdAndUpdate(

req.params.id,

{

paymentMode:req.body.paymentMode,

paymentStatus:req.body.paymentStatus

},

{

new:true

}

);

res.json(bill);

}

catch(err){

res.status(500).json(err);

}

};
// 7. Export
module.exports={

getTodayPrescriptions,

searchPatient,

getPrescriptionByUHID,

createBill,

updatePayment

};