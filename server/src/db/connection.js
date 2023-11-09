const mongoose=require('mongoose')
const connection=async()=>{
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/hamro-bhansa');


        if (conn) {
            console.log("Connection to MongoDB successful");
        }
    } catch (err) {
        console.error(err);
    }

}
module.exports=connection