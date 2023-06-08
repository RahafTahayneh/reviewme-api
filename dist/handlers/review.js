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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getUserReviews = exports.getAllReviews = void 0;
var db_1 = __importDefault(require("../db"));
var getAllReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviews, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.review.findMany({
                        orderBy: { createdAt: "desc" },
                    })];
            case 1:
                reviews = _a.sent();
                res.json({ reviews: reviews });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).json({ message: "Internal Server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllReviews = getAllReviews;
var getUserReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.user.findUnique({
                        where: {
                            id: req.user.id,
                        },
                        include: {
                            reviews: true,
                        },
                    })];
            case 1:
                user = _a.sent();
                res.json({ reviews: user.reviews });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: "Internal Server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserReviews = getUserReviews;
var getReviewById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var review, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.review.findUnique({
                        where: {
                            id: req.params.id,
                        },
                    })];
            case 1:
                review = _a.sent();
                res.json({ review: review });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Internal Server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getReviewById = getReviewById;
var createReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, feedback, rate, name, link, storeName, images, storeProductId, review, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, feedback = _a.feedback, rate = _a.rate, name = _a.name, link = _a.link, storeName = _a.storeName, images = _a.images, storeProductId = _a.storeProductId;
                return [4 /*yield*/, db_1.default.review.create({
                        data: {
                            title: title,
                            feedback: feedback,
                            rate: rate,
                            user: {
                                connect: { id: req.user.id },
                            },
                            product: {
                                create: {
                                    name: name,
                                    link: link,
                                    storeName: storeName,
                                    images: images,
                                    storeProductId: storeProductId,
                                },
                            },
                        },
                        include: {
                            product: true,
                        },
                    })];
            case 1:
                review = _b.sent();
                res.json({ data: review });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createReview = createReview;
var updateReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var review, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.review.update({
                        where: {
                            id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
                        },
                        data: req.body,
                    })];
            case 1:
                review = _a.sent();
                res.json({ data: review });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateReview = updateReview;
var deleteReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var review, deleted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db_1.default.review.findUnique({
                        where: {
                            id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
                        },
                    })];
            case 1:
                review = _a.sent();
                if (!review) {
                    res.status(400).json({ message: "no Review exist" });
                }
                return [4 /*yield*/, db_1.default.review.delete({
                        where: {
                            id: req.params.id,
                        },
                    })];
            case 2:
                deleted = _a.sent();
                return [4 /*yield*/, db_1.default.product.delete({
                        where: {
                            id: review.productId,
                        },
                    })];
            case 3:
                _a.sent();
                res.json({ data: deleted });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.js.map