import React, { useState, useRef } from "react";
import {
  Container,
  Text,
  Img,
  Input,
  Select,
  Configs,
  Button,
} from "../../../../framework/assets";
import categories from "../../../store/db/categories";
import { CreateProduct } from "../../../store/db/products";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const PanelContainer = styled(Container)`
  .imgs-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
    grid-gap: 3rem;
  }
`;

const ProductForm = ({ onCancel, onSave }) => {
  const [category, setCategory] = useState(categories[0].name);
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });
  const [images, setImages] = useState([]);

  const createProduct = async (data) => {
    onSave() && CreateProduct(await data);
  };

  const onSubmit = (data) => {
    const parsedData = data;
    parsedData.tags = data.tags.split(", ");
    parsedData.name = data.name.toLowerCase();
    parsedData.price = parseInt(data.price);
    parsedData.category = category;

    parsedData.images = { x50: images, x25: images, x15: images };

    createProduct(parsedData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const addImage = () => {
    const value = imageInputRef.current.value;
    value !== "" && setImages([...images, value]);
  };

  const deleteImage = (image, place) => {
    setImages(
      images.filter((img, idx) => {
        return idx !== place;
      })
    );
  };

  const imageInputRef = useRef();

  return (
    <PanelContainer w-100 white direction="c" style={{ minHeight: "80vh" }}>
      <form
        id="edit-product-form"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text w-100 md dark-gray ph="sm">
          Crear Producto
        </Text>

        <Container w-100 whitesmoke>
          <Text ph="xs" dark-gray>
            Info Básica
          </Text>
        </Container>
        <Container w-100 direction="r" ph="sm" align="fs">
          <Container w-100 direction="c" pw="sm">
            <Text ph="xs" dark-gray>
              Nombre
            </Text>
            <Input
              sm
              name="name"
              style={{ padding: ".5rem 0", textAlign: "center" }}
              ref={register({
                required: { value: true, message: "Campo requerido " },
              })}
            />
            <Text w-100 weight="light" red>
              {errors.name?.message}
            </Text>
            <Text xs dark-gray w-75 ph="xs">
              <Text xs dark-red>
                Importante:
              </Text>{" "}
              Para evitar errores, escriba el nombre en minusculas y sin
              simbolos
            </Text>
          </Container>

          <Container w-100 direction="c" pw="sm">
            <Text ph="xs" dark-gray>
              Categoría
            </Text>
            <Select
              pw="xs"
              sm
              name="category"
              defaultValue={category}
              style={{ padding: ".5rem 0", textAlign: "center" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(
                (cat, idx) =>
                  !cat.hideOnSearch && (
                    <option key={idx} value={cat.name}>
                      {cat.name}
                    </option>
                  )
              )}
            </Select>
          </Container>

          <Container w-100 direction="c" pw="sm">
            <Text ph="xs" dark-gray>
              Precio
            </Text>
            <Input
              sm
              typeof="tel"
              name="price"
              style={{ padding: ".5rem 0", textAlign: "center" }}
              ref={register({
                required: { value: true, message: "Campo requerido " },
                pattern: {
                  value: /^\d+$/g,
                  message: "Solo numeros enteros",
                },
              })}
            />
            <Text w-100 weight="light" red>
              {errors.price?.message}
            </Text>
          </Container>
        </Container>

        <Container w-100 whitesmoke>
          <Text ph="xs" dark-gray>
            Info de Busqueda
          </Text>
        </Container>
        <Container w-100 direction="c" ph="sm">
          <Text
            xs
            dark-gray
            w-75
            ph="xs"
            pw="xs"
            mh="sm"
            style={{ border: "1px solid lightgray", borderRadius: "18px" }}
          >
            Las etiquetas sirven para facilitar la busqueda al usuario. Ej: Si
            agrego las etiquetas "camuflado" y "verde" a "Camo V1", el usuario
            podrá buscar el producto usando esas palabras.
          </Text>

          <Text dark-gray>Etiquetas</Text>
          <textarea
            name="tags"
            placeholder={"etiqueta1, etiqueta2, ..."}
            id="tags"
            style={{
              padding: ".5rem .2rem",
              width: "50%",
              resize: "none",
              minHeight: "5rem",
              margin: `${Configs.Sizes.xs}`,
            }}
            ref={register({
              required: { value: true, message: "Campo requerido " },
            })}
          />
          <Text w-100 weight="light" red>
            {errors.tags?.message}
          </Text>
          <Text xs dark-gray w-75 ph="xs">
            <Text xs dark-red>
              Importante:
            </Text>{" "}
            Las etiquetas deben estar separadas por una coma {"( , )"} y
            escritas en minusculas para que funcionen. Ej: 'azul, mancha,
            homero, duki'.
          </Text>
        </Container>

        <Container w-100 direction="c">
          <Container w-100 whitesmoke>
            <Text ph="xs" dark-gray>
              Imagenes
            </Text>
          </Container>
          <Container
            w-100
            direction="c"
            style={{ maxWidth: "100%", overflowX: "auto" }}
            ph="sm"
            pw="xs"
            vh-90
            justify="fs"
          >
            <Container align="fe">
              <Container w-100 direction="c">
                <Text ph="xs" dark-gray>
                  Link de la imagen
                </Text>
                <Input
                  placeholder="www."
                  sm
                  name="img"
                  style={{
                    padding: ".5rem 1rem",
                    textAlign: "center",
                    width: "25rem",
                  }}
                  ref={imageInputRef}
                />
              </Container>

              <Container
                black
                b-radius="xs"
                mw="xs"
                hover-scale="sm"
                onClick={() => addImage()}
                style={{ cursor: "pointer" }}
              >
                <Text white ph="xs" pw="sm">
                  Agregar
                </Text>
              </Container>
            </Container>

            <Container w-100 ph="xl" className="imgs-container">
              {images.map((img, idx) => (
                <Container key={idx} w-100 direction="c">
                  <Img src={img} pw="xs" />
                  <Container
                    hover-scale="md"
                    lightest-gray
                    b-radius="circular"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "-1.5rem",
                      right: "-.5rem",
                      width: "3rem",
                      height: "3rem",
                    }}
                    onClick={() => deleteImage(img, idx)}
                  >
                    <Text sm hover-color="red">
                      &times;
                    </Text>
                  </Container>
                </Container>
              ))}
            </Container>
          </Container>
        </Container>

        <Container w-100 white ph="sm">
          <Container
            mw="xs"
            blue
            b-radius="xs"
            hover-scale="sm"
            style={{ cursor: "pointer" }}
          >
            <Button pw="sm" w-100 type="submit">
              <Text white>Guardar</Text>
            </Button>
          </Container>
          <Container
            mw="xs"
            dark-gray
            b-radius="xs"
            hover-scale="sm"
            style={{ cursor: "pointer" }}
          >
            <Button pw="sm" w-100 type="button" onClick={() => handleCancel()}>
              <Text white>Cancelar</Text>
            </Button>
          </Container>
        </Container>
      </form>
    </PanelContainer>
  );
};

export default ProductForm;
