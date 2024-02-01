const sql =require("mysql2");


const connection = sql.createConnection({

    host:"localhost",
    user:"root",
    password:"Lavan@2015",
    database:"nodetask"
})

connection.connect((error)=>{

    if(error) throw error;

    console.log("data base connect successfully");
})

module.exports=connection;