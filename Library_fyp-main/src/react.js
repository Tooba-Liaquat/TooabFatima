import MSSQL from "react-native-mssql";
const config = {
    server: '192.168.1.102', //ip address of the mssql database
    username: 'DESKTOP-K1S7JAT', //username to login to the database
    password: 'ayesha123', //password to login to the database
    database: 'Student', //the name of the database to connect to
 //   port: 1234, //OPTIONAL, port of the database on the server
   // timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = await MSSQL.connect(config);