import prisma from "../db";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: reviews });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        reviews: true,
      },
    });
    res.json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: review });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { title, feedback, rate, productId } = req.body;

    const review = await prisma.review.create({
      data: {
        title,
        feedback,
        rate,
        productId,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: review });
  } catch (e) {
    next(e);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await prisma.review.update({
      where: {
        id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
      },
      data: req.body,
    });
    res.json({ data: review });
  } catch (e) {
    next(e);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
      },
    });

    if (!review) {
      res.status(400).json({ message: "no Review exist" });
    }

    const deleted = await prisma.review.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
