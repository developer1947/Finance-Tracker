import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import user from "./user/user.route.js";
import transation from './transation/transation.route.js'
import budget from './budget/budget.route.js'
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use("/user", user);
app.use("/transation", transation);
app.use('/budget',budget)
app.use((req, res) => {
    let msg = `Can't find ${req.originalUrl} on the server!`
    res.status(404).send({ code: 404, message: msg });
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
