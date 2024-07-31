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
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
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
createTable();
const insertInTable = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
            INSERT INTO users (username, email, password) 
            VALUES (hi, hi@gmail.com, 123);
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
insertInTable('aks', 'aks@gmail.com', '1_69420');
