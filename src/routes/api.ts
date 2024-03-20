import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

// khusus yang sudah login, dia pake apiRouter ini
export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get); // Get User
apiRouter.patch("/api/users/current", UserController.update); // Update User
apiRouter.delete("/api/users/current", UserController.logout); // Logout User

// Contact API
apiRouter.post("/api/contacts", ContactController.create); // Create Contact
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get); // Get Contact // contactId pake regex biar semua contact idnya number
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update); // Update Contact
apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove); // Remove Contact
apiRouter.get("/api/contacts", ContactController.search); // Search Contact

// Address API
apiRouter.post(
  "/api/contacts/:contactId(\\d+)/addresses)",
  AddressController.create
); // Create Address
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)"),
  AddressController.get; // Get Address
