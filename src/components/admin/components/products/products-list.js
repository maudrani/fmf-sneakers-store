import React, { useEffect, useState } from "react";
import { Container, Text, Img } from "../../../../framework/assets";
import { colors } from "../../../../framework/global";
import editIcon from "../../../../Assets/IMG/Various/icons/edit.svg";
import deleteIcon from "../../../../Assets/IMG/Various/icons/delete.svg";
import newIcon from "../../../../Assets/IMG/Various/icons/new.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProductEditForm from "./edit-product";
import ProductNewForm from "./new-product";
import { BringProducts, DeleteProduct } from "../../../store/db/products";

import PageSelector from "../../../store/components/full-store/page-selector";
import InputSearch from "../search-input";

import styled from "styled-components";

const PanelContainer = styled(Container)`
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ProductsList = () => {
  const [dbProducts, setDbProducts] = useState([]);
  const [searchResult, setSearchResult] = useState(dbProducts);

  const [actualPage, setActualPage] = useState([]);

  const fetchData = async () => {
    setDbProducts(await BringProducts());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setSearchResult(dbProducts.reverse());
  }, [dbProducts]);

  const LaunchEdition = (product) => {
    MySwal.fire({
      width: "75%",
      html: (
        <ProductEditForm
          product={product}
          onCancel={() => MySwal.close()}
          onSave={() =>
            MySwal.queue([
              {
                icon: "info",
                title: `Guardar producto?`,
                confirmButtonText: "Guardar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                text:
                  "Recuerda que puedes cambiar el producto cuantas veces quieras",
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                  await fetchData();
                },
              },
            ]).then((result) => {
              if (result.isConfirmed) {
                MySwal.showLoading();
                return true;
              } else {
                return false;
              }
            })
          }
        />
      ),
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  const LaunchDelete = (product) => {
    MySwal.fire({
      title: "Borrar Producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      MySwal.showLoading();
      if (result.isConfirmed) {
        try {
          await DeleteProduct(product);
          await fetchData();
          MySwal.queue([
            {
              icon: "success",
              title: `Producto eliminado`,
              confirmButtonText: "Cerrar",
            },
          ]);
        } catch (err) {
          MySwal.queue([
            {
              icon: "error",
              title: `No se pudo eliminar el producto`,
              confirmButtonText: "Cerrar",
            },
          ]);
          console.log(err);
        }
      }

      await MySwal.hideLoading();
    });
  };

  const LaunchNew = () => {
    MySwal.fire({
      width: "75%",
      html: (
        <ProductNewForm
          onCancel={() => MySwal.close()}
          onSave={() =>
            MySwal.queue([
              {
                icon: "info",
                title: `Crear producto?`,
                confirmButtonText: "Crear",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                text:
                  "Recuerda que puedes cambiar el producto cuantas veces quieras",
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                  await fetchData();
                },
              },
            ]).then((result) => {
              if (result.isConfirmed) {
                MySwal.showLoading();
                return true;
              } else {
                return false;
              }
            })
          }
        />
      ),
      showConfirmButton: false,
      showCancelButton: false,
    });
  };


  return (
    <Container w-100 direction="c" justify="sb" style={{ minHeight: "80vh" }} >
      <Container w-100>
        <Container w-100 justify="fs">
          <Text md main>
            Todos los Productos
          </Text>
        </Container>
        <Container style={{ cursor: "pointer" }} onClick={() => LaunchNew()}>
          <Img
            src={newIcon}
            hover-scale="sm"
            style={{
              maxWidth: "2.5rem",
              minWidth: "2.5rem",
              marginRight: ".5rem",
            }}
          />
        </Container>
      </Container>

      <Container w-100>
        <Container direction="c" w-100>
          <Container ph="xs" w-100>

            <InputSearch
              originalValue={dbProducts}
              setSearchResult={setSearchResult}
              valuesToSearch={['name', 'category']}
            />

            <Text style={{ position: "absolute", left: "0", bottom: "15%" }}>
              Total: {searchResult.length}
            </Text>
          </Container>

          <Container
            w-100
            whitesmoke
            style={{
              padding: ".7rem 3.5rem .7rem 2rem",
              border: `1px solid ${colors["lightest-gray"]}`,
            }}
          >
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Nombre:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Categoría:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Precio:</Text>
            </Container>
            <Container
              w-25
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Tags:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Cant Imagenes:</Text>
            </Container>
            <Container w-15>
              <Text dark-gray>Opciones:</Text>
            </Container>
          </Container>

          <PanelContainer
            w-100
            direction="c"
            style={{
              maxHeight: "25rem",
              minHeight: "25rem",
              overflowY: "scroll",
              display: "block",
              border: `1px solid ${colors["lightest-gray"]}`,
            }}
          >
            {actualPage.map((product, idx) => {
              return (
                <Container
                
                  bg={idx % 2 === 0 ? "white" : "whitesmoke"}
                  w-100
                  ph="sm"
                  pw="md"
                  justify="sb"
                  style={{
                    borderTop: `1px solid ${colors["lightest-gray"]}`,
                  }}
                  key={idx}
                >
                  <Container w-15>
                    <Text className="limited-text" main dark-red sm>
                      {product.name.toUpperCase()}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text
                      weight="light"
                      className="limited-text"
                      style={{ fontSize: "18px" }}
                    >
                      {product.category}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text
                      weight="light"
                      className="limited-text"
                      style={{ fontSize: "18px" }}
                    >
                      ${product.price}
                    </Text>
                  </Container>
                  <Container w-25>
                    <Text className="limited-text">
                      {product.tags.join(", ")}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text className="limited-text">
                      {product.images.x15.length}
                    </Text>
                  </Container>

                  <Container w-15 justify="sa">
                    <Container
                      w-20
                      hover-shadow="7"
                      hover-scale="md"
                      style={{ cursor: "pointer" }}
                      onClick={() => LaunchEdition(product)}
                    >
                      <Img src={editIcon} />
                    </Container>
                    <Container
                      w-20
                      hover-shadow="7"
                      hover-scale="md"
                      style={{ cursor: "pointer" }}
                      onClick={() => LaunchDelete(product)}
                    >
                      <Img src={deleteIcon} />
                    </Container>
                  </Container>
                </Container>
              );
            })}

            {searchResult.length === 0 && (
              <Container w-100 ph="sm">
                <Text sm>Sin resultados</Text>
              </Container>
            )}
          </PanelContainer>

          <Container ph="md">
            <PageSelector list={searchResult} setActualPage={setActualPage} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProductsList;
