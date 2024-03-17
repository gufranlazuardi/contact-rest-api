import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

// khusus yang sudah login, dia pake apiRouter ini
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get); // Get User
apiRouter.patch("/api/users/current", UserController.update); // Update User
