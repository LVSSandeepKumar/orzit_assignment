export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Unauthorized: Admin only can create users" });
  }
  next();
};
