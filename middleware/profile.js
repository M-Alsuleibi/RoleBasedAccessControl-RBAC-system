"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProfile = void 0;
var validateProfile = function (req, res, next) {
    var values = ["firstName", "lastName", "dateOfBirth"];
    var profile = req.body;
    var errorList = [];
    // const errorList = values.map(key => !user[key] && `${key} is Required!`).filter(Boolean);
    values.forEach(function (key) {
        if (!profile[key]) {
            return errorList.push("".concat(key, " is Required to create Profile!"));
        }
    });
    var dob = new Date(profile.dateOfBirth);
    if (!dob.valueOf()) {
        errorList.push("Enter the date as mm/dd//yyyy");
    }
    if (errorList.length) {
        res.status(400).send(errorList);
    }
    else {
        req.body.dateOfBirth = dob;
        next();
    }
};
exports.validateProfile = validateProfile;
