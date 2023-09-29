// src/app.ts
import express from 'express';
import "./config.js";
import { initDB } from './db/dbconfig.js'
import permission from "./routes/createPermission.js";
import role from "./routes/createRole.js";
import userRoute from "./routes/userRoute.js";
import roleUser from "./routes/roleToUser.js";
import login from "./routes/login.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/newPermission", permission);
app.use("/newRole", role);
app.use("/user", userRoute);
app.use("/assignRole", roleUser);
app.use("/login", login);

app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  initDB()
});
