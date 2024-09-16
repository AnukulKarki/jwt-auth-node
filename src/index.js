import express from "express";
import connection from "./model/index.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get("/", async(req, res)=>{
    res.status(200).json("Backend is working")
});

app.use("/auth", authRouter);

app.listen(8000, async () =>{
    console.log("Server is running on port 8000");
    try{
        await connection.authenticate();
        connection.sync();
        console.log("Database connection has been established successfully");
    }catch(err){
        console.error("Unable to connect to the database:");
    }
})