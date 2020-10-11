import * as MongoDB from "mongodb";
export interface getClientsResponse {
  _id: MongoDB.ObjectID;
  patients: Array<{
    name: string;
    email: string;
  }>;
}
