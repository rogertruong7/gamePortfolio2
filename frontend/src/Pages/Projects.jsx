import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cat1 from "../assets/roomArt/projectsCat.png";
import arrowdown from "../assets/arrowdown.gif";
import Typewriter from "typewriter-effect";
import { projectsScript } from "./ShowcaseStatic";
import { projects } from "./ShowcaseStatic";
import OptionSelector from "./OptionSelector";
import QuizPage from "./ProjectPages/QuizPage";
import Presto from "./ProjectPages/Presto";
import TikTokSpeed from "./ProjectPages/TikTokSpeed";
import ForumPage from "./ProjectPages/ForumPage";
import DiscordBot from "./ProjectPages/DiscordBot";
import Portfolio from "./ProjectPages/Portfolio";
import Datespot from "./ProjectPages/Datespot";
import TributaryAPIPage from "./ProjectPages/TributaryPage";
import Bridges from "./ProjectPages/Bridges";
import HousePricePredictor from "./ProjectPages/HousePricePredictor";
import BalatroClone from "./ProjectPages/BalatroClone";
import CountryApi from "./ProjectPages/CountryAPI";
import RustSpreadsheet from "./ProjectPages/RustSpreadsheet";

const Projects = () => {
  // To add more pages, add to this object and also to ShowcaseStatic.jsx
  // Order is based on below
  // Also change on App.jsx the routes
  const pages = {
    1: <Datespot />,
    2: <Bridges />,
    3: <TributaryAPIPage />,
    4: <CountryApi />,
    5: <HousePricePredictor />,
    6: <BalatroClone />,
    7: <RustSpreadsheet />,
    8: <QuizPage />,
    9: <Presto />,
    10: <DiscordBot />,
    11: <Portfolio />,
    12: <TikTokSpeed />,
    13: <ForumPage />,
  };
  const twRef = useRef(null);
  const [cat1Visible, setCat1Visible] = useState(true);
  const [optionCount, setOptionCount] = useState(-1);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [fontSize, setFontSize] = useState(3);
  const [pageToShow, setPageToShow] = useState(null);
  const [cameFromBack, setCameFromBack] = useState(false);
  const [lessThan1700, setLessThan1700] = useState(true);
  const [skipText, setSkipText] = useState(false);

  const showOptions = () => {
    setTimeout(() => {
      setOptionsVisible(true);
    }, 200);
  };

  const Text1 = ({ text, fontSize }) => <H1 fontSize={fontSize}>{text}</H1>;

  useEffect(() => {
    const finishImmediately = () => {
      const tw = twRef.current;
      if (!tw) return;
      setSkipText(true);
      tw.stop();
      showOptions();
    };

    window.addEventListener('click', finishImmediately);
    return () => window.removeEventListener('click', finishImmediately);
  }, [fontSize, showOptions]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1700px)");
    const handleResize = (e) => setLessThan1700(e.matches);

    // Check on initial load
    setLessThan1700(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setOptionCount(0), 500);
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setFontSize(2);
      } else if (window.innerWidth <= 500) {
        setFontSize(1);
      } else if (window.innerWidth <= 600) {
        setFontSize(1.2);
      } else if (window.innerWidth <= 950) {
        setFontSize(1.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  return (
    <>
      <Door />
      <Container>
        <GameContainer
          style={{
            display: lessThan1700 && pageToShow ? "none" : "block",
          }}
        >
          <ImageWrapper>
            {cat1Visible && <ImageContainer src={cat1} alt="aboutMeCat1" />}
          </ImageWrapper>
          <SelectionContainer id="selectionContainer">
            <TextContainer>
              {optionCount === 0 && !cameFromBack && (
                skipText ? (
                  <Text1 fontSize={fontSize} text={projectsScript[0]}></Text1>
                ) : (
                <Typewriter
                  onInit={(typewriter) => {
                    twRef.current = typewriter;
                    typewriter
                      .changeDelay(10)
                      .typeString(
                        `<h1 style='margin: 0; color: white; font-size: ${fontSize}rem; padding-right: 0px;'>${projectsScript[0]}</h1>`
                      )
                      .callFunction(showOptions)
                      .start();
                  }}
                />)
              )}
              {optionCount === 0 && cameFromBack && (
                <h1
                  style={{
                    marginTop: 0,
                    color: "white",
                    fontSize: `${fontSize}rem`,
                    paddingRight: "0px",
                  }}
                >
                  {projectsScript[0]}
                </h1>
              )}
              {optionCount === 1 && <Text>Hello world</Text>}
            </TextContainer>
            {optionsVisible && (
              <OptionSelector setPageToShow={setPageToShow} data={projects} />
            )}
          </SelectionContainer>
        </GameContainer>
        {pageToShow && (
          <>
            {pages[pageToShow]}
            {lessThan1700 && (
              <Button
                onClick={() => {
                  setPageToShow(null);
                  setCameFromBack(true);
                }}
              >
                &lt;&lt;
              </Button>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const H1 = styled.h1`
  margin: 0;
  color: white;
  font-size: ${({ fontSize }) => fontSize}rem;
  padding-right: 0;
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  left: 95px;

  font-family: "Pixelify Sans", serif;
  background-color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 70px;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const arrowStyle = {
  width: "30px",
  height: "50px",
  position: "absolute",
  right: "0",
  bottom: "0",
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 20%;
  margin: 0;
  position: relative;

  @media (max-width: 500px) {
    height: 15%;
  }
`;

const Text = styled.h1`
  margin: 0;
  color: white;
  font-size: 3rem;
  padding-right: 0px;
`;

export const Container = styled.div`
  margin: 0;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  gap: 20px;
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
  padding: 5%;
  position: relative;

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
    width: 100%;
    height: 50%;
  }
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
`;

export default Projects;
