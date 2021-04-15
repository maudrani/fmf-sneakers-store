import React, { useState, useEffect } from "react";
import { Container, Text } from "../../../../framework/assets";
import { colors } from "../../../../framework/global";
import styled from "styled-components";

import { Link } from "react-scroll";

const MainContainer = styled(Container)`
  .page-link-container {
    min-width: 3.1rem;
    max-width: 3.1rem;
    min-height: 3.1rem;
    max-height: 3.1rem;
    border: 1px solid ${colors["light-gray"]};
  }
  .link-hover {
    :hover {
      background-color: ${colors["darkest-yellow"]};
      cursor: pointer;
      border-color: ${colors["darkest-yellow"]};
    }
  }

  @media (max-width: 700px) {
    .page-link,
    .page-link-container {
      margin: 0.1rem;

      font-size: 10px;

      * {
        font-size: 10px;
      }
    }

    .page-link-container {
      min-width: auto;
      min-height: auto;
    }
  }
`;

const PageSelector = ({
  list,
  itemsPerPage = 6,
  setItemsPerPage,
  /* amountOfPages = 0, */
  /* setAmountOfPages, */
  /* currentPage = 1,
  setCurrentPage, */
  Component = () => {
    return <></>;
  },
  innerPages = false,
  setActualPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);

  const createPages = (array, pageLength) => {
    let page = [];
    let pages = [];

    let totalItemsInEqualPages = 0;

    array.forEach((el, idx) => {
      page.push(el);
      if ((idx + 1) % pageLength === 0) {
        pages.push(page);
        page = [];
        totalItemsInEqualPages += pageLength;
      }
    });

    const lastItems = [];

    for (let i = 0; i < array.length - totalItemsInEqualPages; i++) {
      lastItems.push(array[totalItemsInEqualPages + i]);
    }
    pages.push(lastItems);

    setAmountOfPages(pages.length);

    let actualPage = [];

    if (pages[currentPage - 1] !== undefined) {
      actualPage = pages[currentPage - 1];
    } else {
      actualPage = pages[0];
    }
    

    if (innerPages) {
      return actualPage.map((data, idx) => {
        return <Component key={idx} />;
      });
    } else {
      setActualPage(actualPage);
      return actualPage;
    }
  };

  useEffect(() => {
    if (list.length <= itemsPerPage) {
      setCurrentPage(1);
      setAmountOfPages(1);
      createPages(list, itemsPerPage);
    } else {
      createPages(list, itemsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, itemsPerPage, currentPage]);

  const GenerateLinks = () => {
    return (
      <Container>
        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
        >
          <Container
            mw="xs"
            className={`page-link-container ${
              currentPage !== 1 && "link-hover"
            }`}
            onClick={() => currentPage !== 1 && ChangePage("back")}
            style={{ border: currentPage === 1 && "none" }}
          >
            <Text ph="xs" pw="xs" dark-gray>
              {currentPage !== 1 && currentPage - 1}
            </Text>
          </Container>
        </Link>

        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
        >
          <Container
            bg="darkest-yellow"
            mw="xs"
            className="page-link-container"
            style={{ borderColor: colors["darkest-yellow"] }}
          >
            <Text ph="xs" pw="xs" whitesmoke>
              {currentPage}
            </Text>
          </Container>
        </Link>

        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
        >
          <Container
            mw="xs"
            className={`page-link-container ${
              currentPage !== amountOfPages && "link-hover"
            }`}
            style={{ border: currentPage === amountOfPages && "none" }}
            onClick={() => currentPage !== amountOfPages && ChangePage("next")}
          >
            <Text ph="xs" pw="xs" dark-gray>
              {currentPage !== amountOfPages && currentPage + 1}
            </Text>
          </Container>
        </Link>
      </Container>
    );
  };

  const ChangePage = (where) => {
    console.log(currentPage);
    setTimeout(() => {
      if (where === "next") {
        setCurrentPage(currentPage !== amountOfPages ? currentPage + 1 : 1);
      } else if (where === "back") {
        setCurrentPage(currentPage !== 1 ? currentPage - 1 : amountOfPages);
      }
    }, 50);
  };

  return (
    <MainContainer w-100 direction="c">
      {innerPages && createPages(list, itemsPerPage)}
      <Container ph={innerPages && "lg"} w-100>
        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
        >
          <Text
            mw="xs"
            pw="xs"
            ph="xs"
            whitesmoke
            bg="darkest-yellow"
            hover-bg="dark-yellow"
            style={{ cursor: "pointer" }}
            onClick={() => ChangePage("back")}
            className="page-link"
          >
            ← Anterior
          </Text>
        </Link>

        {GenerateLinks()}

        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
        >
          <Text
            mw="xs"
            pw="xs"
            ph="xs"
            whitesmoke
            bg="darkest-yellow"
            hover-bg="dark-yellow"
            style={{ cursor: "pointer" }}
            onClick={() => ChangePage("next")}
            className="page-link"
          >
            Siguiente →
          </Text>
        </Link>
      </Container>
    </MainContainer>
  );
};

export default PageSelector;
