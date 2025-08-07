import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

//CORS MIDDLEWARE HERE TO BYPASS CORS ISSUE WHEN SCRAPPING
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//AMAZON SCRAPING ENDPOINT
app.get('/', async (req, res) => {
  try {
    res.status(500).json('testing endpoint')
  } catch (error) {
    console.error('Error when scraping:', error);
    res.status(500).json({
      error: 'Failed to scrape data',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("port", PORT);
  console.log(`backend running on http://localhost:${PORT}`);
});