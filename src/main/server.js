// server.js
const express = require('express');
const axios = require('axios');
const {username, password} = require('../setup/user_config')
const logger = require('../utils/logger');
const jobUrls = require('../resource/jobUrls');
const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to handle requests from the Slack bot
app.post('/trigger-job', async (req, res) => {
    const { jobType, userName } = req.body; // Expecting { jobType: "stage_smoke", userName: "username" }

    // Log the received request
    logger.info(`Received request for jobType: ${jobType} by user: ${userName}`);

    // Get the URL based on the job type received
    const targetUrl = jobUrls[jobType];

    if (!targetUrl) {
        logger.error(`Invalid job type received: ${jobType} by user: ${userName}`);
        return res.status(400).send({ error: 'Invalid job type' });
    }

    try {
        // Execute the curl equivalent using axios
        const response = await axios.get(targetUrl, {
            auth:{
                username,
                password,
            }
        });

        // Log the status code received from the curl execution
        logger.info(`Request to ${targetUrl} executed successfully with status code: ${response.status}`);

        res.send({ message: 'Request forwarded successfully', status: response.status });
    } catch (error) {
        logger.error(`Failed to execute request to ${targetUrl}: ${error.message}`);
        res.status(500).send({ error: `Failed to trigger job: ${error.message}` });
    }
});

// Start the proxy server
app.listen(port, () => {
    logger.info(`Proxy server running on port ${port}`);
});