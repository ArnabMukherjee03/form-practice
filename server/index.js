require("dotenv").config();
const server = require("./app");
const {connectDB} = require("./db/database")

connectDB();

(async()=>{
    try {
        await server.start();
        console.log(`Server is running at ${server.info.uri}`)
    } catch (error) {
        console.log("Something Went Wrong",error);
    }
})()