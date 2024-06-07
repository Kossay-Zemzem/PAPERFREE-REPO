const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const { promisify } = require('util');
const PORT = 8000;

require('dotenv').config()
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});


app.use(express.json(), cors(), bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});


app.post("/askchatgpt", async (req, res) => {
    try {
        const { name, surname, id, image } = req.body;


        // Read image file
        const imageBuffer = await promisify(fs.readFile)(image);
        const imageBase64 = imageBuffer.toString('base64');

        const completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "system",
                    content:
                        `You are a document comparator, you will receive an object with data and an image to analyze. 
                        Please verify if the data on the image matches the data provided in the object.`,
                },
                {
                    role: "user",
                    content: JSON.stringify({ name, surname, id, image: imageBase64 }),
                },
            ],
            response_format: { type: "json_object" },
        });

        const response = completion.choices[0].message.content;
        console.log(response);

        res.json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});