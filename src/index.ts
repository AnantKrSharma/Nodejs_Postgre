import { Client } from "pg";
import dotenv from 'dotenv'
dotenv.config();


const client = new Client({
    connectionString: process.env.POSTGRE
})


const createTable = async () => {    
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
        `)
        console.log(result);

    } catch(error) {
        console.log(error);
    }
    finally{
        await client.end();
    }
}

createTable();


const insertInTable = async (username: string, email: string, password: string) => {
    try {
        // await client.connect()
        
        const result = await client.query(`
            INSERT INTO users (username, email, password) 
            VALUES (hi, hi@gmail.com, 123);
        `);
        console.log(result);

    } catch (error) {
        console.log(error);
    }    
    finally{
        await client.end();
    }
}

insertInTable('aks', 'aks@gmail.com', '1_69420')
