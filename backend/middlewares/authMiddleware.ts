import { Request, Response, NextFunction, RequestHandler } from "express";
import { Session, SessionData } from "express-session";

// Extend SessionData
interface CustomSessionData extends SessionData {
  passport?: {
    user?: any;
    role?: string;
  };
}

// Extend the Request interface
interface AuthRequest extends Request {
  user?: {
    role?: string;
  };
  session: Session & CustomSessionData;
}

export const isAuthenticated: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    const error = new Error("Unauthorized") as Error & { status?: number };
    error.status = 401;
    return next(error);
  }
  next();
};

export const authorize =
  (roles: string[]): RequestHandler =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (
      !req.isAuthenticated() ||
      !req.user?.role ||
      !roles.includes(req.user.role)
    ) {
      const error = new Error("Forbidden") as Error & { status?: number };
      error.status = 403;
      return next(error);
    }
    next();
  };
export const checkAuthOnly: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.passport?.user) {
    const error = new Error("Unauthorized") as Error & { status?: number };
    error.status = 401;
    return next(error);
  }
  next();
};

export const checkPermissionOnly =
  (roles: string[]): RequestHandler =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (
      !req.session?.passport?.user ||
      !req.session?.passport?.role ||
      !roles.includes(req.session.passport.role)
    ) {
      const error = new Error("Unauthorized") as Error & { status?: number };
      error.status = 401;
      return next(error);
    }
    next();
  };
