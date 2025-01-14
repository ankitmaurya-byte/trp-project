import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const authorize =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user?.role)) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
