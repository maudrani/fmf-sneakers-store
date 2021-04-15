import clienteAxios from "../../../config/axios";

export const CreateSuscription = async (suscription) => {
  try {
    await clienteAxios.post("/api/suscriptions/create", suscription);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateSuscription = async (suscription) => {
  try {
    await clienteAxios.put(`/api/suscriptions/update/${suscription._id}`, suscription);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteSuscription = async (suscription) => {
  try {
    await clienteAxios.delete(`/api/suscriptions/delete/${suscription._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const BringSuscriptions = async (params) => {
  try {
    const respuesta = await clienteAxios.post("/api/suscriptions/bring", params);
    return respuesta.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};