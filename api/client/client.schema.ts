import * as MongoDB from "mongodb";
import * as yup from "yup";

export const notePostRequestSchema = yup
  .object({
    title: yup.string().trim().min(1, "title cannot be null"),
    content: yup.string().trim().min(1, "content cannot be null").required(),
  })
  .required();

export type notePostRequest = yup.InferType<typeof notePostRequestSchema>;

export interface noteDBSchema extends notePostRequest {
  _id?: MongoDB.ObjectID;
  userId: MongoDB.ObjectID;
  isAnalysed: boolean;
  date: number;
}

export const noteDeleteRequestSchema = yup
  .object({
    noteId: yup
      .string()
      .trim()
      .min(1, "noteId cannot be null")
      .test("noteId", "noteId is invalid", (value) => {
        return MongoDB.ObjectID.isValid(value!);
      }),
  })
  .required();

export type noteDeleteRequest = yup.InferType<typeof noteDeleteRequestSchema>;
