import React from "react";

export interface NoteType {
  _id: string;
  title?: string;
  content: string;
  date: string;
}

export interface NewNoteType {
  title?: string;
  content: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export interface NodeType {
  id: string;
  label: string;
}

export interface EdgeType {
  id: string;
  from: string;
  to: string;
  value: number;
}

export interface NetworkGraphProps {
  nodes: NodeType[];
  edges: EdgeType[];
}

export interface WordAnalysisType {
  noteId: string;
  time: number;
  words: string[];
}

export interface WordAnalysisProps {
  words: WordAnalysisType[];
}

export interface SentimentType {
  noteId: string;
  time: number;
  score: number;
}

export interface SentimentProps {
  data: SentimentType[];
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
