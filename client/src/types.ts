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
