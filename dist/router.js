"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var product_1 = require("./handlers/product");
var review_1 = require("./handlers/review");
var middleware_1 = require("./modules/middleware");
var router = (0, express_1.Router)();
// Review
router.get("/review", review_1.getAllReviews);
router.get("/review/user", review_1.getUserReviews);
router.get("/review/:id", review_1.getReviewById);
router.post("/review", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("feedback").isString(), (0, express_validator_1.body)("link").isString(), (0, express_validator_1.body)("storeName").isString(), (0, express_validator_1.body)("images").isArray(), (0, express_validator_1.body)("rate").isDecimal(), middleware_1.handleInputErrors, review_1.createReview);
router.put("/review/:id", review_1.updateReview);
router.delete("/review/:id", review_1.deleteReview);
// Product
router.put("/product/:id", product_1.updateProduct);
router.put("/product/:id", product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map