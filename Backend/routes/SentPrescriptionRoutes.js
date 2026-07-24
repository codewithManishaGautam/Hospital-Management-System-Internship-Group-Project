const express = require("express");
const router = express.Router();

const SentPrescription = require("../models/SentPrescription");


router.post("/doctor/send-prescription", async(req,res)=>{

try{

const data = new SentPrescription({

target:req.body.target,

prescription:req.body.prescription

});


await data.save();


res.json({
success:true,
message:"Prescription Sent"
});


}catch(err){

console.log(err);

res.status(500).json(err);

}

});


module.exports = router;