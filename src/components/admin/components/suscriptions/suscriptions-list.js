import React, { useState, useEffect } from "react";
import { Container, Text, Configs } from "../../../../framework/assets";
import SuscriptionDetail from "./suscription-details";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { BringSuscriptions, UpdateSuscription } from "../../db/suscriptions";
import PageSelector from "../../../store/components/full-store/page-selector";
import InputSearch from "../search-input";

const PanelContainer = styled(Container)`
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const SuscriptionsList = () => {
  const [dbSuscriptions, setDBSuscriptions] = useState([]);
  const [searchResult, setSearchResult] = useState(dbSuscriptions);
  const [actualPage, setActualPage] = useState([]);

  const fetchData = async (params) => {
    const suscriptions = await BringSuscriptions(params);
    setDBSuscriptions(await suscriptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(dbSuscriptions.reverse());
  }, [dbSuscriptions]);

  const { Colors } = Configs;

  const MySwal = withReactContent(Swal);

  const ChangeViewed = async (suscription) => {
    try {
      await UpdateSuscription(suscription);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const LaunchDetails = async (suscription) => {
    let viewedSuscription = await suscription;
    viewedSuscription.viewed = true;

    ChangeViewed(viewedSuscription);

    MySwal.fire({
      width: "75%",
      html: (
        <SuscriptionDetail
          suscription={suscription}
          onCancel={() => MySwal.close()}
          onSave={async () => await fetchData()}
          onDelete={async () => await fetchData()}
        />
      ),
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  return (
    <PanelContainer w-100 direction="c" align="fs">
      <Text main md dark-yellow>
        Todos los Pedidos
      </Text>
      <Container ph="xs" w-100>
        <InputSearch
          originalValue={dbSuscriptions}
          setSearchResult={setSearchResult}
          valuesToSearch={["email", "date_created"]}
        />
        <Text style={{ position: "absolute", left: "0", bottom: "15%" }}>
          Total: {searchResult.length}
        </Text>
      </Container>

      <Container
        w-100
        whitesmoke
        style={{
          padding: ".7rem 0rem .7rem 0rem",
          border: `1px solid ${Colors["lightest-gray"]}`,
        }}
      >
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Fecha Creada:</Text>
        </Container>
        <Container
          w-20
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>E-Mail:</Text>
        </Container>
        <Container w-20>
          <Text dark-gray>Opciones:</Text>
        </Container>
      </Container>

      <Container
        w-100
        direction="c"
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "60vh",
          minHeight: "60vh",
        }}
      >
        {actualPage.map((suscription, idx) => (
          <Container
            key={idx}
            w-100
            ph="sm"
            {...{ whitesmoke: idx % 2 === 1 ? true : false }}
          >
            <Container
              direction="c"
              style={{
                position: "absolute",
                left: "0",
                minWidth: "4rem",
                maxWidth: "4rem",
              }}
            ></Container>

            <Container w-20>
              <Text weight="regular">{`${suscription.date_created}`}</Text>
            </Container>
            <Container w-20>
              <Text weight="regular">
                {`${suscription.email.toUpperCase()}`}
              </Text>
            </Container>
            <Container w-20>
              <Text
                weight="bold"
                style={{ cursor: "pointer" }}
                hover-scale="sm"
                hover-color="dark-gray"
                onClick={() => LaunchDetails(suscription)}
              >
                VER
              </Text>
            </Container>
          </Container>
        ))}
      </Container>

      <Container w-100 ph="xs">
        <PageSelector list={searchResult} setActualPage={setActualPage} />
      </Container>
    </PanelContainer>
  );
};

export default SuscriptionsList;
