import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Scrape endpoint
app.get('/api/scrape', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter is required' });
    }

    // Fetch Amazon search results
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    const response = await axios.get(url, { headers });
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Extract product data
    const products = [];
    const items = document.querySelectorAll('.s-result-item[data-component-type="s-search-result"]');

    items.forEach(item => {
      const titleEl = item.querySelector('h2 a span');
      const title = titleEl?.textContent?.trim() || 'N/A';
      
      const ratingEl = item.querySelector('.a-icon-star-small .a-icon-alt');
      const rating = ratingEl?.textContent?.split(' ')[0] || 'N/A';
      
      const reviewsEl = item.querySelector('.a-size-small .a-link-normal .a-size-base');
      const reviews = reviewsEl?.textContent?.replace(/[,.]/g, '') || '0';
      
      const imageEl = item.querySelector('img.s-image');
      const imageUrl = imageEl?.src || '';

      if (title !== 'N/A') {
        products.push({
          title,
          rating: isNaN(parseFloat(rating)) ? 'N/A' : parseFloat(rating),
          reviews: parseInt(reviews) || 0,
          imageUrl
        });
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ 
      error: 'Failed to scrape data', 
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});