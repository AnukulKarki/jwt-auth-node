import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";


export default connection.define("user",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        set(value){
            console.log("Value"+value);
            const hashPassword = bcrypt.hashSync(value, 10);
            console.log("From end Value"+value);
            console.log("HashPassword"+hashPassword);
            this.setDataValue("password", hashPassword);
        }

    }
},{
    timestamps:false,
})