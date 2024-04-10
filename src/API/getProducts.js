// В файле API.js

export const getProducts = async () => {
  const response = await fetch('http://localhost:3000/product');
  const data = await response.json();
  return data;
};

export const addProduct = async (newProduct) => {
  const response = await fetch('http://localhost:3000/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  const data = await response.json();
  return data;
};

export const updateProduct = async (productId, updatedProduct) => {
  const response = await fetch(`http://localhost:3000/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  });
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId) => {
  await fetch(`http://localhost:3000/product/${productId}`, {
    method: 'DELETE',
  });
};

export const getCategories = async () => {
  const response = await fetch('http://localhost:3000/category');
  const data = await response.json();
  return data;
};

export const addCategory = async (title) => {
  const response = await fetch('http://localhost:3000/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data;
};

export const updateCategory = async (categoryId, updatedCategory) => {
  const response = await fetch(`http://localhost:3000/category/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCategory),
  });
  const data = await response.json();
  return data;
};

export const deleteCategory = async (categoryId) => {
  await fetch(`http://localhost:3000/category/${categoryId}`, {
    method: 'DELETE',
  });
};
