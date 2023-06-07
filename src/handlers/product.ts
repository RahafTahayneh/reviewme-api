import prisma from "../db";

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.id,
      },

      data: req.body,
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(400).json({ message: "no Product exist" });
    }

    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
