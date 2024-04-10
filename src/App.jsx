// В файле App.jsx

import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories, addCategory } from "./API";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: 0, category: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [newCategory, setNewCategory] = useState('');
  const productsPerPage = 5; // Количество продуктов на странице
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    (async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      // Если выбрана категория "Все категории", отображаем все продукты
      (async () => {
        try {
          const productsData = await getProducts();
          setProducts(productsData);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      })();
    } else {
      // Иначе фильтруем продукты по выбранной категории
      const filteredProducts = products.filter(product => product.category === selectedCategory);
      setProducts(filteredProducts);
    }
  }, [selectedCategory, products]); // Добавлен products в зависимости

  const handleAddProduct = async () => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]);
      setNewProduct({ title: '', price: 0, category: '' });
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
    }
  };

  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const editedProduct = await updateProduct(productId, updatedProduct);
      setProducts(products.map(product =>
        product.id === productId ? editedProduct : product
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Ошибка при редактировании продукта:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCategory = async () => {
    try {
      const addedCategory = await addCategory(newCategory);
      setCategories([...categories, addedCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  };

  return (
    <div className="container">
      <h1>Список продуктов</h1>
      
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="all">Все категории</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </select>

      <ul>
        {currentProducts.map((product) => (
          <li key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editingProduct.title}
                  onChange={handleEditInputChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleEditProduct(product.id, editingProduct)}>Сохранить</button>
                <button onClick={handleCancelEdit}>Отмена</button>
              </div>
            ) : (
              <div>
                {product.title}: {product.price}
                <button onClick={() => handleEdit(product)}>Редактировать</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Предыдущая страница</button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Следующая страница</button>
      </div>

      <h2>Добавить новый продукт</h2>
      <input
        type="text"
        placeholder="Название продукта"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        placeholder="Цена"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <button onClick={handleAddProduct}>Добавить</button>

      <h2>Добавить новую категорию</h2>
      <input
        type="text"
        placeholder="Название категории"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Добавить</button>
    </div>
  );
};

export default App;
