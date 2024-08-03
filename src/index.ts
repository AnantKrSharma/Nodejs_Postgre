import { Client } from "pg";
import dotenv from 'dotenv'
dotenv.config();

const client = new Client({
    connectionString: process.env.POSTGRE
})

const createUsersTable = async () => {    
    try {
        await client.connect();

        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );    
        `);
        console.log(result);

    } catch(error) {
        console.log(error);
    }
    finally{
        await client.end();
    }
}

const insertInUserTable = async (username: string, email: string, password: string) => {
    try {
        await client.connect();

        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3);'
        const result = await client.query(insertQuery, [username, email, password]);
        console.log(result);

    } catch (error) {
        console.log(error);
    }    
    finally{
        await client.end();
    }
}

const getUser = async (email: string) => {
    try{
        await client.connect();

        const getUserQuery = 'SELECT * FROM users WHERE email = $1'
        const result = await client.query(getUserQuery, [email]);

        if(result.rows.length > 0){
            console.log("User found:", result.rows[0]);
            return;
        }
        else{
            console.log(`No user found with the given email.`);
            return null;
        }
    }
    catch(error){
        console.log(error);
    }
    finally{
        await client.end();
    }
}

const createAddressTable = async () => {
    try {
        await client.connect();

        const query = `CREATE TABLE address (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`
        const result = await client.query(query);
        console.log(result);

    } catch (error) {
        console.log(error);
    }
    finally{
        await client.end();
    }
}

const insertInAddressTable = async (user_id: number, city: string, country: string, street: string, pincode: string) => {
    try {
        await client.connect();

        const query = "INSERT INTO address (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5);"
        const result = await client.query(query, [user_id, city, country, street, pincode])
        console.log(result);
         
    } catch (error) {
        console.log(error);
    }
    finally{
        await client.end();
    }
}

const getUserAndAddress = async (userId: number) => {
    try {
        await client.connect();

        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN address a ON u.id = a.user_id
            WHERE u.id = $1;`
        const result = await client.query(query, [userId])
        console.log(result.rows);
        
    }
    catch (error) {
        console.log(error);
    }
    finally{
        await client.end();
    }
}

// createUsersTable();
// insertInUserTable('ep', 'ep@gmail.com', '3_69420');
// getUser('hk@gmail.com');

// createAddressTable();
// insertInAddressTable(2, 'Delhi', 'India', 'GHPS', '94');
// getUserAndAddress(2);
