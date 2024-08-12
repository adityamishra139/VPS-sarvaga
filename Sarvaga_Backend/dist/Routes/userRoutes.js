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
const dotenv_1 = __importDefault(require("dotenv"));
const routerU = express_1.default.Router();
const prismaU = new client_1.PrismaClient();
dotenv_1.default.config();
const userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
function insertUser(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prismaU.user.create({
                data: {
                    username,
                    email,
                },
            });
            return res;
        }
        catch (error) {
            console.error("Error inserting user:", error);
            throw error;
        }
    });
}
function verifyUser(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prismaU.user.findFirst({
                where: {
                    username,
                    email,
                },
            });
            return res;
        }
        catch (error) {
            console.error("Error verifying user:", error);
            throw error;
        }
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prismaU.user.findMany();
            return users;
        }
        catch (error) {
            console.error("Error getting all users:", error);
            throw error;
        }
    });
}
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield prismaU.product.findMany();
            return product;
        }
        catch (error) {
            console.error("Error fetching product by ID:", error);
            throw error;
        }
    });
}
function getProductByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield prismaU.product.findUnique({
                where: { id },
                include: { images: true },
            });
            return product;
        }
        catch (error) {
            console.error("Error fetching product by ID:", error);
            throw error;
        }
    });
}
function getProductsByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prismaU.product.findMany({
                where: { category },
                include: {
                    images: true,
                },
            });
            return data;
        }
        catch (error) {
            console.error(`Error getting ${category} products:${error}`);
            throw error;
        }
    });
}
const insertItem = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield prismaU.cart.findFirst({
            where: { ownerId: userId },
            include: { cartProducts: true },
        });
        if (!cart) {
            cart = yield prismaU.cart.create({
                data: {
                    ownerId: userId,
                    cartProducts: {
                        create: [{ productId }],
                    },
                },
                include: { cartProducts: true },
            });
        }
        else {
            const existingCartProduct = cart.cartProducts.find((cp) => cp.productId === productId);
            if (!existingCartProduct) {
                cart = yield prismaU.cart.update({
                    where: { id: cart.id },
                    data: {
                        cartProducts: {
                            create: [{ productId }],
                        },
                    },
                    include: { cartProducts: { include: { product: true } } },
                });
            }
        }
        const updatedCart = yield prismaU.cart.findUnique({
            where: { id: cart.id },
            include: { cartProducts: { include: { product: true } } },
        });
        return updatedCart;
    }
    catch (error) {
        throw error;
    }
});
const getItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield prismaU.cart.findFirst({
            where: {
                ownerId: userId, // Fix: Direct comparison with userId
            },
            include: {
                cartProducts: {
                    include: { product: true } // Include product details
                }
            },
        });
        if (!cart) {
            cart = yield prismaU.cart.create({
                data: {
                    ownerId: userId,
                    cartProducts: {
                        create: [],
                    },
                },
                include: {
                    cartProducts: {
                        include: { product: true } // Include product details
                    }
                },
            });
        }
        return cart.cartProducts.map(cartProduct => cartProduct.product);
    }
    catch (error) {
        throw error;
    }
});
const deleteItems = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield prismaU.cart.findFirst({
            where: { ownerId: userId },
            include: { cartProducts: true },
        });
        if (!cart) {
            console.log("Cart not found");
            return;
        }
        const cartProduct = cart.cartProducts.find((cp) => cp.productId === productId);
        if (cartProduct) {
            yield prismaU.cartProduct.delete({
                where: {
                    id: cartProduct.id,
                },
            });
            const updatedCart = yield prismaU.cart.findUnique({
                where: { id: cart.id },
                include: { cartProducts: { include: { product: true } } },
            });
            return updatedCart;
        }
        else {
            return { msg: "Invalid Product ID" };
        }
    }
    catch (error) {
        throw error;
    }
});
routerU.get("/fetchData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ msg: "Error fetching data" });
    }
}));
routerU.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const inputValidation = userSchema.safeParse({
        username,
        email,
    });
    if (!inputValidation.success) {
        return res.status(400).json({ msg: "Inputs are not valid" });
    }
    try {
        const user = yield insertUser(username, email);
        res.status(201).json({ msg: "User created successfully", id: user.id });
    }
    catch (error) {
        res.status(500).json({ msg: "Error creating user" });
    }
}));
routerU.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const inputValidation = userSchema.safeParse({
        username,
        email,
    });
    if (!inputValidation.success) {
        return res.status(400).json({ msg: "Inputs are not valid" });
    }
    try {
        const user = yield verifyUser(username, email);
        if (user) {
            return res.status(200).json({ msg: "User verified successfully", id: user.id });
        }
        else {
            return res.status(404).json({ msg: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Error verifying user" });
    }
}));
routerU.get("/products/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsArr = yield getAllProducts();
        if (productsArr) {
            res.json(productsArr);
        }
        else {
            res.status(400).json({ error: "Invalid product ID" });
        }
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
}));
routerU.post("/carts/addItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const item = yield insertItem(userId, productId);
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
routerU.get("/carts/getProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fixed route with '/'
    const { userId } = req.body;
    try {
        const items = yield getItems(parseInt(userId)); // Await here
        res.json(items); // Send the items back in the response
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
routerU.get("/products/ID/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    try {
        const product = yield getProductByID(id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Error fetching product");
    }
}));
routerU.get("/products/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    console.log(category);
    try {
        const data = yield getProductsByCategory(category);
        res.json(data);
    }
    catch (error) {
        res.status(500).send(`Error fetching ${category} products`);
    }
}));
routerU.post("/carts/additem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const response = yield insertItem(userId, productId);
        res.json(response);
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
}));
routerU.get("/carts/getItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const response = yield getItems(userId);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get item from cart" });
        console.error("Error getting item from cart:", error);
    }
}));
routerU.delete("/carts/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const response = yield deleteItems(userId, productId);
        res.json(response);
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
}));
routerU.get("/order/*", (req, res) => {
    res.send("Order details");
});
routerU.get("/trackItems", (req, res) => {
    res.send("Tracking items");
});
exports.default = routerU;
