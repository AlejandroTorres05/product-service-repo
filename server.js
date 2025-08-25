const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para JSON
app.use(express.json());

// Ruta principal del servicio
app.get('/products', (req, res) => {
  res.json({
    service: "products-service", 
    message: "¡Hola desde el servicio de productos!", 
    data: [
      { id: 1, name: "Laptop Dell", price: 899.99, category: "Computadoras" },
      { id: 2, name: "Mouse Logitech", price: 25.50, category: "Accesorios" },
      { id: 3, name: "Teclado Mecánico", price: 120.00, category: "Accesorios" },
      { id: 4, name: "Monitor 24\"", price: 199.99, category: "Monitores" }
    ],
    timestamp: new Date().toISOString()
  });
});

// Ruta para obtener un producto específico
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: "Laptop Dell", price: 899.99, category: "Computadoras" },
    { id: 2, name: "Mouse Logitech", price: 25.50, category: "Accesorios" },
    { id: 3, name: "Teclado Mecánico", price: 120.00, category: "Accesorios" },
    { id: 4, name: "Monitor 24\"", price: 199.99, category: "Monitores" }
  ];
  
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json({
      service: "products-service",
      message: `Producto encontrado: ${product.name}`,
      data: product,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({
      service: "products-service",
      message: "Producto no encontrado",
      error: `No existe producto con ID ${productId}`
    });
  }
});

// Ruta para filtrar productos por categoría
app.get('/products/category/:category', (req, res) => {
  const category = req.params.category;
  const products = [
    { id: 1, name: "Laptop Dell", price: 899.99, category: "Computadoras" },
    { id: 2, name: "Mouse Logitech", price: 25.50, category: "Accesorios" },
    { id: 3, name: "Teclado Mecánico", price: 120.00, category: "Accesorios" },
    { id: 4, name: "Monitor 24\"", price: 199.99, category: "Monitores" }
  ];
  
  const filteredProducts = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    service: "products-service",
    message: `Productos en categoría: ${category}`,
    data: filteredProducts,
    total: filteredProducts.length,
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud del servicio
app.get('/health', (req, res) => {
  res.json({
    status: "OK", 
    service: "products-service",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    service: "products-service",
    message: "Servicio de productos funcionando correctamente",
    endpoints: [
      "GET /products - Lista todos los productos",
      "GET /products/:id - Obtiene un producto específico",
      "GET /products/category/:category - Filtra productos por categoría",
      "GET /health - Estado del servicio"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Products Service corriendo en puerto ${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET http://localhost:${PORT}/products`);
  console.log(`   GET http://localhost:${PORT}/products/:id`);
  console.log(`   GET http://localhost:${PORT}/products/category/:category`);
  console.log(`   GET http://localhost:${PORT}/health`);
});