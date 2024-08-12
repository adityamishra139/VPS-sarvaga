import express, { Request, Response } from "express";
import { z } from "zod";
import { PrismaClient, Product, User } from "@prisma/client";
import dotenv from "dotenv";

const routerU = express.Router();
const prismaU = new PrismaClient();
dotenv.config();

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

async function insertUser(username: string, email: string): Promise<User> {
  try {
    const res = await prismaU.user.create({
      data: {
        username,
        email,
      },
    });
    return res;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

async function verifyUser(
  username: string,
  email: string
): Promise<User | null> {
  try {
    const res = await prismaU.user.findFirst({
      where: {
        username,
        email,
      },
    });
    return res;
  } catch (error: any) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

async function getAllUsers(): Promise<any[]> {
  try {
    const users = await prismaU.user.findMany();
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
}

async function getAllProducts(): Promise<Product[] | null> {
  try {
    const product = await prismaU.product.findMany();
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

async function getProductByID(id: number): Promise<Product | null> {
  try {
    const product = await prismaU.product.findUnique({
      where: { id },
      include: { images: true },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

async function getProductsByCategory(
  category: string
): Promise<Product[] | null> {
  try {
    const data = await prismaU.product.findMany({
      where: { category },
      include: {
        images: true,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error getting ${category} products:${error}`);
    throw error;
  }
}

const insertItem = async (userId: number, productId: number) => {
  try {
    let cart = await prismaU.cart.findFirst({
      where: { ownerId: userId },
      include: { cartProducts: true },
    });

    if (!cart) {
      cart = await prismaU.cart.create({
        data: {
          ownerId: userId,
          cartProducts: {
            create: [{ productId }],
          },
        },
        include: { cartProducts: true },
      });
    } else {
      const existingCartProduct = cart.cartProducts.find(
        (cp) => cp.productId === productId
      );

      if (!existingCartProduct) {
        cart = await prismaU.cart.update({
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

    const updatedCart = await prismaU.cart.findUnique({
      where: { id: cart.id },
      include: { cartProducts: { include: { product: true } } },
    });

    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const getItems = async (userId: number): Promise<Product[]> => {
  try {
    let cart = await prismaU.cart.findFirst({
      where: {
        ownerId: userId,  // Fix: Direct comparison with userId
      },
      include: { 
        cartProducts: { 
          include: { product: true }  // Include product details
        } 
      },
    });

    if (!cart) {
      cart = await prismaU.cart.create({
        data: {
          ownerId: userId,
          cartProducts: {
            create: [],
          },
        },
        include: { 
          cartProducts: { 
            include: { product: true }  // Include product details
          } 
        },
      });
    }

    return cart.cartProducts.map(cartProduct => cartProduct.product);

  } catch (error) {
    throw error;
  }
};


const deleteItems = async (userId: number, productId: number) => {
  try {
    let cart = await prismaU.cart.findFirst({
      where: { ownerId: userId },
      include: { cartProducts: true },
    });
    if (!cart) {
      console.log("Cart not found");
      return;
    }
    const cartProduct = cart.cartProducts.find(
      (cp) => cp.productId === productId
    );
    if (cartProduct) {
      await prismaU.cartProduct.delete({
        where: {
          id: cartProduct.id,
        },
      });
      const updatedCart = await prismaU.cart.findUnique({
        where: { id: cart.id },
        include: { cartProducts: { include: { product: true } } },
      });
      return updatedCart;
    } else {
      return {msg:"Invalid Product ID"}
    }
  } catch (error) {
    throw error;
  }
};

routerU.get("/fetchData", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ msg: "Error fetching data" });
  }
});

routerU.post("/signup", async (req: Request, res: Response) => {
  const { username, email } = req.body;

  const inputValidation = userSchema.safeParse({
    username,
    email,
  });
  if (!inputValidation.success) {
    return res.status(400).json({ msg: "Inputs are not valid" });
  }

  try {
    const user = await insertUser(username, email);
    res.status(201).json({ msg: "User created successfully",id:user.id });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user" });
  }
});

routerU.post("/signin", async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const inputValidation = userSchema.safeParse({
    username,
    email,
  });
  if (!inputValidation.success) {
    return res.status(400).json({ msg: "Inputs are not valid" });
  }
  try {
    const user = await verifyUser(username, email);
    if (user) {
      return res.status(200).json({ msg: "User verified successfully" ,id:user.id});
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error verifying user" });
  }
});

routerU.get("/products/all", async (req: Request, res: Response) => {
  try {
    const productsArr = await getAllProducts();
    if (productsArr) {
      res.json(productsArr);
    } else {
      res.status(400).json({ error: "Invalid product ID" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

routerU.post("/carts/addItems", async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  try {
    const item = await insertItem(userId, productId);
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


routerU.get("/products/ID/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await getProductByID(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error fetching product");
  }
});
routerU.get("/products/:category", async (req: Request, res: Response) => {
  const category = req.params.category;
  console.log(category);
  try {
    const data = await getProductsByCategory(category);
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error fetching ${category} products`);
  }
});

routerU.post("/carts/additem", async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    const response = await insertItem(userId, productId);
    res.json({ success: true, cart: response });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

routerU.get("/carts/getItems", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId)
    const response = await getItems(userId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to get item from cart" });
    console.error("Error getting item from cart:", error);
  }
});

routerU.delete("/carts/delete", async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;
    const response = await deleteItems(userId, productId);
    res.json(response);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

routerU.get("/order/*", (req: Request, res: Response) => {
  res.send("Order details");
});

routerU.get("/trackItems", (req: Request, res: Response) => {
  res.send("Tracking items");
});

export default routerU;
