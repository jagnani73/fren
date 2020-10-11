import { Router, Request, Response, NextFunction } from "express";

import { validateJwt, jwtPayload } from "../util/validateJwt";
import validateQuery from "../util/validateQuery";
import {
  notePostRequest,
  notePostRequestSchema,
  noteDeleteRequest,
  noteDeleteRequestSchema,
} from "./client.schema";
import { addNote, deleteNote, getNotes } from "./client.service";

const router: Router = Router();

const handlePostClientNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as jwtPayload;
    const note = req.body as notePostRequest;
    const noteId = await addNote(userDetails, note);
    res.json({ success: true, ...noteId });
  } catch (err) {
    next(err);
  }
};

const handleGetClientNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as jwtPayload;
    const notes = await getNotes(userDetails);
    res.json({ success: true, notes });
  } catch (err) {
    next(err);
  }
};

const handleDeleteClientNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as jwtPayload;
    const { noteId } = req.query as noteDeleteRequest;
    await deleteNote(userDetails, noteId!);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/client/notes",
  validateJwt(),
  validateQuery("body", notePostRequestSchema),
  handlePostClientNotes
);

router.get("/client/notes", validateJwt(), handleGetClientNotes);
router.delete(
  "/client/notes",
  validateJwt(),
  validateQuery("query", noteDeleteRequestSchema),
  handleDeleteClientNotes
);

export default router;
