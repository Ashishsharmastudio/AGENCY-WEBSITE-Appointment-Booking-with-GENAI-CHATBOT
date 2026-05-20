import { ObjectId } from "mongodb";

export interface Appointment {
  _id?: ObjectId;
  userId?: string;
  service: string;
  date: Date;
  message?: string;
  fileUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
