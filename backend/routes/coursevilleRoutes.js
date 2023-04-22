import { Router } from "express";
import * as coursevilleController from "../controller/coursevilleController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/auth_app", coursevilleController.authApp);
router.get("/access_token", coursevilleController.accessToken);
router.get("/me", auth, coursevilleController.getProfileInformation);
router.get("/get_courses", auth, coursevilleController.getCourses);
router.get("/logout", coursevilleController.logout);

export default router;
