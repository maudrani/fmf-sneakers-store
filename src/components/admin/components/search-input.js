import React, { useRef } from "react";
import search from "../../../Assets/IMG/Various/icons/simple-search.svg";
import { Container, Text, Img, Input } from "../../../framework/assets";

const SearchInput = ({ setSearchResult, originalValue, valuesToSearch }) => {
  const SearchInput = useRef();

  const LaunchSearch = (value) => {
    if (!value) {
      if (!SearchInput.current.value) {
        return setSearchResult(originalValue);
      }
      const searchText = SearchInput.current.value.toLowerCase();
      setSearchResult(
        originalValue.filter((data) => {
          const toSearchIn = JSON.stringify(
            valuesToSearch.map((value) => data[value]) || ""
          ).toLowerCase();
          return toSearchIn.includes(searchText);
        })
      );
    } else {
      setSearchResult(
        originalValue.filter((data) => {
          const toSearchIn = JSON.stringify(
            valuesToSearch.map((value) => data[value]) || ""
          ).toLowerCase();
          return toSearchIn.includes(value);
        })
      );
    }
  };

  const resetSearch = () => {
    setSearchResult(originalValue);

    SearchInput.current.value = "";
    SearchInput.current.focus();
  };

  return (
    <Container  w-100>
      <Container
        b-radius="xs"
        style={{
          border: "1.6px solid lightgray",
          overflow: "hidden",
          maxWidth: "20rem",
        }}
        justify="sb"
      >
        <Input
          ref={SearchInput}
          placeholder="Buscar..."
          style={{
            fontSize: "18px",
            border: "0px",
            padding: ".5rem .8rem",
            width: "100%",
          }}
        />
        <Container
          lightest-gray
          hover-bg="light-gray"
          w-16
          pw="xs"
          ph="xs"
          style={{ cursor: "pointer" }}
          onClick={() => LaunchSearch()}
        >
          <Img w-100 src={search} />
        </Container>
      </Container>
      <Text
        pw="xs"
        dark-gray
        hover-color="light-gray"
        style={{ cursor: "pointer" }}
        onClick={() => resetSearch()}
      >
        Reset
      </Text>
    </Container>
  );
};

export default SearchInput;
