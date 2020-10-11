import { Router, Request, Response, NextFunction } from "express";

import { validateJwt, jwtPayload } from "../util/validateJwt";
import validateQuery from "../util/validateQuery";
import { getClients, generateReport } from "./therapist.service";
import {
  therapistReportRequest,
  therapistReportRequestSchema,
} from "./therapist.schema";

const router: Router = Router();

const someGenericHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const handlePostTherapistReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as jwtPayload;
    const { clientId } = req.body as therapistReportRequest;
    const analysis = await generateReport(userDetails, clientId!);
    res.json({ success: true, analysis });
  } catch (err) {
    next(err);
  }
};

const handleGetTherapistClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as jwtPayload;
    const clients = await getClients(userDetails);
    res.json({ success: true, clients: clients.patients });
  } catch (err) {
    next(err);
  }
};

router.get("/therapist/clients", validateJwt(), handleGetTherapistClients);

router.post(
  "/therapist/report",
  validateJwt(),
  validateQuery("body", therapistReportRequestSchema),
  handlePostTherapistReport
);

export default router;
