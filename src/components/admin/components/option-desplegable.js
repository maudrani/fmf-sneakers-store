import React from "react";
import { Container, Text } from "../../../framework/assets";
import styled from "styled-components";

const AcordeonContainer = styled(Container)`
  #tab-1 {
    display: none;
  }

  label {
    display: flex;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }

  label div:first-child {
    width: 100%;
    line-height: 45px;
    margin-left: 10px;
    font-size: 1.2em;
  }

  .cross {
    margin-right: 15px;
    margin-top: 3px;
  }

  .cross::before,
  .cross::after {
    content: "";
    border-top: 2px solid #3e474f;
    width: 15px;
    display: block;
    margin-top: 18px;
    transition: 0.3s;
  }

  .cross::after {
    transform: rotate(90deg);
    margin-top: -2px;
  }

  .content {
    box-sizing: border-box;
    font-size: 0.9em;
    max-height: 0;
    overflow: hidden;
    transition: max-height, 0.5s;
  }

  .launcher:checked ~ .content {
    max-height: 400px;
    transition: max-height, 1s;
  }

  .launcher:checked ~ label .cross::before {
    transform: rotate(180deg);
  }

  .launcher:checked ~ label .cross::after {
    transform: rotate(0deg);
  }
`;

const Acordeon = ({ title = "", options = [], result, children, style }) => {
  return (
    <AcordeonContainer
      title="title"
      className="wrap-1"
      w-100
      direction="c"
      style={style}
    >
      <input
        type="checkbox"
        className={`launcher`}
        id={`${title}tab-1`}
        name="tabs"
        style={{ display: "none" }}
      />

      <label id={`${title}label`} htmlFor={`${title}tab-1`}>
        <Container justify="sb">
          <Text sm weight="thin">
            {title}
          </Text>
        </Container>
        <div className={`cross`} />
      </label>

      <Container  className={`content`} w-100 direction="c">
        {children}
      </Container>
    </AcordeonContainer>
  );
};

export default Acordeon;
