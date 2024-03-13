import mysql from "mysql2";

 const connect = () => {
   return mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "phonebook",
    
   });
};

if(connect){
    console.log(connect);
  }
  console.log("database is connected")
export default connect ;

