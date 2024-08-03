"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.POSTGRE
});
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const result = yield client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );    
        `);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
const insertInUserTable = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3);';
        const result = yield client.query(insertQuery, [username, email, password]);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const getUserQuery = 'SELECT * FROM users WHERE email = $1';
        const result = yield client.query(getUserQuery, [email]);
        if (result.rows.length > 0) {
            console.log("User found:", result.rows[0]);
            return;
        }
        else {
            console.log(`No user found with the given email.`);
            return null;
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
const createAddressTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = `CREATE TABLE address (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`;
        const result = yield client.query(query);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
const insertInAddressTable = (user_id, city, country, street, pincode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = "INSERT INTO address (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5);";
        const result = yield client.query(query, [user_id, city, country, street, pincode]);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
const getUserAndAddress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN address a ON u.id = a.user_id
            WHERE u.id = $1;`;
        const result = yield client.query(query, [userId]);
        console.log(result.rows);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield client.end();
    }
});
