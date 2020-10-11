import * as MongoDB from "mongodb";

import { notePostRequest, noteDBSchema } from "./client.schema";
import { jwtPayload } from "../util/validateJwt";
import { DatabaseService } from "../services/database.service";
import { userDBSchema } from "../auth/auth.schema";
import { errors } from "../error/error.constant";

export const addNote = async (
  userDetails: jwtPayload,
  note: notePostRequest
): Promise<{ noteId: string }> => {
  const usersDb = await DatabaseService.getInstance().getCollection("users");
  const findUser = await usersDb.findOne<userDBSchema>({
    email: userDetails.email,
    category: userDetails.category,
  });
  if (!findUser) throw errors.USER_NOT_FOUND;
  const dbEntry: noteDBSchema = {
    ...note,
    isAnalysed: false,
    userId: findUser._id!,
    date: Date.now(),
  };
  const notesDb = await DatabaseService.getInstance().getCollection("notes");
  const result = await notesDb.insertOne(dbEntry);
  if (result.insertedCount <= 0) throw errors.MONGODB_CONNECT_ERROR;
  return {
    noteId: result.insertedId,
  };
};

export const getNotes = async (
  userDetails: jwtPayload
): Promise<Array<noteDBSchema>> => {
  const usersDb = await DatabaseService.getInstance().getCollection("users");
  const findUser = await usersDb.findOne<userDBSchema>({
    email: userDetails.email,
    category: userDetails.category,
  });
  if (!findUser) throw errors.USER_NOT_FOUND;
  const notesDb = await DatabaseService.getInstance().getCollection("notes");
  const result = await notesDb
    .find<noteDBSchema>(
      { userId: findUser._id },
      {
        projection: {
          isAnalysed: 0,
          userId: 0,
        },
      }
    )
    .toArray();
  if (!result) throw errors.MONGODB_CONNECT_ERROR;
  return result;
};

export const deleteNote = async (
  userDetails: jwtPayload,
  noteId: string
): Promise<void> => {
  const usersDb = await DatabaseService.getInstance().getCollection("users");
  const findUser = await usersDb.findOne<userDBSchema>({
    email: userDetails.email,
    category: userDetails.category,
  });
  if (!findUser) throw errors.USER_NOT_FOUND;
  const notesDb = await DatabaseService.getInstance().getCollection("notes");
  const result = await notesDb.findOneAndDelete({
    _id: new MongoDB.ObjectID(noteId),
    userId: findUser._id,
  });
  if (!result.value) throw errors.NOTE_NOT_FOUND;
};
