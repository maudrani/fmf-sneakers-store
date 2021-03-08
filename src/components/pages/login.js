import React, { useRef, useEffect } from "react";
import { Container, Text, Input, Img } from "../../framework/assets";
import logoFull from "../../Assets/IMG/Brand/logo-full.svg";
import Navbar from "../modules/navbar";
import clienteAxios from "../../config/axios";
import { UseLocalStorage } from "../../helpers/customHooks";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [isAuthorized, setIsAuthorized] = UseLocalStorage("isAuthorized", "");

  const UsernameInput = useRef();
  const PasswordInput = useRef();

  const tryLog = async () => {
    const inputs = {
      user: UsernameInput.current.value,
      password: PasswordInput.current.value,
    };

    try {
      const respuesta = await clienteAxios.post(`/api/admin/validate`, inputs);

      if (respuesta.data.value) {
        setIsAuthorized(true);
      } else {
        alert(respuesta.data.msg);
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (isAuthorized) {
      history.push("/admin");
    }
  }, [isAuthorized, history]);

  return (
    <Container vh-100 w-100 justify="fs" direction="c">
      <Navbar fixed={false} showCart={false} />
      <Container w-100 vh-75 direction="c">
        <Text weight="thin" lg>
          Iniciar Sesión
        </Text>
        <Container ph="md" w-100 direction="c">
          <Input
            ref={UsernameInput}
            sm
            weight="light"
            placeholder="Usuario"
            ph="xs"
            style={{ width: "20rem" }}
          />
          <Input
            ref={PasswordInput}
            sm
            weight="light"
            placeholder="Contraseña"
            ph="xs"
            mh="sm"
            style={{ width: "20rem" }}
            type="password"
            pattern=".{6,}"
          />
        </Container>
        <Container
          ph="xs"
          pw="sm"
          black
          b-shadow="5"
          style={{ cursor: "pointer" }}
          hover-scale="sm"
          hover-bg="dark-gray"
          onClick={() => tryLog()}
        >
          <Text white>Entrar</Text>
        </Container>
      </Container>
      <Container w-100 vh-25 align="fe">
        <Img src={logoFull} w-7 ph="xs" />
      </Container>
    </Container>
  );
};

export default Login;
