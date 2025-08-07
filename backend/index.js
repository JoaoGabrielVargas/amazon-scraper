import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`backend running on http://localhost:${PORT}`)
});