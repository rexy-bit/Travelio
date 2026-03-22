

import prisma from "../config/prisma.js"

export const toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const destinationId = req.params.id;

    // 1️⃣ récupérer user + favoris
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2️⃣ vérifier destination (optionnel mais bien)
    const destinationExists = await prisma.destination.findUnique({
      where: { id: destinationId }
    });

    if (!destinationExists) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    // 3️⃣ check en JS (pas besoin de requête DB)
    const isFavorite = user.favorites.some(
      fav => fav.id === destinationId
    );

    // 4️⃣ update
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: isFavorite
          ? { disconnect: { id: destinationId } }
          : { connect: { id: destinationId } }
      },
      include: { favorites: true }
    });

    return res.status(200).json({
      success: true,
      message: isFavorite
        ? "Removed from favorites"
        : "Added to favorites",
      isFavorite: !isFavorite, // 🔥 super utile frontend
      data: updatedUser.favorites
    });

  } catch (err) {
    next(err);
  }
};