import React from "react";

export interface NoteType {
  _id: string;
  title?: string;
  content: string;
}

export interface BackdropProps {
  goBack: boolean;
}
