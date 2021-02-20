import React from "react";
import { Container, Input, Text } from "../../../framework/assets";
import styled from "styled-components";

const AcordeonContainer = styled(Container)`
  #${({ title }) => title}tab-1 {
    display: none;
  }

  #${({ title }) => title}label {
    display: flex;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }

  #${({ title }) => title}label div:first-child {
    width: 100%;
    line-height: 45px;
    margin-left: 10px;
    font-size: 1.2em;
  }

  .${({ title }) => title}cross {
    margin-right: 15px;
    margin-top: 3px;
  }

  .${({ title }) => title}cross::before, .${({ title }) => title}cross::after {
    content: "";
    border-top: 2px solid #3e474f;
    width: 15px;
    display: block;
    margin-top: 18px;
    transition: 0.3s;
  }

  .${({ title }) => title}cross::after {
    transform: rotate(90deg);
    margin-top: -2px;
  }

  .${({ title }) => title}content {
    box-sizing: border-box;
    font-size: 0.9em;
    max-height: 0;
    overflow: hidden;
    transition: max-height, 0.5s;
  }

  .${({ title }) => title}launcher:checked ~ .${({ title }) => title}content {
    max-height: 400px;
    transition: max-height, 1s;
  }

  .${({ title }) => title}launcher:checked
    ~ #${({ title }) => title}label
    .${({ title }) => title}cross::before {
    transform: rotate(180deg);
  }

  .${({ title }) => title}launcher:checked
    ~ #${({ title }) => title}label
    .${({ title }) => title}cross::after {
    transform: rotate(0deg);
  }
`;

const Acordeon = ({ title = "", options = [], result, children }) => {
  return (
    <AcordeonContainer
      title={title}
      className="wrap-1"
      w-100
      direction="c"
      style={{
        borderTop: "1.6px solid lightgray",
        marginBottom: "2rem",
      }}
    >
      <input
        type="checkbox"
        className={`${title}launcher`}
        id={`${title}tab-1`}
        name="tabs"
      />

      <label id={`${title}label`} htmlFor={`${title}tab-1`}>
        <Container justify="sb">
          <Text style={{ fontSize: "18px" }}>{title}:</Text>
        </Container>
        <div className={`${title}cross`}></div>
      </label>

      <Container className={`${title}content`} w-100 direction="c">
        {children}
      </Container>
    </AcordeonContainer>
  );
};

export default Acordeon;
