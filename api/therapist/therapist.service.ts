import { DatabaseService } from "../services/database.service";
import { jwtPayload } from "../util/validateJwt";
import { userDBSchema } from "../auth/auth.schema";
import { errors } from "../error/error.constant";
import { getClientsResponse } from "./therapist.schema";

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
          "patients.name": 1,
          "patients.email": 1,
        },
      },
    ])
    .toArray();
  if (findClients.length === 0) throw errors.NOT_FOUND;
  return findClients[0];
};
