import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import Card from '../components/Cards/CardAdmin';
import Navbar from '../components/Navbar';
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';

const AdminItems = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [category, setCategory] = useState('Saree'); // Default category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/admin/products/all", {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  const openModal = (product = null) => {
    setSelectedFiles([]);
    setFilePreviews([]);
    setEditProduct(product !== null ? products[product] : null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFiles([]);
    filePreviews.forEach(url => URL.revokeObjectURL(url));
    setFilePreviews([]);
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const uniqueFiles = acceptedFiles.filter(
      (file) => !selectedFiles.some((selectedFile) => selectedFile.name === file.name)
    );

    const newPreviews = uniqueFiles.map(file => URL.createObjectURL(file));
    setSelectedFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
    setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  }, [selectedFiles, filePreviews]);

  const handleDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  const openConfirmDialog = (index) => {
    setProductToDelete(index);
    setConfirmDialogIsOpen(true);
  };

  const closeConfirmDialog = () => {
    setProductToDelete(null);
    setConfirmDialogIsOpen(false);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      const updatedProducts = products.filter((_, i) => i !== productToDelete);
      setProducts(updatedProducts);
    }
    closeConfirmDialog();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const productDetails = {
      ...editProduct,
      productName: e.target.productName.value,
      description: e.target.description.value,
      fabric: e.target.fabric.value,
      color: e.target.color.value,
      price: parseFloat(e.target.price.value),
      category, // Added category field
      images: selectedFiles.length ? selectedFiles.map(file => URL.createObjectURL(file)) : editProduct.images
    };

    const updatedProducts = products.map((product, index) => 
      index === products.indexOf(editProduct) ? productDetails : product
    );
    setProducts(updatedProducts);
    closeModal();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const productDetails = {
      specialCategory: null,
      category, // Added category field
      productName: '',
      description: '',
      fabric: '',
      color: '',
      price: 0,
      images: selectedFiles.map(file => URL.createObjectURL(file))
    };

    setProducts([...products, productDetails]);
    closeModal();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: true
  });

  return (
    <>
      <Navbar />
      <div className="p-8 pt-16">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => openModal()}
        >
          Add Product
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={index}
              product={product}
              onEdit={() => openModal(index)}
              onDelete={() => openConfirmDialog(index)}
            />
          ))}
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className="p-4">
          {editProduct === null ? (
            <>
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <form onSubmit={handleAddSubmit}>
                <div
                  {...getRootProps()}
                  className={`border-4 border-dashed p-20 mb-4 text-center ${isDragActive ? 'border-green-500' : 'border-gray-300'} rounded-lg`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-lg font-semibold text-green-500">Drop the files here ...</p>
                  ) : (
                    <p className="text-lg font-semibold text-gray-500">Drag 'n' drop some images here, or click to select images</p>
                  )}
                </div>
                
                {filePreviews.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {filePreviews.map((preview, index) => (
                      <div key={index} className="relative border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={preview}
                          alt="Selected"
                          className="w-full h-32 object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                        <p className="text-center text-sm mt-2">{selectedFiles[index].name}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-400 text-white px-4 py-2 rounded"
                >
                  Upload
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                {editProduct.images && editProduct.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {editProduct.images.map((image, index) => (
                      <div key={index} className="relative border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt="Product"
                          className="w-full h-32 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )} 
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Product Name:</label>
                <input type="text" name="productName" placeholder="Product Name" defaultValue={editProduct.productName} className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="Saree">Saree</option>
                    <option value="Salwar Suit">Salwar Suit</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Product Description:</label>
                <textarea name="description" placeholder="Description" defaultValue={editProduct.description} className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Fabric:</label>
                <input type="text" name="fabric" placeholder="Fabric" defaultValue={editProduct.fabric} className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Color:</label>
                <input type="text" name="color" placeholder="Color" defaultValue={editProduct.color} className="mb-4 p-2 border border-gray-300 rounded w-full" required />      
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Price:</label>
                <input type="number" step="0.01" name="price" placeholder="Price" defaultValue={editProduct.price} className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </form>
            </>
          )}          </div>
        </Modal>
        <ConfirmDialog
          isOpen={confirmDialogIsOpen}
          onRequestClose={closeConfirmDialog}
          
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this product?"
        />
      </div>
    </>
  );
};

export default AdminItems;
