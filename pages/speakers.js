import React from "react";
import SpeakersRenderProps from "../src/components/SpeakersRenderProps";

const Speakers = () => {
  return (
    <SpeakersRenderProps>
      {/*  Here it returns a function and props are given by speakerrenderprop
      ie speakers is coming from there*/}
      {({ speakers }) => {
        return (
          <div>
            {speakers.map(({ imageSrc, name }) => {
              return (
                <img
                  src={`images/${imageSrc}.jpg`}
                  alt={name}
                  key={imageSrc}
                ></img>
              );
            })}
          </div>
        );
      }}
    </SpeakersRenderProps>
  );
};

export default Speakers;
