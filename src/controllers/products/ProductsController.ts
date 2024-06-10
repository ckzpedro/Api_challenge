import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export default class ProductsController {
  static async getProducts(req: Request, res: Response) {
    const posts = await prisma.product.findMany({})
    res.json(posts)
  }

  static async createProduct(req: Request, res: Response) {
    const { name, price, image } = req.body;
    try {
      const post = await prisma.product.create({
        data: {
          name,
          price,
          image
        },
      });

      res.status(200).json({ message: `Product ${post.name} created` });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        const errorMessage = error.message;
        const missingArgumentMatch = errorMessage.match(/Argument `(.+?)` is missing\./);
        if (missingArgumentMatch) {
          const missingArgument = missingArgumentMatch[1];
          res.status(400).json({ message: `Missing argument: ${missingArgument}` });
        } else {
          res.status(500).json({ message: errorMessage });
        }
      } else {
        res.status(500).json({ message: error });
      }
    }
  }
}
