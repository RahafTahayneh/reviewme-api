import { Router } from "express";

const router = Router();

// Review
// Get all reviews
router.get("/review", (req, res) => {
  res.json({ message: "all reviews" });
});

// Product

export default router;
