import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { Container, Text, Button } from "../../framework/assets";
import { colors } from "../../framework/global";
import Navbar from "../modules/navbar";
import { CartContext } from "../context/cart-context";
import { scrollTop, ObtainTime, ObtainDate } from "../../helpers/functions";
import styled from "styled-components";
import OrderTotals from "../store/components/order-totals";
import Politics from "../modules/politics";
import clienteAxios from "../../config/axios";
import Loader from "../../components/basics/loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-scroll";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { BringProducts } from "../store/db/products";

/* Mails */
import {
  MPSelfNotification,
  MPMailToCustomer,
  TransferSelfNotification,
  TransferMailToCustomer,
} from "../cart/notification_mails";

const CartSummary = lazy(() => import("../store/components/cart-summary"));
const PaymentForm = lazy(() => import("../store/components/payment-form"));
const OrderResume = lazy(() => import("../store/components/order-resume"));

const CartSummaryContainer = styled(Container)`
  @media (max-width: 768px) {
    padding: 0 0.1rem;
  }
`;

const Cart = ({setShowContact}) => {
  const [cart, setCart] = useContext(CartContext);

  const orderValues = {
    items: [...cart] || [],
    payer: {
      name: "",
      surname: "",
      dni: "",
      email: "",
      phone: {
        number: "",
      },
      address: {
        street_name: "",
        street_number: "",
        zip_code: "",
        province: "",
        state: "",
      },
    },
    payment_method: "",
    shipment_type: "",
    order_id: uuidv4(),
    totals: {
      subtotal_products: 0,
      other_charge: 0,
      shipment_cost: 0,
    },
    viewed: false,
    state_changed: false,
  };
  const [order, setOrder] = useState({ ...orderValues });
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);
  const MySwal = withReactContent(Swal);
  const history = useHistory();

  const { scroll } = useLocomotiveScroll();

  /* Show Contact */
  useEffect(() => {
    setShowContact(true);
  }, [setShowContact]);

  useEffect(() => {
    if (
      order.payer.name === "" ||
      order.payer.surname === "" ||
      order.payer.email === "" ||
      order.payer.phone.number === "" ||
      order.payer.address.street_name === "" ||
      order.payer.address.street_number === "" ||
      order.payer.address.zip_code === "" ||
      order.payer.address.province === "" ||
      order.payer.address.state === "" ||
      order.payment_method === ""
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [order]);

  /* Shipment */
  const CalculateShipmentCost = (type) => {
    let value = 0;

    let Originalshoes = false;

    console.log(type);

    cart.forEach((item) => {
      if (item.quality.name === "Originales") {
        Originalshoes = true;
      }
    });

    if (Originalshoes) {
      if (type === "Retiro de sucursal") {
        value = 800;
      }
      if (type === "Entrega a domicilio") {
        value = 1100;
      }
    }

    if (!Originalshoes) {
      if (type === "Retiro de sucursal") {
        value = 600;
      }
      if (type === "Entrega a domicilio") {
        value = 900;
      }
    }

    return value;
  };

  const SubmitOrderData = (data) => {
    let orderData = order;
    let { payer, payment_method, shipment_type } = orderData;
    let { address } = orderData.payer;

    payer.name = data.name;
    payer.surname = data.surname;
    payer.dni = data.dni;
    payer.email = data.email;
    payer.phone.number = parseInt(data.phone_number);

    address.street_name = data.street_name;
    address.street_number = parseInt(data.street_number);
    address.zip_code = data.zip_code;
    address.province = data.province;
    address.state = data.state;

    payment_method = window.localStorage.getItem("payment-form");
    payment_method = JSON.parse(payment_method).payment_method;
    shipment_type = data.shipment_type;

    const otherCharge =
      payment_method === "mercadopago"
        ? parseInt(order.totals.subtotal_products) * 0.1
        : 0;

    /* Shipment */
    const shipmentCost = CalculateShipmentCost(shipment_type);

    setOrder({
      ...orderData,
      payment_method: payment_method,
      shipment_type: shipment_type,
      order_id: uuidv4(),
      totals: {
        ...order.totals,
        other_charge: otherCharge,
        shipment_cost: shipmentCost,
      },
      viewed: false,
    });
  };

  useEffect(() => {
    let subtotalProducts = 0;
    cart &&
      cart.map((product) => (subtotalProducts += parseInt(product.total)));

    setOrder({
      ...order,
      totals: {
        subtotal_products: subtotalProducts,
        other_charge: order.totals.other_charge || 0,
        shipment_cost: order.totals.shipment_cost || 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const CompareProduct = async (prod) => {
    let product = prod;
    const param = {
      query: { _id: prod._id },
    };

    let dbProd = await BringProducts(param);
    dbProd = await dbProd[0];

    if (product.quality === "Originales") {
      product.unit_price = await dbProd.price_original_quality;
      product.price = await dbProd.price_original_quality;
      product.total =
        (await parseInt(prod.quantity)) *
        parseInt(dbProd.price_original_quality);
    } else if (product.quality === "Calidad Original (AAA)") {
      product.quality = await "Calidad Original (AAA)";
      product.unit_price = await dbProd.price;
      product.price = await dbProd.price;
      product.total = (await parseInt(prod.quantity)) * parseInt(dbProd.price);
    }

    return product;
  };

  const ConfirmCart = async () => {
    const otherCharge =
      order.payment_method === "mercadopago"
        ? parseInt(order.totals.subtotal_products) * 0.1
        : 0;

    let secureCart = [];

    for (let i = 0; i < cart.length; i++) {
      let prod = { ...cart[i] };

      secureCart[i] = await CompareProduct(prod);
    }

    setCart(await secureCart);

    setOrder(
      await {
        ...order,
        items: await secureCart,
        totals: {
          ...order.totals,
          other_charge: await otherCharge,
        },
      }
    );

    NextStep();
  };

  const SendToMercadoPago = async () => {
    let parsedOrder = {
      ...order,
      items: order.items.map((prod) => {
        return {
          ...prod,
          unit_price:
            prod.unit_price * 1.1 +
            order.totals.shipment_cost / order.items.length,
        };
      }),
      notification_url: `https://fmfsneakers.com/api/mercadopago/update/${order.order_id}`,
      external_reference: order.order_id,
    };

    console.log(parsedOrder.items);

    MySwal.queue([
      {
        icon: "info",
        title: (
          <Text md black weight="regular">
            Aviso
          </Text>
        ),
        html: (
          <Text
            black
            ph="xs"
            weight="light"
            style={{ fontSize: "20px", lineHeight: "30px" }}
          >
            Te redireccionaremos a Mercado Pago para que puedas finalizar con el
            proceso de compra. <br /> En caso de que quieras pagar en otro
            momento, recibiras el link de pago junto con el detalle de tu pedido
            al correo que nos detallaste.
          </Text>
        ),
        footer: (
          <Container direction="c">
            <Link
              to="politics"
              smooth={true}
              duration="700"
              offset={-50}
              onClick={() =>
                scroll.scrollTo(document.querySelector("#politics"))
              }
            >
              <Text
                hover-color="dark-gray"
                style={{ cursor: "pointer", color: colors.blue }}
                onClick={MySwal.close}
              >
                <Text>Recuerda leer nuestras</Text> Políticas de compra y envío.
              </Text>
            </Link>
          </Container>
        ),
        confirmButtonText: (
          <Text white style={{ minWidth: "8rem" }}>
            Ir a Mercado Pago
          </Text>
        ),
        confirmButtonColor: "c0392b",
        showCancelButton: true,
        cancelButtonText: (
          <Text white style={{ minWidth: "8rem" }}>
            Cancelar
          </Text>
        ),
        cancelButtonColor: colors["dark-gray"],
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const respuesta = await clienteAxios.post(
              "/api/mercadopago/createpreference",
              parsedOrder
            );
            const { init_point } = respuesta.data;

            const link = init_point;

            if (link) {
              window.open(link, "resizable,scrollbars,status");
              let orderForDb = OrderForDB();
              orderForDb = {
                ...orderForDb,
                mercadopago_received_data: respuesta,
              };

              try {
                const notiRes = await clienteAxios.post(
                  "/api/sendmail",
                  MPSelfNotification(order)
                );
                const customerRes = await clienteAxios.post(
                  "/api/sendmail",
                  MPMailToCustomer(order, link)
                );

                const orderRes = await clienteAxios.post(
                  "/api/orders/create",
                  orderForDb
                );

                if (notiRes.status !== 200 && customerRes.status !== 200) {
                  MySwal.fire({
                    icon: "error",
                    title: "Ups!",
                    text: "No pudimos enviarte los datos de tu compra. Revisa que la dirección de correo que ingresaste sea una dirección válida. En caso de serlo, por favor comunicate con fmfsneakersargentina@gmail.com para poder efectuar tu pedido.",
                    confirmButtonText: (
                      <Text white pw="md">
                        Cerrar
                      </Text>
                    ),
                    confirmButtonColor: colors.black,
                  });
                  return;
                } else if (respuesta.status !== 200) {
                  MySwal.fire({
                    icon: "error",
                    title: "Ups!",
                    text: "Hubo un error al redireccionarte, por favor comunicate con fmfsneakersargentina@gmail.com para efectuar tu pedido.",
                    confirmButtonText: (
                      <Text white pw="md">
                        Cerrar
                      </Text>
                    ),
                    confirmButtonColor: colors.black,
                  });
                  return;
                } else if (orderRes.status !== 200) {
                  MySwal.fire({
                    icon: "error",
                    title: "Ups!",
                    text: "Hubo un error con tu compra, por favor comunicate con fmfsneakersargentina@gmail.com para efectuar tu pedido.",
                    confirmButtonText: (
                      <Text white pw="md">
                        Cerrar
                      </Text>
                    ),
                    confirmButtonColor: colors.black,
                  });
                  return;
                } else {
                  MySwal.fire({
                    icon: "success",
                    title: "Listo!",
                    text: "Te enviamos por mail las instrucciones para finalizar la compra!",
                    confirmButtonText: "Volver al Store",
                  }).then((result) => {
                    result.isConfirmed && setCart([]);
                    result.isConfirmed && setOrder({});
                    result.isConfirmed && history.push("/store");
                  });
                }
              } catch (err) {
                MySwal.fire({
                  icon: "error",
                  title: "Ups!",
                  text: "Al parecer hubo un error en tu compra, por favor comunicate con fmfsneakersargentina@gmail.com para poder efectuar tu pedido.",
                  confirmButtonText: (
                    <Text white pw="md">
                      Cerrar
                    </Text>
                  ),
                  confirmButtonColor: colors.black,
                });

                clienteAxios.post("/api/sendmail", {
                  to: "fmfsneakersargentina@gmail.com",
                  subject: "Hay un error en el funcionamiento del Carrito",
                  html: `<div><h3>Detalle: </h3> ${JSON.stringify(
                    err
                  )} <p></p></div>`,
                });
                return;
              }
            } else {
              MySwal.insertQueueStep({
                title: (
                  <Text sm black>
                    Hubo un error al redireccionarte. Si el problema persiste,
                    ponte en contacto con{" "}
                    <Text sm dark-red>
                      fmfsneakersargentina@gmail.com{" "}
                    </Text>{" "}
                    .
                  </Text>
                ),
                icon: "error",
                confirmButtonText: (
                  <Text white pw="md">
                    Cerrar
                  </Text>
                ),
                confirmButtonColor: colors.black,
              });
              return;
            }
          } catch (err) {
            MySwal.insertQueueStep({
              title: (
                <Text sm black>
                  Hubo un error al redireccionarte. Si el problema persiste,
                  ponte en contacto con{" "}
                  <Text sm dark-red>
                    fmfsneakersargentina@gmail.com{" "}
                  </Text>{" "}
                  .
                </Text>
              ),
              icon: "error",
              confirmButtonText: (
                <Text white pw="md">
                  Cerrar
                </Text>
              ),
              confirmButtonColor: colors.black,
            });
            console.log(err);
            return;
          }
        },
      },
    ]);
  };

  const OrderForDB = () => {
    const parser_order = { ...order };

    parser_order.items = order.items.map((product) => {
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        size: product.size,
        quality: product.quality.name || product.quality,
        unit_price: product.price,
        quantity: product.quantity,
        img: product.images.x15[0],
      };
    });

    parser_order.order_state = "payment_pending";
    parser_order.date = ObtainDate();
    parser_order.hour = ObtainTime();
    parser_order.viewed = false;
    parser_order.state_changed = false;

    return parser_order;
  };

  const HandleTransferPayment = async () => {
    const orderForDb = OrderForDB();

    try {
      const notiRes = await clienteAxios.post(
        "/api/sendmail",
        TransferSelfNotification(order)
      );
      const customerRes = await clienteAxios.post(
        "/api/sendmail",
        TransferMailToCustomer(order)
      );

      const orderRes = await clienteAxios.post(
        "/api/orders/create",
        orderForDb
      );

      if (
        notiRes.status === 200 &&
        customerRes.status === 200 &&
        orderRes.status === 200
      ) {
        MySwal.fire({
          icon: "success",
          title: "Listo!",
          text: "Te enviamos por mail las instrucciones para finalizar la compra!",
          confirmButtonText: "Volver al Store",
        }).then((result) => {
          result.isConfirmed && setCart([]);
          result.isConfirmed && setOrder({});
          result.isConfirmed && history.push("/store");
        });
      } else if (customerRes.status !== 200) {
        MySwal.fire({
          icon: "error",
          title: "Ups!",
          text: "No pudimos enviarte los datos de tu compra. Revisa que la dirección de correo que ingresaste sea una dirección válida, en caso de serlo, por favor comunicate con fmfsneakersargentina@gmail.com para poder efectuar tu pedido.",
          confirmButtonText: (
            <Text white pw="md">
              Cerrar
            </Text>
          ),
          confirmButtonColor: colors.black,
        });
        return;
      } else {
        MySwal.fire({
          icon: "error",
          title: "Ups!",
          text: "Al parecer hubo un error en tu compra, por favor comunicate via mail con fmfsneakersargentina@gmail.com para poder efectuar tu pedido.",
          confirmButtonText: (
            <Text white pw="md">
              Cerrar
            </Text>
          ),
          confirmButtonColor: colors.black,
        });
        return;
      }
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Ups!",
        text: "Al parecer hubo un error en tu compra, por favor comunicate via mail con fmfsneakersargentina@gmail.com para poder efectuar tu pedido.",
        confirmButtonText: (
          <Text white pw="md">
            Cerrar
          </Text>
        ),
        confirmButtonColor: colors.black,
      });

      clienteAxios.post("/api/sendmail", {
        to: "fmfsneakersargentina@gmail.com",
        subject: "Hay un error en el funcionamiento del Carrito",
        html: `<div><h3>Detalle: </h3> ${JSON.stringify(err)} <p></p></div>`,
      });
    }
    return;
  };

  const LaunchPayment = () => {
    const handlePaymentMethod = () => {
      if (order.payment_method === "mercadopago" && formIsValid) {
        SendToMercadoPago();
      } else {
        MySwal.fire({
          background: "transparent",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        HandleTransferPayment();
      }
    };

    ConfirmCart().then(handlePaymentMethod());
  };

  const NextStep = () => {
    let checkoutStepParsed = parseInt(checkoutStep);

    if (checkoutStepParsed === 2 && !formIsValid) {
      return;
    }

    checkoutStep !== 3 && scrollTop();
    setCheckoutStep(
      checkoutStepParsed !== 3 ? checkoutStepParsed + 1 : checkoutStepParsed
    );
  };

  const PrevStep = () => {
    let checkoutStepParsed = parseInt(checkoutStep);
    scrollTop();
    setCheckoutStep(
      checkoutStepParsed !== 1 ? checkoutStepParsed - 1 : checkoutStepParsed
    );
  };

  let navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
    { name: "categorías", route: "/categories" },
    { name: "contacto", scroll: "contacto", useLocomotive: true },
    { name: "info", scroll: "politics", useLocomotive: true },
  ];

  /* Resumen */
  /* navbarLinks =
    cart.length !== 0
      ? [
          ...navbarLinks,
          {
            name: "resumen",
            scroll: "cartresume",
            useLocomotive: true,
            offset: -50,
          },
        ]
      : navbarLinks;
 */

  return (
    <Container
      className="page"
      style={{ minHeight: "80vh" }}
      data-scroll-section
    >
      <Navbar bgColor="black" links={navbarLinks} />
      <Container direction="c" w-100 white>
        <Container
          w-90
          pw="xs"
          justify="fs"
          align="fe"
          style={{ marginBottom: ".5rem", marginTop: "4rem" }}
        >
          <Text lg main md-size="md" darkest-yellow>
            Carrito
          </Text>
        </Container>

        <Container w-90 align="fs" md-align="c" md-direction="c">
          <CartSummaryContainer
            w-70
            md-w="w-99"
            pw="sm"
            style={{ marginBottom: "6rem" }}
          >
            <Container w-100 direction="c">
              <Suspense
                fallback={
                  <Container style={{ marginTop: "-20rem" }}>
                    <Loader transparent />
                  </Container>
                }
              >
                {parseInt(checkoutStep) === 1 && (
                  <Container
                    white
                    direction="c"
                    w-100
                    b-shadow="2"
                    style={{
                      paddingBottom: "3rem",
                      border: `1px solid ${colors["lightest-gray"]}`,
                    }}
                  >
                    <Container
                      justify="fs"
                      w-100
                      lightest-gray
                      ph="xs"
                      pw="xs"
                      style={{
                        borderBottom: `1px solid ${colors["light-gray"]}`,
                        marginBottom: "3rem",
                      }}
                    >
                      <Container
                        darkest-yellow
                        b-radius="circular"
                        style={{ maxWidth: "2.5rem", maxHeight: "2.5rem" }}
                      >
                        <Text whitesmoke weight="black" pw="md" ph="md">
                          1
                        </Text>
                      </Container>
                      <Container pw="xs">
                        <Text sm>Resumen</Text>
                      </Container>
                    </Container>
                    <CartSummary cart={cart} setCart={setCart} />
                  </Container>
                )}

                {parseInt(checkoutStep) === 2 && (
                  <Container
                    white
                    direction="c"
                    w-100
                    b-shadow="2"
                    style={{
                      paddingBottom: "3rem",
                      border: `1px solid ${colors["lightest-gray"]}`,
                    }}
                  >
                    <PaymentForm
                      onSubmit={SubmitOrderData}
                      SetIsValid={setFormIsValid}
                      isValid={formIsValid}
                    />
                  </Container>
                )}
                {parseInt(checkoutStep) === 3 && (
                  <Container
                    white
                    direction="c"
                    w-100
                    b-shadow="2"
                    style={{
                      paddingBottom: "3rem",
                      border: `1px solid ${colors["lightest-gray"]}`,
                    }}
                  >
                    <OrderResume order={order} />
                  </Container>
                )}
              </Suspense>
            </Container>
          </CartSummaryContainer>

          {cart.length !== 0 && (
            <Container
              w-30
              md-w="w-100"
              direction="c"
              style={{ marginBottom: "6rem" }}
            >
              <Container white w-100>
                <OrderTotals cart={cart} order={order} />
              </Container>
              <Container direction="c" w-100 ph="xs">
                {parseInt(checkoutStep) === 1 && (
                  <Button
                    w-100
                    ph="sm"
                    mh="xs"
                    bg="darkest-yellow"
                    style={{ cursor: "pointer" }}
                    hover-shadow="1"
                    onClick={(e) => ConfirmCart() || e.preventDefault()}
                  >
                    <Text sm pw="sm" sm-size="xs" black>
                      Continuar
                    </Text>
                  </Button>
                )}

                {parseInt(checkoutStep) === 2 && (
                  <Button
                    w-100
                    ph="sm"
                    mh="xs"
                    bg={!formIsValid ? "black" : "darkest-yellow"}
                    style={{ cursor: "pointer" }}
                    hover-shadow="1"
                    form={!formIsValid ? "payment-form" : ""}
                    type={!formIsValid ? "submit" : "none"}
                    onClick={(e) =>
                      parseInt(checkoutStep) === 2 && formIsValid && NextStep()
                    }
                  >
                    <Text
                      sm
                      pw="sm"
                      sm-size="xs"
                      style={{
                        color: !formIsValid ? colors.whitesmoke : colors.black,
                      }}
                    >
                      {!formIsValid ? "Guardar Datos" : "Continuar"}
                    </Text>
                  </Button>
                )}

                {parseInt(checkoutStep) === 3 && (
                  <Button
                    w-100
                    ph="sm"
                    mh="xs"
                    bg="darkest-yellow"
                    style={{ cursor: "pointer" }}
                    hover-shadow="1"
                    onClick={(e) => LaunchPayment() || e.preventDefault()}
                  >
                    <Text sm pw="sm" sm-size="xs" black>
                      Finalizar
                    </Text>
                  </Button>
                )}

                <Container w-100>
                  <Text
                    sm
                    ph="xs"
                    sm-size="xs"
                    hover-color="dark-red"
                    style={{
                      color:
                        parseInt(checkoutStep) === 1 && colors["light-gray"],
                      cursor: parseInt(checkoutStep) !== 1 && "pointer",
                    }}
                    onClick={() => PrevStep()}
                  >
                    {"<"} Anterior
                  </Text>
                </Container>
              </Container>
            </Container>
          )}
        </Container>

        <Container white b-shadow="9">
          <Politics option="buy" />
        </Container>
      </Container>
    </Container>
  );
};

export default Cart;
