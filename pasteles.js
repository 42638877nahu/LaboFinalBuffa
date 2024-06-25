const API_URL = 'https://api.yumserver.com/17045/products';

async function getProductos() {
  const response = await fetch(API_URL);
  return response.json();
}

async function addProducto(producto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });
  return response.text();
}

async function updateProducto(producto) {
  const response = await fetch(API_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });
  return response.text();
}

async function deleteProducto(idcod) {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idcod })
  });
  return response.text();
}
