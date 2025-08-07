document.addEventListener('DOMContentLoaded', () => {
  const keywordInput = document.getElementById('keywordInput');
  const scrapeBtn = document.getElementById('scrapeBtn');
  const resultsContainer = document.getElementById('resultsContainer');
  const errorContainer = document.getElementById('errorContainer');

  // Handle search button click
  scrapeBtn.addEventListener('click', () => {
    const keyword = keywordInput.value.trim();
    
    if (!keyword) {
      showError('Please enter a search keyword');
      return;
    }
    
    fetchProducts(keyword);
  });

  // Handle Enter key in input field
  keywordInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      scrapeBtn.click();
    }
  });

  async function fetchProducts(keyword) {
    // Clear previous results and errors
    resultsContainer.innerHTML = '<div class="loading">Loading products...</div>';
    errorContainer.style.display = 'none';
    
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }
      
      const products = await response.json();
      displayResults(products);
    } catch (error) {
      console.error('Fetch error:', error);
      showError(error.message || 'An error occurred while fetching products');
    }
  }

  function displayResults(products) {
    if (products.length === 0) {
      resultsContainer.innerHTML = '<div class="loading">No products found</div>';
      return;
    }
    
    resultsContainer.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=Image+Not+Available'">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-rating">
            <span class="rating-stars">${product.rating !== 'N/A' ? '★'.repeat(Math.round(product.rating)) : 'N/A'}</span>
            <span>${product.rating}</span>
          </div>
          <div class="product-reviews">${product.reviews.toLocaleString()} reviews</div>
        </div>
      `;
      
      resultsContainer.appendChild(productCard);
    });
  }

  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    resultsContainer.innerHTML = '';
  }
});