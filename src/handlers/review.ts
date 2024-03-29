import prisma from "../db";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ reviews });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        reviews: true,
      },
    });
    res.json({ reviews: user.reviews });
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
    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const createReview = async (req, res, next) => {
  try {
    const {
      title,
      feedback,
      rate,
      name,
      link,
      storeName,
      images,
      storeProductId,
    } = req.body;

    const review = await prisma.review.create({
      data: {
        title,
        feedback,
        rate,
        user: {
          connect: { id: req.user.id },
        },
        product: {
          create: {
            name,
            link,
            storeName,
            images,
            storeProductId,
          },
        },
      },
      include: {
        product: true,
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
    await prisma.product.delete({
      where: {
        id: review.productId,
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
