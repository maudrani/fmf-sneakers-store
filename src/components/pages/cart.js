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

const CartSummary = lazy(() => import("../store/components/cart-summary"));
const PaymentForm = lazy(() => import("../store/components/payment-form"));
const OrderResume = lazy(() => import("../store/components/order-resume"));

const CartSummaryContainer = styled(Container)`
  @media (max-width: 768px) {
    padding: 0 0.1rem;
  }
`;

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const orderValues = {
    items: [...cart] || [],
    payer: {
      name: "",
      surname: "",
      email: "",
      phone: {
        number: "",
      },
      address: { street_name: "", street_number: "", zip_code: "" },
    },
    payment_method: "",
    order_id: uuidv4(),
    totals: {
      subtotal_products: 0,
      other_charge: 0,
    },
  };
  const [order, setOrder] = useState({ ...orderValues });
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);
  const MySwal = withReactContent(Swal);
  const history = useHistory();

  useEffect(() => {
    if (
      order.payer.name === "" ||
      order.payer.surname === "" ||
      order.payer.email === "" ||
      order.payer.phone.number === "" ||
      order.payer.address.street_name === "" ||
      order.payer.address.street_number === "" ||
      order.payer.address.zip_code === "" ||
      order.payment_method === ""
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [order]);

  const SubmitOrderData = (data) => {
    let orderData = order;
    let { payer, payment_method } = orderData;
    let { address } = orderData.payer;

    payer.name = data.name;
    payer.surname = data.surname;
    payer.email = data.email;
    payer.phone.number = parseInt(data.phone_number);

    address.street_name = data.street_name;
    address.street_number = parseInt(data.street_number);
    address.zip_code = data.zip_code;

    payment_method = window.localStorage.getItem("payment-form");
    payment_method = JSON.parse(payment_method).payment_method;

    const otherCharge =
      payment_method === "mercadopago"
        ? parseInt(order.totals.subtotal_products) * 0.1
        : 0;

    setOrder({
      ...orderData,
      payment_method: payment_method,
      order_id: uuidv4(),
      totals: { ...order.totals, other_charge: otherCharge },
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
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const ConfirmCart = () => {
    const otherCharge =
      order.payment_method === "mercadopago"
        ? parseInt(order.totals.subtotal_products) * 0.1
        : 0;

    setOrder({
      ...order,
      items: cart,
      totals: { ...order.totals, other_charge: otherCharge },
    });
  };

  const SendToMercadoPago = async () => {
    let parsedOrder = {
      ...order,
      items: order.items.map((prod) => {
        return { ...prod, unit_price: prod.unit_price * 1.1 };
      }),
    };

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
            style={{ fontSize: "22px", lineHeight: "30x" }}
          >
            Te redireccionaremos a Mercado Pago para que puedas finalizar con el
            proceso de compra.
          </Text>
        ),
        footer: (
          <Container direction="c">
            <Link to="politics" smooth={true} duration="700" offset={-50}>
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
              "/api/mercadopago",
              parsedOrder
            );
            const { sandbox_init_point } = respuesta.data;

            const link = sandbox_init_point;

            const selfNotification = {
              to: "fmfsneakersargentina@gmail.com",
              subject: `Pedido de ${order.payer.name} ${order.payer.surname}.`,
              html: `<div style="max-width: 768px;">
                  <div style="padding: 1rem 0;">
                    <p style="font-size: 25px">
                      <strong>Nuevo Pedido!</strong>
                    </p>
                    <span style="font-size: 11px; color: #606060;">
                      <strong style="color: #A80000;">Importante:</strong> Si la forma
                      de pago es MercadoPago, recuerda buscar el estado de la venta en
                      la página de MercadoPago, utilizando el ID de la compra.
                    </span>
                  </div>
                  <div style="margin-top: 40px;">
                    <h3>Contacto:</h3>
                    <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
                      <p>
                        <strong>Nombre:</strong> ${order.payer.name} ${
                order.payer.surname
              }
                      </p>
                      <p>
                        <strong>Mail:</strong> ${order.payer.email}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> ${order.payer.phone.number}
                      </p>
                      <p>
                        <strong>Dirección:</strong> ${
                          order.payer.address.street_name
                        } ${order.payer.address.street_number}
                      </p>
                      <p>
                        <strong>Código Postal:</strong> ${
                          order.payer.address.zip_code
                        }
                      </p>
                    </div>
                  </div>
                  <div style="margin-top: 40px;">
                    <h3>Resumen:</h3>
                    <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
                    <p>
                        <strong>ID:</strong> ${order.order_id}
                      </p>  
                      <p>
                        <strong>Fecha:</strong> ${ObtainDate()}
                      </p>
                      <p>
                        <strong>Hora:</strong> ${ObtainTime()}
                      </p>
                      <p>
                        <strong>Forma de pago:</strong> ${
                          order.payment_method === "mercadopago"
                            ? "Mercado Pago"
                            : "Transferencia Bancaria"
                        }
                      </p>
                      <p>
                        <strong>Subtotal (${
                          order.items.length
                        } items):</strong> $${order.totals.subtotal_products}
                      </p>
                      ${
                        order.totals.other_charge !== 0
                          ? `<p>
                        <strong>MercadoPago - recargo:</strong> $${order.totals.other_charge}
                      </p>`
                          : ""
                      }
                      <p>
                        <strong>Total:</strong> $${
                          order.totals.subtotal_products +
                          order.totals.other_charge
                        }
                      </p>
                    </div>
                  </div>
                  <div style="margin: 40px 0px;">
                    <h3>Detalle:</h3>
                    <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
                      ${order.items.map((product) => {
                        return `<div style="padding: 1rem 0; border-bottom: 1px solid lightgray;">
                            <p>
                              <strong>Nombre:</strong> ${product.name.toUpperCase()}
                            </p>
                            <p>
                              <strong>Cantidad:</strong> ${product.quantity}
                            </p>
                            <p>
                              <strong>Calidad:</strong> ${product.quality.name}
                            </p>
                            <p>
                              <strong>Talle:</strong> ${product.size}
                            </p>
                            <p>
                              <strong>Precio unitario:</strong> $${
                                product.price
                              }
                            </p>
                            <p>
                              <strong>Total:</strong> $${product.total}
                            </p>
                          </div>`;
                      })}
                    </div>
                  </div>
                </div>`,
            };

            console.log(respuesta.data);

            if (link) {
              window.open(sandbox_init_point, "resizable,scrollbars,status");
              const orderForDb = OrderForDB();
              setCart([]);
              setOrder({});
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
                    Ok
                  </Text>
                ),
                confirmButtonColor: colors.black,
              });
            }
          } catch (err) {
            MySwal.insertQueueStep({
              title: (
                <Text sm black>
                  Hubo un error al redireccionart. Si el problema persiste,
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
                  Ok
                </Text>
              ),
              confirmButtonColor: colors.black,
            });
            console.log(err);
          }
        },
      },
    ]);
  };

  const OrderForDB = () => {
    const result = { ...order };

    result.items = order.items.map((product) => {
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        size: product.size,
        quality: product.quality.name,
        unit_price: product.price,
        quantity: product.quantity,
      };
    });

    result.state = "pending";

    return result
  }

  const HandleTransferPayment = async () => {
    const selfNotification = {
      to: "fmfsneakersargentina@gmail.com",
      subject: `Pedido de ${order.payer.name} ${order.payer.surname}.`,
      html: `<div style="max-width: 768px;">
          <div style="padding: 1rem 0;">
            <p style="font-size: 25px">
              <strong>Nuevo Pedido!</strong>
            </p>
            <span style="font-size: 11px; color: #606060;">
              <strong style="color: #A80000;">Importante:</strong> Si la forma
              de pago es MercadoPago, recuerda buscar el estado de la venta en
              la página de MercadoPago, utilizando el ID de la compra.
            </span>
          </div>
          <div style="margin-top: 40px;">
            <h3>Contacto:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p>
                <strong>Nombre:</strong> ${order.payer.name} ${
        order.payer.surname
      }
              </p>
              <p>
                <strong>Mail:</strong> ${order.payer.email}
              </p>
              <p>
                <strong>Teléfono:</strong> ${order.payer.phone.number}
              </p>
              <p>
                <strong>Dirección:</strong> ${
                  order.payer.address.street_name
                } ${order.payer.address.street_number}
              </p>
              <p>
                <strong>Código Postal:</strong> ${order.payer.address.zip_code}
              </p>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <h3>Resumen:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
            <p>
                <strong>ID:</strong> ${order.order_id}
              </p>  
              <p>
                <strong>Fecha:</strong> ${ObtainDate()}
              </p>
              <p>
                <strong>Hora:</strong> ${ObtainTime()}
              </p>
              <p>
                <strong>Forma de pago:</strong> ${
                  order.payment_method === "mercadopago"
                    ? "Mercado Pago"
                    : "Transferencia Bancaria"
                }
              </p>
              <p>
                <strong>Subtotal (${order.items.length} items):</strong> $${
        order.totals.subtotal_products
      }
              </p>
              ${
                order.totals.other_charge !== 0
                  ? `<p>
                <strong>MercadoPago - recargo:</strong> $${order.totals.other_charge}
              </p>`
                  : ""
              }
              <p>
                <strong>Total:</strong> $${
                  order.totals.subtotal_products + order.totals.other_charge
                }
              </p>
            </div>
          </div>
          <div style="margin: 40px 0px;">
            <h3>Detalle:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              ${order.items.map((product) => {
                return `<div style="padding: 1rem 0; border-bottom: 1px solid lightgray;">
                    <p>
                      <strong>Nombre:</strong> ${product.name.toUpperCase()}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> ${product.quantity}
                    </p>
                    <p>
                      <strong>Calidad:</strong> ${product.quality.name}
                    </p>
                    <p>
                      <strong>Talle:</strong> ${product.size}
                    </p>
                    <p>
                      <strong>Precio unitario:</strong> $${product.price}
                    </p>
                    <p>
                      <strong>Total:</strong> $${product.total}
                    </p>
                  </div>`;
              })}
            </div>
          </div>
        </div>`,
    };

    const mailToCustomer = {
      to: order.payer.email,
      subject: `Pasos para concretar tu pedido.`,
      html: `<div style="max-width: 768px;">
          <div style="padding: 1rem 0;">
            <p style="font-size: 25px">
              <strong><span style="color: #FA3127;">¡</span>Gracias por tu compra<span style="color: #FA3127;">!</span></strong>
            </p>
            <p style="font-size: 18.5px; color: #181818;">
              <strong>Solo estás a un paso de tener tus <span style="color: #FDA50F;">FMF Custom</span>:</strong>
            </p>
            <p style="font-size: 15.5px; margin-top: 3rem;">
              - Realiza la transferencia por el valor de tu compra $${
                "(" + order.totals.subtotal_products + ")"
              } a la siguiente cuenta:
            </p>
            <div style="margin: 5px 0px; padding: 12px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p>
                <strong>Titular:</strong> #TitularCuenta
             </p>
             <p>
                <strong>CBU:</strong> #CBU
             </p>
             <p>
                <strong>Cuenta:</strong> #Cuenta
             </p>
            </div>
            <p style="font-size: 15.5px; margin: 4.5rem 0">
             - Una vez que lo hagas, responde a éste mail con una <strong>foto</strong> del
              comprobante de transferencia.
            </p>
            <p style="font-size: 15.5px; text-align: center;">
              <strong style="font-size: 17px;">¡Listo!</strong> <strong><p style="margin-top: -15px; text-align: center; font-size: 15.5px; white-space: pre-line;">Crearemos tus FMF Custom para que las disfrutes cuanto antes.</p></strong>
            </p>
            <p style="font-size: 13px; color: #606060; margin-top: 3.2rem;">
              Cualquier pregunta que tengas sobre tu compra, envíala a
              fmfsneakersargentina@gmail.com, con el titulo 'Compra FMF' junto
              con el ID de tu pedido ${"(el cual lo encontrarás en el apartado 'Resumen' dentro de éste mail)"}.
            </p>
            <p style="font-size: 11px; color: #606060;">
              <strong style="color: #A80000;">Importante:</strong> Recuerda
              que el plazo de fabricación y envío es de 14 días hábiles, una vez
              efectuado el pago.
            </p>
          </div>
          <div style="margin-top: 40px;">
            <h3>Resumen del pedido:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p>
                <strong>ID del pedido:</strong> ${order.order_id}
              </p>
              <p>
                <strong>Fecha:</strong> ${ObtainDate()}
              </p>
              <p>
                <strong>Hora:</strong> ${ObtainTime()}
              </p>
              <p>
                <strong>Forma de pago:</strong> ${
                  order.payment_method === "mercadopago"
                    ? "Mercado Pago"
                    : "Transferencia Bancaria"
                }
              </p>
              <p>
                <strong>Subtotal (${order.items.length} items):</strong> $${
        order.totals.subtotal_products
      }
              </p>
              ${
                order.totals.other_charge !== 0
                  ? `<p>
                <strong>MercadoPago - recargo:</strong> $${order.totals.other_charge}
              </p>`
                  : ""
              }
              <p>
                <strong>Total:</strong> $${
                  order.totals.subtotal_products + order.totals.other_charge
                }
              </p>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <h3>Contacto:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              <p>
                <strong>Nombre:</strong> ${order.payer.name} ${
        order.payer.surname
      }
              </p>
              <p>
                <strong>Mail:</strong> ${order.payer.email}
              </p>
              <p>
                <strong>Teléfono:</strong> ${order.payer.phone.number}
              </p>
              <p>
                <strong>Dirección:</strong> ${order.payer.address.street_name} 
                ${order.payer.address.street_number}
              </p>
              <p>
                <strong>Código Postal:</strong> ${order.payer.address.zip_code}
              </p>
            </div>
          </div>
          <div style="margin: 40px 0px;">
            <h3>Detalle:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
              ${order.items.map((product) => {
                return `<div style="padding: 1rem 0; border-bottom: 1px solid lightgray;">
                    <p>
                      <strong>Nombre:</strong> ${product.name.toUpperCase()}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> ${product.quantity}
                    </p>
                    <p>
                      <strong>Calidad:</strong> ${product.quality.name}
                    </p>
                    <p>
                      <strong>Talle:</strong> ${product.size}
                    </p>
                    <p>
                      <strong>Precio unitario:</strong> $${product.price}
                    </p>
                    <p>
                      <strong>Total:</strong> $${product.total}
                    </p>
                  </div>`;
              })}
            </div>
          </div>
        </div>`,
    };

    const orderForDb = OrderForDB();

    try {
      const notiRes = await clienteAxios.post(
        "/api/sendmail",
        selfNotification
      );
      const resCustomer = await clienteAxios.post(
        "/api/sendmail",
        mailToCustomer
      );

      const orderRes = await clienteAxios.post("/api/orders", orderForDb);

      setCart([]);
      setOrder({});

      MySwal.fire({
        icon: "success",
        title: "Listo!",
        text:
          "Te enviamos por mail las instrucciones para finalizar la compra!",
        confirmButtonText: "Volver al Store",
      }).then((result) => {
        result && history.push("/store");
      });

      console.log(notiRes.data);
      console.log(resCustomer.data);
      console.log(orderRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const LaunchPayment = () => {
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
    { name: "contacto", scroll: "contacto" },
  ];

  navbarLinks =
    cart.length !== 0
      ? [...navbarLinks, { name: "resumen", scroll: "cartresume", offset: -50 }]
      : navbarLinks;

  return (
    <div className="page" style={{ minHeight: "80vh" }}>
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
                    <Loader />
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
                    onClick={(e) =>
                      ConfirmCart() || NextStep() || e.preventDefault()
                    }
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
    </div>
  );
};

export default Cart;
