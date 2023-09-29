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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Role_js_1 = require("../db/entities/Role.js");
var User_js_1 = require("../db/entities/User.js");
var router = express_1.default.Router();
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role_1, user, x, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.body.user) {
                    return [2 /*return*/, res.status(500).send("Enter thr User name")];
                }
                if (!req.body.roleName) {
                    return [2 /*return*/, res.status(500).send("Enter thr role name for that user")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Role_js_1.Role.findOneBy({ roleName: req.body.roleName })];
            case 2:
                role_1 = _b.sent();
                return [4 /*yield*/, User_js_1.User.findOneBy({ username: req.body.user })];
            case 3:
                user = _b.sent();
                if (role_1 === null) {
                    return [2 /*return*/, res.send("No such role")];
                }
                if (user === null) {
                    return [2 /*return*/, res.send("No such user")];
                }
                //help me?
                user.roles = (_a = user.roles) !== null && _a !== void 0 ? _a : [];
                x = user.roles.filter(function (e) { return e.roleName === role_1.roleName; });
                if (x.length > 0) {
                    return [2 /*return*/, res.status(500).send("this user already has this role")];
                }
                else {
                    user.roles = __spreadArray(__spreadArray([], user.roles, true), [role_1], false);
                }
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                res
                    .status(200)
                    .send("Role has been added to the user name: ".concat(user.username));
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).send("something went wrong");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
