import { ObtainDate, ObtainTime } from "../../helpers/functions";

export const MPSelfNotification = (order) => {
  return {
    to: "fmfsneakersargentina@gmail.com",
    subject: `🔵 Pedido de ${order.payer.name} ${order.payer.surname}.`,
    html: `<div style="max-width: 768px;">
    <div style="padding: 1rem 0;">
        <p style="font-size: 25px; color: rgba(0, 0, 0, 0.7);">
            <strong>Nuevo Pedido!</strong>
            
        </p>
        <p><p style="color: rgb(184, 0, 0)">Recuerda</p>Toda la información de éste pedido está disponible en tu panel de Administrador, seccion Ordenes.</p>
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
                <strong>Dni:</strong> ${order.payer.dni}
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
            <p>
                <strong>Provincia:</strong> ${order.payer.address.province}
            </p>
            <p>
                <strong>Localidad:</strong> ${order.payer.address.state}
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
                <strong>Envío (${order.shipment_type}):</strong> $${
      order.totals.shipment_cost
    }
            </p>

            <p>
                <strong>Total:</strong> $${
                  order.totals.subtotal_products +
                  order.totals.other_charge +
                  order.totals.shipment_cost
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
                    <strong>Calidad:</strong> ${
                      product.quality.name || product.quality
                    }
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
};

export const MPMailToCustomer = (order, link) => {
  return {
    to: order.payer.email,
    subject: `👟 Pasos para concretar tu pedido. 🛹`,
    html: `<div style="display: flex; width: 100%; flex-direction: column; justify-content:center;">
    <div style="display: block; max-width: 755px;">
        <div style="padding: 1rem 0;">
            <p style="font-size: 25px; background-color: rgba(0,0,0,0.7); padding: .5rem; text-align: center;">
                <strong style="color: rgba(255,255,255,1);"><span style="color: #fff1d9;">¡</span>Gracias por tu
                    compra<span style="color: #fff1d9;">!</span></strong>
            </p>

            

            <p style="font-size: 18.5px; width: 100%; text-align: center;">
                <strong style="font-size: 18.5px; color: rgba(0,0,0,0.7);">👟 Solo estás a un paso de tener tus
                    <span style="color: #FDA50F;">FMF Custom 👟</span></strong>
            </p>
            <p style="font-size: 15.5px; margin-top: 3rem; color: rgba(0,0,0,0.7);">
                - Si aún no pagaste tu pedido, hazlo en el siguiente link: <a href="${link}" target="_blank"
                    onclick="window.open(link);">MercadoPago</a>
            </p>

            <p style="font-size: 15.5px; margin-top: 3rem; color: rgba(0,0,0,0.7);">
                - Nos comunicaremos contigo luego de que tu pago haya sido aprobado.
            </p>
            <p style="font-size: 15.5px; margin-top: 3rem; color: rgba(0,0,0,0.7);">
                - No dudes en consultarnos
                por nuestras redes o nuestro mail fmfsneakersargentina@gmail.com en caso de que tengas alguna duda.
            </p>
            <p style="font-size: 15.5px; text-align: center;  margin-top: 4rem;">
                <strong
                    style="font-size: 17px; background-color: rgba(0,0,0,0.7); padding: .5rem;color: rgba(255,255,255,1);">¡Listo!</strong>
                <strong>
                    <p style="margin-top: -15px; text-align: center; font-size: 15.5px; white-space: pre-line;">
                        👟 Crearemos tus FMF Custom para que las disfrutes cuanto antes 👟</p>
                </strong>
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
            <h3 style="color: rgba(0,0,0,0.7);">Resumen del pedido:</h3>
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
                <strong>Envío (${order.shipment_type}):</strong> $${
      order.totals.shipment_cost
    }
            </p>

                <p>
                    <strong>Total:</strong> $${
                      parseInt(order.totals.subtotal_products) +
                      parseInt(order.totals.other_charge) +
                      parseInt(order.totals.shipment_cost)
                    }
                </p>
            </div>
        </div>
        <div style="margin-top: 40px;">
            <h3 style="color: rgba(0,0,0,0.7);">Contacto:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
                <p>
                    <strong>Nombre:</strong> ${order.payer.name} ${
      order.payer.surname
    }
                </p>
                <p>
                    <strong>Dni:</strong> ${order.payer.dni}
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
                    }
                    ${order.payer.address.street_number}
                </p>
                <p>
                    <strong>Código Postal:</strong> ${
                      order.payer.address.zip_code
                    }
                </p>
                <p>
                    <strong>Provincia:</strong> ${order.payer.address.province}
                </p>
                <p>
                    <strong>Localidad:</strong> ${order.payer.address.state}
                </p>
            </div>
        </div>
        <div style="margin: 40px 0px;">
            <h3 style="color: rgba(0,0,0,0.7);">Detalle:</h3>
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
                        <strong>Calidad:</strong> ${
                          product.quality.name || product.quality
                        }
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
    </div>
</div>`,
  };
};

export const TransferSelfNotification = (order) => {
  return {
    to: "fmfsneakersargentina@gmail.com",
    subject: `⚫ Pedido de ${order.payer.name} ${order.payer.surname}.`,
    html: `<div style="max-width: 768px;">
    <div style="padding: 1rem 0;">
        <p style="font-size: 25px; color: rgba(0, 0, 0, 0.7);">
            <strong>Nuevo Pedido!</strong>
            
        </p>
        <p><p style="color: rgb(184, 0, 0)">Recuerda</p>Toda la información de éste pedido está disponible en tu panel de Administrador, seccion Ordenes.</p>
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
                <strong>Dni:</strong> ${order.payer.dni}
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
            <p>
                <strong>Provincia:</strong> ${order.payer.address.province}
            </p>
            <p>
                <strong>Localidad:</strong> ${order.payer.address.state}
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
                <strong>Envío (${order.shipment_type}):</strong> $${
      order.totals.shipment_cost
    }
            </p>

            <p>
                <strong>Total:</strong> $${
                  order.totals.subtotal_products +
                  order.totals.other_charge +
                  order.totals.shipment_cost
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
                    <strong>Calidad:</strong> ${
                      product.quality.name || product.quality
                    }
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
};

export const TransferMailToCustomer = (order) => {
  return {
    to: order.payer.email,
    subject: `👟 Pasos para concretar tu pedido. 🛹`,
    html: `<div style="display: flex; width: 100%; flex-direction: column; justify-content:center;">
    <div style="display: block; max-width: 755px;">
        <div style="padding: 1rem 0;">
            <p style="font-size: 25px; background-color: rgba(0,0,0,0.7); padding: .5rem; text-align: center;">
                <strong style="color: rgba(255,255,255,1);"><span style="color: #fff1d9;">¡</span>Gracias por tu
                    compra<span style="color: #fff1d9;">!</span></strong>
            </p>
            <p style="font-size: 18.5px; width: 100%; text-align: center;">
                <strong style="font-size: 18.5px; color: rgba(0,0,0,0.7);">👟 Solo estás a un paso de tener tus
                    <span style="color: #FDA50F;">FMF Custom 👟</span></strong>
            </p>
            <p style="font-size: 15.5px; margin-top: 3rem; color: rgba(0,0,0,0.7);">
                - Realiza la transferencia por el total de: <strong>$${
                  order.totals.subtotal_products +
                  order.totals.other_charge +
                  order.totals.shipment_cost
                }</strong> a la siguiente cuenta:
            </p>
            <div
                style="margin: 5px 0px; padding: 12px ;border: 1.5px solid lightgray; border-radius: 5px; width: 100%;">
                <p>
                    <strong style="color: rgba(0,0,0,0.7);">Banco:</strong> Banco Galicia
                </p>
                <p>
                    <strong style="color: rgba(0,0,0,0.7);">CUIL:</strong> 27-25922836-6
                </p>
                <p>
                    <strong style="color: rgba(0,0,0,0.7);">CBU:</strong> 0070089430004118574849
                </p>
                <p>
                    <strong style="color: rgba(0,0,0,0.7);">Cuenta:</strong> 4118574-8 089-4
                </p>
            </div>
            <p style="font-size: 15.5px; margin: 4.5rem 0; color: rgba(0,0,0,0.7);">
                - Una vez que lo hagas, responde a éste mail o a fmfsneakersargentina@gmail.com con una <strong>foto</strong> del
                comprobante de transferencia y el id de tu pédido. Para que podamos verificar que realizaste el pago.
            </p>
            <p style="font-size: 15.5px; text-align: center;">
                <strong
                    style="font-size: 17px; background-color: rgba(0,0,0,0.7); padding: .5rem;color: rgba(255,255,255,1);">¡Listo!</strong>
                <strong>
                    <p style="margin-top: -15px; text-align: center; font-size: 15.5px; white-space: pre-line;">
                        👟 Crearemos tus FMF Custom para que las disfrutes cuanto antes 👟</p>
                </strong>
            </p>
            <p style="font-size: 13px; color: #606060; margin-top: 3.2rem;">
                Cualquier pregunta que tengas sobre tu compra, envíala a
                fmfsneakersargentina@gmail.com, con el titulo 'Compra FMF' junto
                con el ID de tu pedido ${"(el cual lo encontrarás en el apartado 'Resumen' dentro de éste mail)"}.
            </p>
            <p style="font-size: 11px; color: #606060;">
                <strong style="color: #A80000;">Importante:</strong> Recuerda
                que el plazo de fabricación y envío es de 21 días hábiles, una vez
                efectuado el pago.
            </p>
        </div>

        <div style="margin-top: 40px;">
            <h3 style="color: rgba(0,0,0,0.7);">Resumen del pedido:</h3>
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
                <strong>Envío (${order.shipment_type}):</strong> $${
      order.totals.shipment_cost
    }
            </p>

                <p>
                    <strong>Total:</strong> $${
                      order.totals.subtotal_products +
                      order.totals.other_charge +
                      order.totals.shipment_cost
                    }
                </p>
            </div>
        </div>
        <div style="margin-top: 40px;">
            <h3 style="color: rgba(0,0,0,0.7);">Contacto:</h3>
            <div style="margin: 10px 0px; padding: 20px ;border: 1.5px solid lightgray; border-radius: 5px">
                <p>
                    <strong>Nombre:</strong> ${order.payer.name} ${
      order.payer.surname
    }
                </p>
                <p>
                <strong>Dni:</strong> ${order.payer.dni}
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
                    }
                    ${order.payer.address.street_number}
                </p>
                <p>
                    <strong>Código Postal:</strong> ${
                      order.payer.address.zip_code
                    }
                </p>
                <p>
                    <strong>Provincia:</strong> ${order.payer.address.province}
                </p>
                <p>
                    <strong>Localidad:</strong> ${order.payer.address.state}
                </p>
            </div>
        </div>
        <div style="margin: 40px 0px;">
            <h3 style="color: rgba(0,0,0,0.7);">Detalle:</h3>
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
                        <strong>Calidad:</strong> ${
                          product.quality.name || product.quality
                        }
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
    </div>
</div>`,
  };
};
