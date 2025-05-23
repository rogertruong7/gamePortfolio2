import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cat1 from "../assets/roomArt/experienceCat.png";
import cat2 from "../assets/roomArt/aboutMeCat2.png";
import arrowdown from "../assets/arrowdown.gif";
import Typewriter from "typewriter-effect";
import { experiencesScript } from "./ShowcaseStatic";

const Experiences = ({ setCurrentScene }) => {
  const [cat1Visible, setCat1Visible] = useState(true);
  const [cat2Visible, setCat2Visible] = useState(false);
  const [optionCount, setOptionCount] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const [endOfText, setEndOfText] = useState(false);
  const [fontSize, setFontSize] = useState(3);

  const onNextText = () => {
    setOptionCount((prevCount) => prevCount + 1);
    setCanClick(false);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (canClick) {
        onNextText();
      }
    };

    const selectionContainer = document.getElementById("selectionContainer");
    selectionContainer.addEventListener("click", handleClick);

    const handleKeyDown = (event) => {
      if (["Space", "Enter"].includes(event.code) && canClick) {
        onNextText();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      selectionContainer.removeEventListener("click", handleClick);
    };
  }, [canClick]);

  useEffect(() => {
    const img = new Image();
    img.src = cat2;
    img.onload = () => setIsLoaded(true);

    const timeout = setTimeout(() => setOptionCount(0), 500);
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setFontSize(3);
      } else if (window.innerWidth <= 500) {
        setFontSize(1.2);
      } else if (window.innerWidth <= 600) {
        setFontSize(1.5);
      } else if (window.innerWidth <= 950) {
        setFontSize(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderText = (index) => (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .changeDelay(10)
          .typeString(
            `<h1 style='margin: 0; color: white; font-size: ${fontSize}rem; padding-right: 0px;'>${experiencesScript[index]}</h1>`
          )
          .callFunction(() => {
            setCanClick(true);
            if (index === 1) {
              setEndOfText(true);
            }
          })
          .start();
      }}
    />
  );

  return (
    <>
      <Door />
      <Container>
        <GameContainer>
          <ImageWrapper>
            {cat1Visible && <ImageContainer src={cat1} alt="aboutMeCat1" />}
            {cat2Visible && isLoaded && (
              <ImageContainer src={cat2} alt="aboutMeCat2" />
            )}
          </ImageWrapper>
          <SelectionContainer id="selectionContainer">
            <TextContainer>
              {optionCount === 0 && renderText(0)}
              {optionCount >= 1 && renderText(1)}
              {optionCount < 2 && canClick && (
                <img style={arrowStyle} src={arrowdown} />
              )}
            </TextContainer>
            {optionCount >= 2 && endOfText && (
              <>
                <a
                  href="https://www.linkedin.com/in/roger-truong/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInButton>Take Me to Roger's LinkedIn</LinkedInButton>
                </a>
                <ExitButton onClick={() => setCurrentScene(0)}>Exit</ExitButton>
              </>
            )}
          </SelectionContainer>
        </GameContainer>
      </Container>
    </>
  );
};

const arrowStyle = {
  width: "30px",
  height: "50px",
  position: "absolute",
  right: "0",
  bottom: "0",
};

const LinkedInButton = styled.button`
  font-family: "Pixelify Sans", serif;
  background-color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: 32px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  width: 100%;
  height: 35%;

  &:hover {
    background-color: rgb(171, 171, 171);
  }

  @media (max-width: 1108px) {
    font-size: 18px;
    border-radius: 20px;
  }
`;

const ExitButton = styled.button`
  font-family: "Pixelify Sans", serif;
  background-color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  width: 100px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: rgb(171, 171, 171);
  }

  @media (max-width: 1108px) {
    left: 20px;
    right: none;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  position: relative;
`;


export const Container = styled.div`
  margin: 0;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
`;

const Door = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: center;
  animation: parabolicMove 1s ease-in-out forwards;
  position: absolute;

  @keyframes parabolicMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const GameContainer = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1108px) {
    width: 95%;
  }
`;

const SelectionContainer = styled.div`
  width: 1100px;
  height: 50%;
  margin: 0;
  border: 10px solid white;
  background-color: black;
  padding: 50px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  overflow: auto;

  @media (max-width: 1108px) {
    width: 100%;
    height: 50%;
  }
`;

const ImageWrapper = styled.div`
  width: 1100px;
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1108px) {
    width: 95%;
    height: 50%;
  }
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
`;

export default Experiences;
