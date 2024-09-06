const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Function to read the secrets JSON file and set environment variables
function setCredentialsFromSecretsFile() {
    // Define the path to the secrets.json file in the parent directory
    const secretsFilePath = path.join(__dirname, '..', 'secrets', 'secrets.json');

    try {
        // Read and parse the secrets file
        const secrets = JSON.parse(fs.readFileSync(secretsFilePath, 'utf-8'));

        // Check if the required keys are present
        if (!secrets.username || !secrets.password) {
            console.error('Error: Secrets file is missing required fields (username and/or password).');
            process.exit(1);
        }

        // Set the credentials as environment variables
        process.env.USERNAME = secrets.username;
        process.env.ACCESS_KEY = secrets.password;

        console.log('Credentials set as environment variables.');
    } catch (err) {
        console.error('Error reading the secrets file:', err.message);
        process.exit(1);
    }
}

// Run the function to set credentials
setCredentialsFromSecretsFile();

module.exports = {
    username: process.env.USERNAME,
    password: process.env.ACCESS_KEY,
};