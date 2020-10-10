import React from "react";
import { Link } from "react-router-dom";

import { NoteType } from "../../types";
import Note from "./Note";

const Hero = () => {
  const notes: NoteType[] = [
    {
      _id: Math.random().toString(),
      title: "Quis in nisi minim non tempor excepteur id.",
      content:
        "In sint voluptate amet id eu. In fugiat fugiat Lorem aliqua Lorem occaecat deserunt esse proident ullamco occaecat. Cupidatat sint et exercitation reprehenderit fugiat qui non. Nisi ea occaecat nulla excepteur ea ullamco proident culpa. Nulla veniam fugiat irure excepteur id aliqua in amet occaecat Lorem officia. Amet nulla ullamco magna sint irure qui dolor duis elit velit minim non. Ipsum officia enim voluptate ut occaecat minim sunt.",
    },
    {
      _id: Math.random().toString(),
      title: "Ut incididunt officia ut ipsum.",
      content:
        "Ad ut dolore adipisicing et. Proident ea cillum consequat ea magna reprehenderit incididunt. Id deserunt ad exercitation elit duis amet nisi duis do ex fugiat et sit. Sint cillum duis pariatur incididunt. Sit magna est exercitation magna consequat mollit cillum veniam ullamco sint deserunt voluptate. Veniam consectetur magna adipisicing eu proident fugiat pariatur reprehenderit mollit minim commodo ad deserunt. Deserunt eiusmod nisi commodo non aute consequat dolore est laborum dolore adipisicing ullamco.",
    },
    {
      _id: Math.random().toString(),
      title:
        "Aliquip elit voluptate ipsum aliqua sit Lorem duis dolor aute aliqua ex consequat ullamco enim.",
      content:
        "Qui culpa irure velit velit enim velit non eu quis voluptate aute ipsum. Enim officia ullamco excepteur ex fugiat. Aliqua adipisicing veniam voluptate nisi ipsum enim velit consectetur commodo. Reprehenderit nulla ipsum nulla aliqua adipisicing ipsum non ipsum laboris voluptate cupidatat. Amet ullamco et laboris veniam amet sunt labore. Nostrud dolor laboris elit cupidatat in nisi excepteur.",
    },
    {
      _id: Math.random().toString(),
      title:
        "Esse ut consequat dolore pariatur et sunt esse dolore qui sunt quis amet veniam nulla.",
      content:
        "Tempor proident consectetur cillum anim mollit duis consequat enim ex id tempor qui. Id quis ipsum esse non minim laborum. Ipsum in eu cillum nostrud non voluptate do. Mollit ut ex sit esse exercitation aliqua. Deserunt culpa exercitation excepteur tempor non eu in duis in amet culpa sit amet. Fugiat Lorem culpa exercitation laborum pariatur ipsum ipsum eiusmod.",
    },
  ];

  const greeting: string[] = [
    "Culpa do non ea id id.",
    "Consectetur in in non sit laborum sint excepteur nulla exercitation.",
    "Non Lorem occaecat eu non ex anim qui Lorem.",
    "Esse non sint sit voluptate fugiat cupidatat aliqua nisi nisi non excepteur.",
  ];

  return (
    <div className=" bg-baseBlack text-white text-center">
      <div className="flex flex-wrap w-full h-auto px-6">
        HI
        <Link to="/client/new-note" className="ml-auto">
          newnote
        </Link>
      </div>
      <div className="flex flex-wrap min-h-screen w-full">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className={`w-1/4 p-6 mx-auto flex flex-wrap text-center`}
            >
              <Note>
                <div className="flex flex-wrap m-auto h-full">
                  <h3 className="text-xl font-bold mb-auto w-full">
                    {note.title && note.title.length > 50
                      ? `${note.title?.substring(0, 50)}...`
                      : note.title}
                  </h3>
                  <p className="w-full px-2">
                    {note.content.length > 500
                      ? `${note.content.substring(0, 500)}...`
                      : note.content}
                  </p>
                </div>
              </Note>
            </div>
          ))
        ) : (
          <div className="m-auto">
            {greeting[Math.floor(Math.random() * Math.floor(greeting.length))]}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
