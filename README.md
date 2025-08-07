# Amazon Product Scraper

A simple web application that scrapes Amazon product listings based on search keywords.

## Features
- Search Amazon products by keyword
- Display product title, rating, reviews, and image
- Responsive design

## Technologies
- **Backend**: Bun (Express, Axios, JSDOM)
- **Frontend**: Vite (Vanilla JS, HTML, CSS)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Bun (v1.0+)
- Vite (v5+)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   bun install

3. Start the server::
   ```bash
   bun run index.js

   Server will run at http://localhost:3000

### Frontend Setup
1. Navigate to the frontend directory::
   ```bash
   cd frontend

2. Install dependencies::
   ```bash
   npm install

3. Start the development server::
   ```bash
   npm run dev

4. Open the application in your browser at the provided URL (usually http://localhost:5173)

### Usage 
1. Enter a search keyword (e.g., "laptops", "wireless headphones")
2. Click "Search Products"
3. View the scraped product listings from Amazon's first page of results

### Notes 
- Amazon might block requests if made too frequently (can return error 503)
- The scraping logic might need updates if Amazon changes their HTML structure
- Use responsibly and comply with Amazon's terms of service

### Key Features and Considerations

1. **Robust Backend:**
   - Proper error handling for missing keywords
   - User-agent header to mimic browser requests
   - CORS handling for frontend access
   - Data validation and sanitization

2. **User-Friendly Frontend:**
   - Responsive grid layout for product cards
   - Loading states and error messages
   - Accessible form with keyboard support
   - Image fallback for missing product images
   - Mobile-friendly design

3. **Error Handling:**
   - Network error handling
   - Empty results handling
   - Invalid response handling
   - Input validation

4. **Performance:**
   - Efficient DOM parsing with JSDOM
   - Asynchronous API calls
   - Image lazy-loading (could be added)

5. **Security:**
   - Input sanitization
   - CORS restrictions
   - Error messages without sensitive data

**Important Notes:**
1. Amazon's HTML structure may change over time, requiring selector updates
2. High-frequency scraping might lead to IP blocking by Amazon
3. Always check a website's terms of service before scraping
4. Results are limited to the first page of Amazon search results

This implementation provides a complete, functional solution that follows modern web development practices while maintaining simplicity as requested.