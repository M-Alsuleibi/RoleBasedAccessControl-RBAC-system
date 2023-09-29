"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
var express_1 = require("express");
require("./config.js");
var dbconfig_js_1 = require("./db/dbconfig.js");
var createPermission_js_1 = require("./routes/createPermission.js");
var createRole_js_1 = require("./routes/createRole.js");
var userRoute_js_1 = require("./routes/userRoute.js");
var roleToUser_js_1 = require("./routes/roleToUser.js");
var login_js_1 = require("./routes/login.js");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/newPermission", createPermission_js_1.default);
app.use("/newRole", createRole_js_1.default);
app.use("/user", userRoute_js_1.default);
app.use("/assign", roleToUser_js_1.default);
app.use("/login", login_js_1.default);
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
    (0, dbconfig_js_1.initDB)();
});
