import React, {useState, useEffect} from 'react';
import { Container, Text, Img, Select } from "../../framework/assets";
import { values } from "../store/db/orderValues";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditProduct = ({product, cart, setCart}) => {

    const MySwal = withReactContent(Swal);

    const [editedProduct, setEditedProduct] = useState(product);
  
    const [saveChanges, setSaveChanges] = useState(false);

    useEffect(() => {
        let newCart = cart;
        newCart[cart.findIndex((el) => el.id === product.id)] = editedProduct;
        saveChanges && setCart(newCart);
    
      }, [saveChanges, cart, editedProduct, product, setCart]);


    const HandleSize = (e) => {
        setEditedProduct({ ...editedProduct, size: e.target.value });
      };
    
      const HandleQuality = (e) => {
        setEditedProduct({ ...editedProduct, quality: { name: e.target.value }});
      };

    const EditItem = () => {
        MySwal.fire({
          html: (
            <Container direction="c">
              <Container w-100 justify="fs" ph="xs">
                <Text main dark-red style={{ fontSize: "1.9rem" }}>
                  {product.name}
                </Text>
              </Container>
    
              <Container w-100 style={{ maxHeight: "13rem", overflow: "hidden" }}>
                <Img alt='sneaker image' src={product.images.x15[0]} />
              </Container>
    
              <Container w-100 justify="sa" xs-direction="c">
                <Container direction="c" ph="sm" align="fs">
                  <Text weight="light" dark-gray>
                    Talle
                  </Text>
    
                  <Select
                    defaultValue={product.size}
                    name="size"
                    w-50
                    border-color="dark-gray"
                    style={{ padding: ".75rem 0", minWidth: "6rem" }}
                    hover-bg="lightest-gray"
                    onChange={HandleSize}
                    sm
                    weight="light"
                  >
                    {values.sizes.list.map((size, idx) => {
                      return (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </Select>
                </Container>
    
                <Container direction="c" ph="sm" align="fs">
                  <Text weight="light" dark-gray>
                    Cantidad
                  </Text>
    
                  <Container lightest-gray>
                    <Container
                      hover-bg="light-gray"
                      style={{
                        minHeight: "3.4rem",
                        minWidth: "3.4rem",
                        cursor: "pointer",
                      }}
                      onClick={DecreaseQuantity}
                    >
                      <Text sm weight="bold">
                        &#45;
                      </Text>
                    </Container>
                    <Text weight="light" sm>
                      {product.quantity}
                    </Text>
                    <Container
                      hover-bg="light-gray"
                      style={{
                        minHeight: "3.4rem",
                        minWidth: "3.4rem",
                        cursor: "pointer",
                      }}
                      onClick={IncreaseQuantity}
                    >
                      <Text sm weight="bold">
                        &#43;
                      </Text>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container
                ph="sm"
                w-80
                sm-w="w-75"
                direction="c"
                align="fs"
                style={{ marginTop: "0rem" }}
              >
                <Text weight="light" dark-gray>
                  Calidad
                </Text>
    
                <Select
                  defaultValue={product.quality.name}
                  name="size"
                  w-100
                  ph="xs"
                  border-color="dark-gray"
                  style={{ padding: ".75rem 0" }}
                  hover-bg="lightest-gray"
                  onChange={HandleQuality}
                >
                  {values.qualities.list.map((quality, idx) => {
                    return (
                      <option key={idx} value={quality.name}>
                        {quality.name}
                      </option>
                    );
                  })}
                </Select>
              </Container>
            </Container>
          ),
          showCancelButton: true,
          confirmButtonText: (
            <Text white pw="sm">
              Confirmar
            </Text>
          ),
          cancelButtonText: (
            <Text white pw="sm">
              Cancelar
            </Text>
          ),
          confirmButtonColor: colors["dark-red"],
          cancelButtonColor: colors["dark-gray"],
        }).then((result) => {
          result.isConfirmed && setSaveChanges(true);
        });
    };

    return (<> </> );
}
 
export default EditProduct;