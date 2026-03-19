import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } from "../config/env.js";

const authorize = async (req, res, next) => {
  try {

    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "No tokens provided" });
    }

    // 1️⃣ Vérifier accessToken
    if (accessToken) {
      try {

        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

        const user = await prisma.user.findUnique({
          where: { id: decoded.id }
        });

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        return next();

      } catch (err) {
        console.log("Access token expired, trying refresh token...");
      }
    }

    // 2️⃣ Si accessToken expiré -> utiliser refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    let decodedRefresh;

    try {
      decodedRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch {
      return res.status(403).json({ message: "Refresh token expired or invalid" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedRefresh.id }
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 3️⃣ Générer nouveau accessToken
    const newAccessToken = jwt.sign(
      { id: user.id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 15 * 60 * 1000
    });

    req.user = user;

    next();

  } catch (err) {
    console.error("Authorize middleware error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authorize;