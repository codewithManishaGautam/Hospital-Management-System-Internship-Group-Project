const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
const userLoginSchema = new Schema({
        email: 
        { type: String, 
        required: true 
        },
});


userLoginSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("UserLogin",userLoginSchema);