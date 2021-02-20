import mercadopago from "mercadopago";

mercadopago.configure({
  access_token:
    "TEST-1825194644671291-020305-941745df511e0bbbef675d8dc97bf9d3-181749895",
});

const CreatePreference = (order) => {
  let id = "";

  mercadopago.configure({
    access_token:
      "TEST-1825194644671291-020305-941745df511e0bbbef675d8dc97bf9d3-181749895",
  });

  mercadopago.preferences
    .create(order)
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
      console.log(response.body.id);
      id = response.body.id;
    })
    .catch(function (error) {
      console.log(error);
    });

  return id;
};

export { CreatePreference };
