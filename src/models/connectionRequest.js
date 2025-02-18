const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{
    timestamps:true,
})
connectionRequestSchema.index({fromUserId:1,toUserId:1})
connectionRequestSchema.pre("save",function(){
    const connectionReq = this;
    // check if the froUserId is same as toUserId
    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("can not send connection request to youself")
    }
    next();
})

const ConnectionRequestModel = mongoose.model("ConnectionRequestModel",connectionRequestSchema)
module.exports = ConnectionRequestModel