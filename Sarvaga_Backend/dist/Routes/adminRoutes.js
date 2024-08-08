"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.use(express_1.default.json());
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "/../uploads/products/"),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 500000 }, // 500KB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            cb(null, true);
        }
        else {
            cb(new Error("Error: Images Only!"));
        }
    },
}).array("productImage", 4);
// Define validation schema
const adminSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
});
const productSchema = zod_1.z.object({
    specialCategory: zod_1.z.string().optional(),
    category: zod_1.z.string(),
    productName: zod_1.z.string(),
    description: zod_1.z.string(),
    fabric: zod_1.z.string(),
    color: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.object({ url: zod_1.z.string() })).optional(),
    price: zod_1.z.number(),
    productCode: zod_1.z.string(),
});
// Admin functions
function insertAdmin(username, email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.admin.create({
            data: { username, email, name },
        });
    });
}
function checkAdmin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.admin.findFirst({ where: { email } });
    });
}
function updateProductById(id, specialCategory, price, productCode, color, fabric, description, productName, category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedProduct = yield prisma.product.update({
                where: { id: id },
                data: {
                    specialCategory: specialCategory,
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
        }
        catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Failed to update product');
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// Product functions
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.product.findMany({
            include: {
                images: true,
            },
        });
    });
}
function insertProduct(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function deleteProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new Error(`Product with id ${id} does not exist.`);
            }
            yield prisma.cartProduct.deleteMany({
                where: { productId: id },
            });
            yield prisma.productImage.deleteMany({
                where: { productId: id },
            });
            return yield prisma.product.delete({
                where: { id },
            });
        }
        catch (error) {
            console.error("Error deleting product:", error);
            throw new Error(`Error deleting product: ${error.message}`);
        }
    });
}
function getProductsById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
            },
        });
    });
}
function getProductsByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.product.findMany({ where: { category } });
    });
}
// Routes
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, name } = req.body;
    const inputValidation = adminSchema.safeParse({ username, email, name });
    if (!inputValidation.success) {
        return res.status(400).json({ msg: "Inputs are not valid" });
    }
    try {
        const response = yield insertAdmin(username, email, name);
        res.status(201).json({ msg: "Admin created successfully", res: response });
    }
    catch (error) {
        res.status(500).json({ msg: "Error creating admin", error: error.message });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, name } = req.body;
    const inputValidation = adminSchema.safeParse({ username, email, name });
    if (!inputValidation.success) {
        return res.status(400).json({ msg: "Inputs are not valid" });
    }
    try {
        const response = yield checkAdmin(email);
        if (response) {
            res
                .status(200)
                .json({ msg: "Admin Verified Successfully", res: response });
        }
        else {
            res.status(400).json({ msg: "Admin Access Denied" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error Verifying admin", error: error.message });
    }
}));
router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ msg: err.message });
        }
        else if (!req.files) {
            res.status(400).json({ msg: "No file selected" });
        }
        else {
            const filePaths = req.files.map((file) => `/uploads/products/${file.filename}`);
            res.status(200).json({
                msg: "Files uploaded",
                filePaths,
            });
        }
    });
});
router.get("/products/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield getAllProducts();
        res.json(products);
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error fetching products", error: error.message });
    }
}));
router.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield getProductsById(id);
        res.json(product);
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error fetching product", error: error.message });
    }
}));
router.get("/products/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const products = yield getProductsByCategory(category);
        res.json(products);
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error fetching products", error: error.message });
    }
}));
router.post("/products/addProducts", upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const imageUrls = files.map((file) => ({
        url: `/uploads/products/${file.filename}`,
    }));
    const productData = Object.assign(Object.assign({}, req.body), { price: parseFloat(req.body.price), images: imageUrls });
    const inputValidation = productSchema.safeParse(productData);
    if (!inputValidation.success) {
        console.log(inputValidation.error.format());
        return res.status(400).json({ msg: "Invalid product format" });
    }
    try {
        const newProduct = yield insertProduct(productData);
        res
            .status(201)
            .json({ msg: "Product added successfully", product: newProduct });
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error adding product", error: error.message });
    }
}));
router.post("/products/updateProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, specialCategory, category, productName, description, fabric, price, color, productCode, } = req.body;
    try {
        const updatedProduct = yield updateProductById(id, specialCategory, price, productCode, color, fabric, description, productName, category);
        res.status(200).json({
            msg: "Product updated successfully",
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            msg: "Failed to update product",
            error: error.message,
        });
    }
}));
router.delete("/products/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.body;
    try {
        const deletedProduct = yield deleteProductById(parseInt(id));
        res
            .status(200)
            .json({ msg: "Product deleted successfully", product: deletedProduct });
    }
    catch (error) {
        res
            .status(500)
            .json({ msg: "Error deleting product", error: error.message });
    }
}));
router.put("/orders/*", (req, res) => {
    // Implement orders update logic here
    res.send("Orders update endpoint");
});
router.get("/stats/*", (req, res) => {
    // Implement stats retrieval logic here
    res.send("Stats endpoint");
});
exports.default = router;
