const express = require('express');
const app = express();
const port = 3000;

/* Improved product data */
const products = [
  {
    id: '101',
    name: 'Developer Laptop Pro',
    category: 'Electronics',
    price: 70000,
    rating: 4.8,
    badge: 'Best Seller',
    desc: 'High-performance laptop optimized for development, DevOps, and cloud workloads.'
  },
  {
    id: '102',
    name: 'AI Camera Smartphone',
    category: 'Mobiles',
    price: 1000,
    rating: 4.6,
    badge: 'New Launch',
    desc: 'Next-generation smartphone with AI-powered camera and ultra-fast performance.'
  },
  {
    id: '103',
    name: 'Noise Cancelling Headphones',
    category: 'Accessories',
    price: 5000,
    rating: 4.5,
    badge: 'Trending',
    desc: 'Wireless headphones with active noise cancellation and crystal-clear sound.'
  },
  {
    id: '104',
    name: 'Smart Fitness Watch',
    category: 'Wearables',
    price: 12000,
    rating: 4.7,
    badge: 'Popular',
    desc: 'Advanced fitness tracking with heart rate monitoring and smart notifications.'
  }
];

/* Home Page */
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NodeJS Product Store</title>

<style>
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #f4f6f9;
  }

  header {
    background: linear-gradient(90deg, #1a237e, #3949ab);
    color: white;
    padding: 35px;
    text-align: center;
  }

  header h1 {
    margin: 0;
    font-size: 36px;
  }

  header p {
    margin: 8px 0;
    font-size: 15px;
  }

  .container {
    padding: 40px;
    max-width: 1200px;
    margin: auto;
  }

  .products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 25px;
  }

  .card {
    background: white;
    padding: 22px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    transition: transform 0.25s, box-shadow 0.25s;
  }

  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }

  .badge {
    display: inline-block;
    background: #ff9800;
    color: white;
    padding: 4px 12px;
    border-radius: 14px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .card h3 {
    margin-top: 10px;
    margin-bottom: 6px;
    color: #1a237e;
  }

  .category {
    font-size: 13px;
    color: #757575;
    margin-bottom: 10px;
  }

  .rating {
    font-size: 14px;
    color: #fbc02d;
    margin: 8px 0;
  }

  .price {
    font-size: 20px;
    color: #2e7d32;
    font-weight: bold;
    margin: 10px 0;
  }

  .btn {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 16px;
    background: #1a237e;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 14px;
  }

  .btn:hover {
    background: #0d154f;
  }

  footer {
    background: #1a237e;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 40px;
    font-size: 14px;
  }
</style>
</head>

<body>

<header>
  <h1>🚀 HiQode - Demo NodeJS Product Store</h1>
  <p>This application will be automatically deployed using AWS CodePipeline and CodeDeploy.</p>
  <p>Each new version of this application will be deployed automatically using AWS CodePipeline.</p>
  <p><strong>Version 4.0</strong></p>
</header>

<div class="container">
  <h2>Our Products</h2>

  <div class="products">
    ${products.map(p => `
      <div class="card">
        <span class="badge">${p.badge}</span>
        <h3>${p.name}</h3>
        <div class="category">${p.category}</div>
        <p>${p.desc}</p>
        <div class="rating">⭐ ${p.rating} / 5</div>
        <div class="price">₹ ${p.price}</div>
        <a class="btn" href="/products-ui">View Products</a>
      </div>
    `).join('')}
  </div>
</div>

<footer>
  © 2025 | NodeJS Demo App | AWS CI/CD (Planned)
</footer>

</body>
</html>
  `);
});

/* Products API (Machine-readable) */
app.get('/products', (req, res) => {
  res.json(products);
});

/* Products UI (Human-readable) */
app.get('/products-ui', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Products API Viewer</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background: #f4f6f9;
    padding: 30px;
  }
  h1 {
    color: #1a237e;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    margin-top: 20px;
  }
  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  th {
    background: #1a237e;
    color: white;
  }
  tr:hover {
    background: #f1f1f1;
  }
</style>
</head>

<body>

<h1>🛒 Products – Visual View</h1>
<p>This page renders data from the backend <strong>/products</strong> API.</p>

<table>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Category</th>
    <th>Price</th>
    <th>Rating</th>
    <th>Status</th>
  </tr>

  ${products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>₹ ${p.price}</td>
      <td>⭐ ${p.rating}</td>
      <td>${p.badge}</td>
    </tr>
  `).join('')}

</table>

</body>
</html>
  `);
});

/* Start Server */
app.listen(port, () => {
  console.log(`🚀 Demo app running on port ${port}`);
});
