import { Router } from "express";
import { body } from "express-validator";
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

export default router;
