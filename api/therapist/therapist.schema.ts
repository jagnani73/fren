import * as MongoDB from "mongodb";
import * as yup from "yup";
export interface getClientsResponse {
  _id: MongoDB.ObjectID;
  patients: Array<{
    name: string;
    email: string;
  }>;
}

export const therapistReportRequestSchema = yup
  .object({
    clientId: yup
      .string()
      .trim()
      .min(1, "clientId cannot be null")
      .test("clientId", "clientId is invalid", (value) => {
        return MongoDB.ObjectID.isValid(value!);
      }),
  })
  .required();

export type therapistReportRequest = yup.InferType<
  typeof therapistReportRequestSchema
>;

export interface noteFetchSchema {
  _id: MongoDB.ObjectID;
  content: string;
  userId: MongoDB.ObjectID;
  date: number;
}

export interface pythonRequestSchema {
  userId: string;
  therapistId: string;
  notes: Array<noteFetchSchema>;
}
