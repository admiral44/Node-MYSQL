import { conn } from "../connection/conn.js";

// Create a function to execute database queries
export const executeQuery = async (query, params) => {

    // Create a connection pool
    const connection = conn.promise();

    // Execute the query with parameters
    const data = await connection.query(query, params).then(async(results) => {
        return { status: 200, message: "Success", data: results[0] };
    }).catch(async(error) => {
        return { status: 404, message: error.sqlMessage };
    })
    
    // Close the connection pool
    // connection.end();
    return data;
};

export const generateRandomString = (len = 50) => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
