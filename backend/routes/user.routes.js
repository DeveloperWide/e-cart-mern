import { Router } from "express";
import { register, login, logout } from "../controllers/auth.contoller.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, (req, res) => {
  return res.json({
    message: "Your Profile",
    user: req.user,
  });
});

export default router;
