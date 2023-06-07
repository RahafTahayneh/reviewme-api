import { Router } from "express";
import { body } from "express-validator";
import { deleteProduct, updateProduct } from "./handlers/product";
import {
  getAllReviews,
  getReviewById,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./handlers/review";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Review
router.get("/review", getAllReviews);

router.get("/review/user", getUserReviews);

router.get("/review/:id", getReviewById);

router.post(
  "/review",
  body("title").isString(),
  body("name").isString(),
  body("feedback").isString(),
  body("link").isString(),
  body("storeName").isString(),
  body("images").isArray(),
  body("rate").isDecimal(),
  handleInputErrors,
  createReview
);

router.put("/review/:id", updateReview);

router.delete("/review/:id", deleteReview);

// Product
router.put("/product/:id", updateProduct);

router.put("/product/:id", deleteProduct);

export default router;
