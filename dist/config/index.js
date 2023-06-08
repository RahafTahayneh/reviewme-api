"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_merge_1 = __importDefault(require("lodash.merge"));
// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var stage = process.env.STAGE || "local";
var envConfig;
// dynamically require each config depending on the stage we're in
if (stage === "production") {
    envConfig = require("./prod").default;
}
else if (stage === "staging") {
    envConfig = require("./staging").default;
}
else {
    envConfig = require("./local").default;
}
var defaultConfig = {
    stage: stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    secrets: {
        dbUrl: process.env.DATABASE_URL,
        jwt: process.env.JWT_SECRET,
    },
    logging: false,
};
exports.default = (0, lodash_merge_1.default)(defaultConfig, envConfig);
//# sourceMappingURL=index.js.map