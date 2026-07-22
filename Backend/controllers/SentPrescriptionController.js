const SentPrescription = require("../models/SentPrescription");


const sendPrescription = async(req,res)=>{
    try{

        const data = new SentPrescription({

            target: req.body.target,

            prescription: req.body.prescription

        });


        await data.save();


        res.json({
            success:true,
            message:"Prescription Sent Successfully",
            data:data
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });
    }
};


module.exports={
    sendPrescription
};