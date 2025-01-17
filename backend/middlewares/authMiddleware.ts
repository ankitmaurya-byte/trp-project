import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(req.user);

  res.status(401).json({ message: "Unauthorized" });
};

export const authorize =
  (roles: string[]) =>
  (
    req: Request & { user?: { role?: string } },
    res: Response,
    next: NextFunction
  ) => {
    if (req.user && req.user.role && roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
