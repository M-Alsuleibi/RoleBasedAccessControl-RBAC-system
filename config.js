"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config({
    path: process.env.NODE_ENV
        ? ".env.".concat(process.env.NODE_ENV)
        : '.env'
});
