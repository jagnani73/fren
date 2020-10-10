import { v4 } from "uuid";
import { hash, compare } from "bcrypt";
import * as MongoDB from "mongodb";
import { sign } from "jsonwebtoken";

import { signupRequest, loginRequest, userDBSchema } from "./auth.schema";
import { DatabaseService } from "../services/database.service";
import { errors } from "../error/error.constant";

export const signupUser = async (input: signupRequest): Promise<void> => {
  const db = await DatabaseService.getInstance().getCollection("users");
  const duplicateUser = await db.findOne<userDBSchema>({ email: input.email });
  if (duplicateUser) throw errors.DUPLICATE_USER;
  const hashedPassword = await hash(input.password!, 12);
  if (input.category === "therapist") {
    const therapistCode = v4();
    const dbEntry: userDBSchema = {
      ...input,
      age: +input.age,
      therapistCode,
      password: hashedPassword,
      clients: [],
    };
    const result = await db.insertOne(dbEntry);
    if (result.insertedCount <= 0) throw errors.MONGODB_QUERY_ERROR;
    else return;
  } else {
    const findTherapist = await db.findOne<userDBSchema>({
      therapistCode: input.therapistCode,
    });
    if (!findTherapist) throw errors.THERAPIST_NOT_FOUND;
    const result = await db.insertOne({
      ...input,
      age: +input.age,
      password: hashedPassword,
    });
    if (result.insertedCount <= 0) throw errors.MONGODB_QUERY_ERROR;
    const updated = await db.updateOne(
      { therapistCode: input.therapistCode },
      {
        $push: {
          clients: new MongoDB.ObjectID(result.insertedId),
        },
      }
    );
    if (updated.modifiedCount <= 0) throw errors.MONGODB_QUERY_ERROR;
    else return;
  }
};

export const loginUser = async (
  input: loginRequest
): Promise<{ authToken: string; category: string }> => {
  const db = await DatabaseService.getInstance().getCollection("users");
  const validUser = await db.findOne<userDBSchema>({
    email: input.email,
  });
  if (!validUser) throw errors.USER_NOT_FOUND;
  if (!(await compare(input.password, validUser.password)))
    throw errors.USER_NOT_FOUND;
  const authToken = sign(
    { email: validUser.email, category: validUser.category },
    process.env.JWT_SECRET!,
    {
      expiresIn: "2h",
    }
  );
  return {
    authToken,
    category: validUser.category,
  };
};
