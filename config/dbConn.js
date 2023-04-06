const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASEURI, {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDB