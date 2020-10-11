import React from "react";

export interface NoteType {
  _id: string;
  title?: string;
  content: string;
}

export interface NoteProps {
  children: React.ReactChild;
  deleteHandler: () => void;
}

export interface BackdropProps {
  goBack: boolean;
}

export type User = "client" | "therapist";

export interface PostSignup {
  name: string;
  age: string | number;
  email: string;
  gender: string;
  password: string;
  therapistCode?: string;
}

export interface PostLogin {
  email: string;
  password: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}
