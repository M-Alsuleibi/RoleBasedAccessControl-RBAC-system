import express from "express";
import { User } from "../db/entities/User.js";
import { authenticate } from "../middleware/auth/authenticate.js";
import { validateUser } from "../middleware/user.js";
import { validateProfile } from "../middleware/profile.js";
import { Profile } from "../db/entities/Profile.js";
import { Role } from "../db/entities/Role.js";

const router = express.Router();
router.get("/", authenticate, async (req, res) => {
  try {
    if (!res.locals.user.username) {
      res.status(500).send("There are no user with this username");
    }
  
    const user = await User.findOneBy({ username: res.locals.user.username });
  
    if (user === null) {
      return res.status(500).send("ther are no such user");
    }
    
    const userData: any = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      firstname: user.profile.firstName,
      lastname: user.profile.lastName,
      role:user.roles[0].permissions[1]
    }

    res.status(200).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong");
  }
});

router.post("/", validateUser, validateProfile, (req, res) => {
  try {
    const user = new User();
    
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    const profile = new Profile();
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    profile.dateOfBirth = req.body.dateOfBirth;
    profile.save()
    user.profile = profile;
    
    user.save();
    res.status(201).send("User has been added succefully");
  } catch (err) {
    res.status(500).send("something went wrong");
    console.error(err);
  }
});
export default router;
