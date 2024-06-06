const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 8000;

require('dotenv').config()
const OpenAI = require ("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });


app.use(express.json(), cors(),bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.post("/askchatgpt" , async(req,res) =>{
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          `You are a document comparator , you will receive an object with data and an image you will analyse that image 
          and verify if the data on the image is similar to the data in the object and return an json array with this format:
          {"objectList" : [{ "objectName" : "", "similarity"(from 0 to 100): "" }] }
          . Your response should be in JSON format.`,
      },
      { role: "user", content: "Hello!" },
    ],
    response_format: { type: "json_object" },
  });
  console.log(completion.choices[0].message.content);
  // Check if the OpenAI API response is a valid JSON
  const isJSON = (obj) => {
    try {
      JSON.parse(obj);
      return true;
    } catch (e) {
      return false;
    }
  };

  console.log(isJSON(completion.choices[0].message.content));
})


app.listen(PORT, () => {
console.log(`Proxy server is running on http://localhost:${PORT}`);
  });