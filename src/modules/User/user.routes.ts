import { validateMiddleware } from "@src/middlewares/validate";
import { Router } from "express";
import { UserSchema } from "./user.schema";
import { UserController } from "./user.controller";


const router = Router();

router.post("/create", validateMiddleware(UserSchema.create), UserController.create)
router.get("/:id", validateMiddleware(UserSchema.getById), UserController.getById)
router.put("/:id", validateMiddleware(UserSchema.update), UserController.update)
router.delete("/:id", validateMiddleware(UserSchema.delete), UserController.delete)
// router.get("/me", validateMiddleware(UserSchema.getById), UserController.me);
// router.post('/refresh', validateMiddleware(UserSchema.refresh), UserController.refresh);



export const UserRoutes = router;