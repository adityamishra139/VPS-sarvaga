import express, { Request, Response } from "express";
import { z } from "zod";
import { PrismaClient, Product } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Configure multer storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/../uploads/products/"),
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500000 }, // 500KB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).array("productImage", 4);

// Define validation schema
const adminSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
});

const productSchema = z.object({
  specialCategory: z.string().optional(),
  category: z.string(),
  productName: z.string(),
  description: z.string(),
  fabric: z.string(),
  color: z.string(),
  images: z.array(z.object({ url: z.string() })).optional(),
  price: z.number(),
  productCode: z.string(),
});

// Admin functions
async function insertAdmin(username: string, email: string, name: string) {
  return prisma.admin.create({
    data: { username, email, name },
  });
}
async function checkAdmin(email: string) {
  return prisma.admin.findFirst({ where: { email } });
}

async function updateProductById(
  id: number,
  specialCategory?:string,
  price?: number,
  productCode?: string,
  color?: string,
  fabric?: string,
  description?: string,
  productName?: string,
  category?: string
) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        specialCategory:specialCategory,
        price: price,
        productCode: productCode,
        color: color,
        fabric: fabric,
        description: description,
        productName: productName,
        category: category
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  } finally {
    await prisma.$disconnect();
  }
}


// Product functions
async function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    include: {
      images: true,
    },
  });
}

async function insertProduct(data: {
  specialCategory?: string;
  category: string;
  productName: string;
  description: string;
  fabric: string;
  color: string;
  productCode: string;
  images: { url: string }[];
  price: number;
}) {
  return prisma.product.create({
    data: {
      specialCategory: data.specialCategory,
      category: data.category,
      productName: data.productName,
      description: data.description,
      fabric: data.fabric,
      color: data.color,
      price: data.price,
      productCode: data.productCode,
      images: {
        create: data.images,
      },
    },
  });
}

async function deleteProductById(id: number): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} does not exist.`);
    }
    await prisma.cartProduct.deleteMany({
      where: { productId: id },
    });
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    throw new Error(`Error deleting product: ${error.message}`);
  }
}

async function getProductsById(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  return prisma.product.findMany({ where: { category } });
}

async function deleteImageById(id: number): Promise<any> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!product || !product.images || product.images.length === 0) {
      throw new Error('Image not found');
    }
    const imagePath = product.images[0].url; 
    const fullPath = path.join(__dirname, '/../uploads/products/', path.basename(imagePath));
    fs.unlink(fullPath, (err) => {
      if (err) {
        throw new Error(`Error deleting file: ${err.message}`);
      }
    });
    await prisma.product.update({
      where: { id },
    data: { images: { set: [] } },
    });

    return { message: 'Image deleted successfully' };
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  } finally {
    await prisma.$disconnect();
  }
}


// Routes
router.post("/signup", async (req: Request, res: Response) => {
  const { username, email, name } = req.body;

  const inputValidation = adminSchema.safeParse({ username, email, name });
  if (!inputValidation.success) {
    return res.status(400).json({ msg: "Inputs are not valid" });
  }

  try {
    const response = await insertAdmin(username, email, name);
    res.status(201).json({ msg: "Admin created successfully", res: response });
  } catch (error: any) {
    res.status(500).json({ msg: "Error creating admin", error: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const { username, email, name } = req.body;

  const inputValidation = adminSchema.safeParse({ username, email, name });
  if (!inputValidation.success) {
    return res.status(400).json({ msg: "Inputs are not valid" });
  }

  try {
    const response = await checkAdmin(email);
    if (response) {
      res
        .status(200)
        .json({ msg: "Admin Verified Successfully", res: response });
    } else {
      res.status(400).json({ msg: "Admin Access Denied" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ msg: "Error Verifying admin", error: error.message });
  }
});

router.post("images/upload", (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else if (!req.files) {
      res.status(400).json({ msg: "No file selected" });
    } else {
      const filePaths = (req.files as Express.Multer.File[]).map(
        (file) => `/uploads/products/${file.filename}`
      );
      res.status(200).json({
        msg: "Files uploaded",
        filePaths,
      });
    }
  });
});

router.get("/products/all", async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error: any) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await getProductsById(id);
    res.json(product);
  } catch (error: any) {
    res
      .status(500)
      .json({ msg: "Error fetching product", error: error.message });
  }
});

router.get(
  "/products/category/:category",
  async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
      const products = await getProductsByCategory(category);
      res.json(products);
    } catch (error: any) {
      res
        .status(500)
        .json({ msg: "Error fetching products", error: error.message });
    }
  }
);

router.post(
  "/products/addProducts",
  upload,
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map((file) => ({
      url: `/uploads/products/${file.filename}`,
    }));

    const productData = {
      ...req.body,
      price: parseFloat(req.body.price),
      images: imageUrls,
    };
    const inputValidation = productSchema.safeParse(productData);
    if (!inputValidation.success) {
      console.log(inputValidation.error.format());
      return res.status(400).json({ msg: "Invalid product format" });
    }

    try {
      const newProduct = await insertProduct(productData);
      res
        .status(201)
        .json({ msg: "Product added successfully", product: newProduct });
    } catch (error: any) {
      res
        .status(500)
        .json({ msg: "Error adding product", error: error.message });
    }
  }
);

router.post("/products/updateProduct", async (req: Request, res: Response) => {
  const {
    id,
    specialCategory,
    category,
    productName,
    description,
    fabric,
    price,
    color,
    productCode,
  } = req.body;

  try {
    const updatedProduct = await updateProductById(
      id,
      specialCategory,
      price,
      productCode,
      color,
      fabric,
      description,
      productName,
      category
    );

    res.status(200).json({
      msg: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error:any) {
    console.error("Error updating product:", error);
    res.status(500).json({
      msg: "Failed to update product",
      error: error.message,
    });
  }
});

router.delete("/products/delete", async (req: Request, res: Response) => {
  let { id } = req.body;
  try {
    const deletedProduct = await deleteProductById(parseInt(id));
    res
      .status(200)
      .json({ msg: "Product deleted successfully", product: deletedProduct });
  } catch (error: any) {
    res
      .status(500)
      .json({ msg: "Error deleting product", error: error.message });
  }
});

router.put("/orders/*", (req: Request, res: Response) => {
  // Implement orders update logic here
  res.send("Orders update endpoint");
});

router.get("/stats/*", (req: Request, res: Response) => {
  // Implement stats retrieval logic here
  res.send("Stats endpoint");
});

export default router;
