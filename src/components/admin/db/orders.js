import clienteAxios from "../../../config/axios";
import { colors } from "../../../framework/global";

export const CreateOrder = async (order) => {
  try {
    await clienteAxios.post("/api/orders/create", order);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateOrder = async (order) => {
  try {
    await clienteAxios.put(`/api/orders/update/${order._id}`, order);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteOrder = async (order) => {
  try {
    await clienteAxios.delete(`/api/orders/delete/${order._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const BringOrders = async (params) => {
  try {
    const respuesta = await clienteAxios.post("/api/orders/bring", params);
    return respuesta.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const GetOrderStates = () => {
  return [
    {
      key: "payment_pending",
      value: "Pendiente de Pago",
      color: colors["darkest-yellow"],
    },
    {
      key: "payment_approved",
      value: "Pago Aprobado",
      color: colors.blue,
    },
    {
      key: "payment_rejected",
      value: "Pago Rechazado",
      color: colors["dark-red"],
    },
    {
      key: "shipment_pending",
      value: "Envío Pendiente",
      color: colors["darkest-yellow"],
    },
    {
      key: "shipment_made",
      value: "Envío Realizado",
      color: colors["blue"],
    },
    {
      key: "delivered",
      value: "Entregado",
      color: colors["dark-green"],
    },
    {
      key: "cancelled",
      value: "Pedido Cancelado",
      color: colors["dark-red"],
    },
    {
      key: "manufacturing",
      value: "En Fabricación",
      color: colors["dark-gray"],
    },
  ];
};
