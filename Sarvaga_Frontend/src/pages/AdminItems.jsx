import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import Card from '../components/Cards/CardAdmin';
import Navbar from '../components/Navbar';
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import ImageCompressor from 'image-compressor';
import { useAuth0 } from '@auth0/auth0-react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import axiosInstance from '../api/AxiosInstance';

const AdminItems = () => {
  const axiosInstance = axios.create({
    baseURL: "https://api.sarvagafashions.com/BE",
  });
  const { isLoading } = useAuth0();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [category, setCategory] = useState('Saree');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/admin/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosInstance]);

  const openModal = (product = null) => {
    setSelectedFiles([]);
    setFilePreviews([]);
    setEditProduct(product !== null ? products[product] : null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFiles([]);
    setFilePreviews([]);
  };

  const handleDrop = useCallback(async (acceptedFiles) => {
    const uniqueFiles = acceptedFiles.filter(
      (file) => !selectedFiles.some((selectedFile) => selectedFile.name === file.name)
    );

    const compressedFiles = await Promise.all(uniqueFiles.map(async (file) => {
      const compressedFile = await new ImageCompressor().compress(file, {
        quality: 0.8,
        maxWidth: 800,
      });
      return compressedFile;
    }));

    const newPreviews = compressedFiles.map(file => URL.createObjectURL(file));
    setSelectedFiles(prevFiles => [...prevFiles, ...compressedFiles]);
    setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  }, [selectedFiles]);

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = [...filePreviews];
    updatedPreviews.splice(index, 1);
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const productDetails = {
      ...editProduct,
      productName: e.target.productName.value,
      description: e.target.description.value,
      fabric: e.target.fabric.value,
      color: e.target.color.value,
      price: parseFloat(e.target.price.value),
      category,
      images: selectedFiles.map(file => URL.createObjectURL(file))
    };

    const updatedProducts = products.map((product, index) =>
      index === products.indexOf(editProduct) ? productDetails : product
    );
    setProducts(updatedProducts);
    closeModal();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('images', file));

    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newProduct = {
        specialCategory: null,
        category,
        productName: e.target.productName.value,
        description: e.target.description.value,
        fabric: e.target.fabric.value,
        color: e.target.color.value,
        price: parseFloat(e.target.price.value),
        images: selectedFiles.map(file => URL.createObjectURL(file))
      };

      setProducts([...products, newProduct]);
      closeModal();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: true
  });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <PropagateLoader color='#A855F7' />
        </div>
      ) : (
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
                      <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product Name:</label>
                      <input type="text" name="productName" placeholder="Product Name" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
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
                      <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Product Description:</label>
                      <textarea name="description" placeholder="Description" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                      <label htmlFor="fabric" className="block text-gray-700 font-semibold mb-2">Fabric:</label>
                      <input type="text" name="fabric" placeholder="Fabric" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                      <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">Color:</label>
                      <input type="text" name="color" placeholder="Color" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                      <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
                      <input type="number" step="0.01" name="price" placeholder="Price" className="mb-4 p-2 border border-gray-300 rounded w-full" required />
                      <div className="mb-4">
                        <div
                          {...getRootProps()}
                          className={`border-4 border-dashed p-20 text-center ${isDragActive ? 'border-green-500' : 'border-gray-300'} rounded-lg`}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p className="text-lg font-semibold text-green-500">Drop the files here ...</p>
                          ) : (
                            <p className="text-lg font-semibold text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                          )}
                        </div>
                        <div className="flex flex-wrap mt-4">
                          {filePreviews.map((preview, index) => (
                            <div key={index} className="relative w-24 h-24 m-2 border border-gray-300 rounded">
                              <img src={preview} alt={`preview-${index}`} className="object-cover w-full h-full rounded" />
                              <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <form onSubmit={handleEditSubmit}>
                      <label htmlFor="productName" className="block text-gray-700 font-semibold mb-2">Product Name:</label>
                      <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        defaultValue={editProduct.productName}
                        required
                      />
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
                      <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Product Description:</label>
                      <textarea
                        name="description"
                        placeholder="Description"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        defaultValue={editProduct.description}
                        required
                      />
                      <label htmlFor="fabric" className="block text-gray-700 font-semibold mb-2">Fabric:</label>
                      <input
                        type="text"
                        name="fabric"
                        placeholder="Fabric"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        defaultValue={editProduct.fabric}
                        required
                      />
                      <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">Color:</label>
                      <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        defaultValue={editProduct.color}
                        required
                      />
                      <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="Price"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        defaultValue={editProduct.price}
                        required
                      />
                      <div className="mb-4">
                        <div
                          {...getRootProps()}
                          className={`border-4 border-dashed p-20 text-center ${isDragActive ? 'border-green-500' : 'border-gray-300'} rounded-lg`}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p className="text-lg font-semibold text-green-500">Drop the files here ...</p>
                          ) : (
                            <p className="text-lg font-semibold text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                          )}
                        </div>
                        <div className="flex flex-wrap mt-4">
                          {filePreviews.map((preview, index) => (
                            <div key={index} className="relative w-24 h-24 m-2 border border-gray-300 rounded">
                              <img src={preview} alt={`preview-${index}`} className="object-cover w-full h-full rounded" />
                              <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
                    </form>
                  </>
                )}
              </div>
            </Modal>
            <ConfirmDialog
              isOpen={confirmDialogIsOpen}
              onRequestClose={closeConfirmDialog}
              onConfirm={handleConfirmDelete}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AdminItems;
