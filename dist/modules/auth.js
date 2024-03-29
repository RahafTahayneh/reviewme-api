"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var comparePassword = function (password, hash) {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) { return bcrypt_1.default.hash(password, 5); };
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
    var token = bearer.split(" ")[1];
    if (!token) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
        return;
    }
    catch (error) {
        res.status(401);
        res.send("Not authorized");
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map