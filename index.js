import express from 'express';
import connect from './src/dbconfig/dbconfig.js';
import routes from './src/routes/index.js';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MySQL
 const connection = connect();
 connection.connect((err) => {
   if (err) {
     console.error("Error connecting to MySQL:", err);
     return;
   }
   console.log("Connected to MySQL!");
});


// Create phones table
const createPhonesTableQuery = `
CREATE TABLE IF NOT EXISTS phones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    mobileno VARCHAR(10),
    userid INT,
    FOREIGN KEY (userid) REFERENCES users(id),
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

connection.query(createPhonesTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating phones table:", err);
        return;
    }
    console.log("phones table created successfully!");
});


// Create users table
const createUsersTableQuery =`
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;

connection.query(createUsersTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating users table:", err);
        return;
    }
    console.log("Users table created successfully!");

    // Close the connection
    connection.end();
});


// Attach routes
app.use('/api/v1', routes);

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);})