import { Sequelize } from "sequelize";

const connection = new Sequelize("project", "root", "", {
    host: "localhost",
    dialect:"mysql",
    pool:{
        max:5,
    }
})

export default connection;

