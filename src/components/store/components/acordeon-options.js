import React from "react";
import styled from "styled-components";
import { Container, Text } from "../../../framework/assets";
import { colors } from "../../../framework/global";
import { Link } from "react-scroll";
import {IsMobile} from '../../../helpers/functions'

const AcordeonContainer = styled(Container)`
  display: flex;
  width: 100%;
  height: 80vh;

  .scroll-btn {
    z-index: 100;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    height: 120vh;
    width: 98vw;

    .scroll-btn {
      opacity: 0;
      transition: 1.5s;
      z-index: -10;
    }
  }
`;

const OptionContainer = styled(Container)`
  flex: 1;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: none;
  transition: flex 0.8s ease;
  overflow: hidden;

  @media (max-width: 1000px) {
    transition: 0.8s;
    box-shadow: none;
  }

  &:hover {
    flex: 9;
    z-index: 100;

    .scroll-btn {
      z-index: 20;
      position: relative;
      opacity: 1;
    }
  }
`;

const BackgroundColor = styled(Container)`
  opacity: 0.8;
  transition: 1s;
  ${OptionContainer}:hover & {
    opacity: 0;
  }
`;

const Description = styled(Container)`
  opacity: 0;
  transition: 0.6s;
  ${OptionContainer}:hover & {
    opacity: 0;
  }
`;

const Name = styled(Text)`
  opacity: 1;
  transition: 1s;
  ${OptionContainer}:hover & {
    transform: scale(1.8);

    @media (max-width: 1000px) {
      transform: scale(1.3);
    }
  }
`;

const Button = styled(Container)`
  opacity: 0.7;
  transition: 1s;
  ${OptionContainer}:hover & {
    opacity: 0.99;
    transform: scale(1.2);
    padding: 1rem 8rem;
    transition: 0.5s;

    @media (max-width: 1000px) {
      transform: scale(0.8);
    }

    * {
      font-weight: 300;
    }
  }
`;

const AcordeonOptions = ({ options = [], setOption, colorSelected }) => {
  let usableColors = [
    "dark-red",
    "yellow",
    "dark-gray",
    "black",
    "red",
    "darkest-yellow",
    "whitesmoke",
  ];

  if (options.length > usableColors.length) {
    for (let i = 0; i < options.length - usableColors.length; i++) {
      usableColors.push(usableColors[i]);
    }
  }

  return (
    <AcordeonContainer w-100>
      {options.map((op, idx) => {
        return (
          <OptionContainer
            id="acordeon-item"
            direction="c"
            b-shadow="inset-4"
            key={idx}
            className={`item item-${idx}`}
            style={{ backgroundImage: `url(${op.img})` }}
          >
            <Container
              w-100
              style={{
                position: "absolute",
                zIndex: "10",
              }}
            >
              <Name
                pw="xs"
                ph="xs"
                main
                md
                white
                style={{
                  zIndex: "10",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <Text
                  {...{
                    [op.color === "black" ? "dark-gray" : op.color]: true,
                  }}
                  md
                  main
                >
                  #
                </Text>
                {op.name}
              </Name>
            </Container>
            <Description
              w-100
              style={{
                zIndex: "2",
              }}
            >
              <Text
                lg
                main
                white
                pw="md"
                ph="xs"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  position: "absolute",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                {op.name}
              </Text>
            </Description>

            <Link
              to="category-summary"
              className="scroll-btn"
              smooth={true}
              duration={700}
              style={{
                textDecoration: "none",
                position: "absolute",
                bottom: "15%",
                cursor: "pointer",
              }}
            >
              <Button
                black
                b-shadow={!IsMobile() && "8"}
                hover-shadow={!IsMobile() && "2"}
                hover-bg="dark-red"
                bg-image="wall1"
                onClick={() =>
                  setOption(op) ||
                  (colorSelected && colorSelected(colors[usableColors[idx]]))
                }
                style={{ padding: "1rem 6rem" }}
              >
                <Text sm white weight="thin">
                  Ver
                </Text>
              </Button>
            </Link>

            <BackgroundColor
              w-100
              style={{
                backgroundColor: colors[op.color] || colors[usableColors[idx]],
                position: "absolute",
                top: "0",
                bottom: "0",
                zIndex: "1",
              }}
            />
          </OptionContainer>
        );
      })}
    </AcordeonContainer>
  );
};

export default AcordeonOptions;
