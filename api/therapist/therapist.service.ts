import * as MongoDB from "mongodb";

import { DatabaseService } from "../services/database.service";
import { jwtPayload } from "../util/validateJwt";
import { userDBSchema } from "../auth/auth.schema";
import { errors } from "../error/error.constant";
import {
  getClientsResponse,
  noteFetchSchema,
  pythonRequestSchema,
} from "./therapist.schema";

export const getClients = async (
  userDetails: jwtPayload
): Promise<getClientsResponse> => {
  const usersDb = await DatabaseService.getInstance().getCollection("users");
  const findClients = await usersDb
    .aggregate<getClientsResponse>([
      { $match: { email: userDetails.email, category: "therapist" } },
      {
        $lookup: {
          from: "users",
          localField: "clients",
          foreignField: "_id",
          as: "patients",
        },
      },
      {
        $project: {
          "patients._id": 1,
          "patients.name": 1,
          "patients.email": 1,
        },
      },
    ])
    .toArray();
  if (findClients.length === 0) throw errors.NOT_FOUND;
  return findClients[0];
};

export const generateReport = async (
  therapistDetails: jwtPayload,
  userId: string
) => {
  const userDb = await DatabaseService.getInstance().getCollection("users");
  const relationExists = await userDb.findOne<userDBSchema>({
    email: therapistDetails.email,
    category: "therapist",
    clients: new MongoDB.ObjectID(userId),
  });
  if (!relationExists) throw errors.RELATION_NOT_FOUND;
  const notesDb = await DatabaseService.getInstance().getCollection("notes");
  const notes = await notesDb
    .aggregate<noteFetchSchema>([
      {
        $match: { userId: new MongoDB.ObjectID(userId), isAnalysed: false },
      },
      {
        $project: { isAnalysed: 0, title: 0 },
      },
    ])
    .toArray();
  const result = await notesDb.updateMany(
    { userId: new MongoDB.ObjectID(userId), isAnalysed: false },
    {
      $set: { isAnalysed: true },
    }
  );
  if (result.modifiedCount !== notes.length) throw errors.MONGODB_QUERY_ERROR;
  const pythonRequest: pythonRequestSchema = {
    notes: notes,
    userId: userId,
    therapistId: relationExists._id?.toHexString()!,
  };
  console.log("%o", pythonRequest);
};
