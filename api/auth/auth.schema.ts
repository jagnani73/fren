import * as yup from "yup";
import { validate } from "uuid";
import * as MongoDB from "mongodb";

export const signupRequestSchema = yup
  .object({
    name: yup.string().trim().min(1, "name cannot be null").required(),
    age: yup.number().positive().required(),
    gender: yup
      .string()
      .trim()
      .min(1, "gender cannot be null")
      .matches(/M|F|D|^NB$/, "gender must be M, F, D or NB")
      .required(),
    email: yup
      .string()
      .trim()
      .min(1, "email cannot be null")
      .email()
      .required(),
    category: yup
      .string()
      .trim()
      .min(1, "category cannot be null")
      .matches(/^client$|^therapist$/, "category must be client or therapist")
      .required(),
    therapistCode: yup.string().when("category", {
      is: "client",
      then: yup
        .string()
        .trim()
        .min(1, "therapistCode cannot be null")
        .test("therapistCode", "therapistCode is not valid", (value) =>
          validate(value!)
        )
        .required(),
      otherwise: yup
        .string()
        .test("therapistCode", "therapistCode not allowed", (value) => {
          if (!value) return true;
          return false;
        }),
    }),
    password: yup
      .string()
      .trim()
      .min(8, "password has to be greater than 8 characters")
      .matches(/[^<> ]+/, "password cannot contain < , > or spaces in between")
      .required(),
  })
  .required();

export type signupRequest = yup.InferType<typeof signupRequestSchema>;

export const loginRequestSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .min(1, "email cannot be null")
      .email()
      .required(),
    password: yup
      .string()
      .trim()
      .min(8, "password has to be greater than 8 characters")
      .matches(/[^<> ]+/, "password cannot contain <,> or spaces in between")
      .required(),
  })
  .required();

export type loginRequest = yup.InferType<typeof loginRequestSchema>;

export interface userDBSchema extends signupRequest {
  clients?: Array<MongoDB.ObjectID>;
  _id?: MongoDB.ObjectID;
}
