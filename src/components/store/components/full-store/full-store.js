import React, { useState, useEffect } from "react";
import { Container, Text } from "../../../../framework/assets";
import { colors } from "../../../../framework/global";
import ProductsBoard from "../../../modules/products-board";
import { IsMobile, MaxWidth } from "../../../../helpers/functions";
import styled from "styled-components";
import PageSelector from "../../../store/components/full-store/page-selector";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { Link } from "react-scroll";

const StoreContainer = styled(Container)`
  @media (max-width: 480px) {
    .search-tab {
      padding: 10rem 0 5rem 0;

      .reset {
        display: none;
      }

      .search-resume {
        padding: 2rem 0 0 0;
      }
    }
  }

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

const FullStore = ({ products = [], amountOfItems = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(amountOfItems);

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (products.length <= itemsPerPage) {
      setCurrentPage(1);
      setAmountOfPages(1);
    } else {
      setCurrentPage(1);
      createPages(products, itemsPerPage);
    }
  }, [products, itemsPerPage]);

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

    /* pages.push(array.splice(totalItemsInEqualPages, array.length)); */
    pages.push(lastItems);

    setAmountOfPages(pages.length);
  };

  const GenerateLinks = () => {
    return (
      <Container>
        <Link
          to="products-board"
          smooth
          duration={200}
          offset={-90}
          style={{ textDecoration: "none" }}
          onClick={() => scroll.scrollTo(document.querySelector('#products-board'), {duration: 100})}
        >
          <Container
            mw="xs"
            className={`page-link-container ${
              currentPage !== 1 && "link-hover"
            }`}
            onClick={() => ChangePage("back")}
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
          onClick={() => scroll.scrollTo(document.querySelector('#products-board'), {duration: 100})}
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
          onClick={() => scroll.scrollTo(document.querySelector('#products-board'), {duration: 100})}
        >
          <Container
            mw="xs"
            className={`page-link-container ${
              currentPage !== amountOfPages && "link-hover"
            }`}
            style={{ border: currentPage === amountOfPages && "none" }}
            onClick={() => ChangePage("next")}
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
    setTimeout(() => {
      if (where === "next") {
        setCurrentPage(currentPage !== amountOfPages ? currentPage + 1 : 1);
      } else if (where === "back") {
        setCurrentPage(currentPage !== 1 ? currentPage - 1 : amountOfPages);
      }
    }, 600);
  };

  return (
    <StoreContainer w-100>
      <Container w-100 direction="c" id="products-board">
        <ProductsBoard
          products={products}
          gap="2.5rem"
          simple
          showPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setAmountOfPages={setAmountOfPages}
          style={{
            padding: `2rem ${!MaxWidth(1000) ? "4rem" : "5rem"}`,
            /* padding: `2rem ${!MaxWidth(1000) ? "3rem" : "3rem"}`, */
            minHeight: "60vh",
          }}
          minSize={
            (IsMobile() && "8rem") || (MaxWidth(1000) ? "10rem" : "16rem")
          }
          maxSize="1fr"
        >
          {products.length === 0 && (
            <Container vh-100 align="fs" w-100 ph="xs">
              <Text sm>Sin resultados</Text>
            </Container>
          )}
        </ProductsBoard>

        {/* <PageSelector list={products} setActualPage={setActualPage} /> */}

        <Container ph="lg" w-100>
          <Container style={{ marginTop: IsMobile() && "-.5rem" }}>
            <Link
              to="products-board"
              smooth
              duration={200}
              offset={-90}
              style={{ textDecoration: "none" }}
              onClick={() => scroll.scrollTo(document.querySelector('#products-board'), {duration: 100})}
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
          </Container>
          <Container>{GenerateLinks()}</Container>

          <Container style={{ marginTop: IsMobile() && "-.5rem" }}>
            <Link
              to="products-board"
              smooth
              duration={200}
              offset={-90}
              style={{ textDecoration: "none" }}
              onClick={() => scroll.scrollTo(document.querySelector('#products-board'), {duration: 100})}
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
        </Container>
      </Container>
    </StoreContainer>
  );
};

export default FullStore;
