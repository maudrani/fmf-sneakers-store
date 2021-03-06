import productsInfo from "../db/products-info.json";
import clienteAxios from "../../../config/axios";

// eslint-disable-next-line no-unused-vars
const ImportingLocalProducts = () => {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
    return images;
  };

  const x50ImageContext = {
    name: "x50",
    location: importAll(
      require.context("./../../../Assets/IMG/Products/X50", false, /\.(webp)$/)
    ),
  };
  const x25ImageContext = {
    name: "x25",
    location: importAll(
      require.context("./../../../Assets/IMG/Products/X25", false, /\.(webp)$/)
    ),
  };

  const x15ImageContext = {
    name: "x15",
    location: importAll(
      require.context("./../../../Assets/IMG/Products/X15", false, /\.(webp)$/)
    ),
  };

  const AssignImages = (product, context) => {
    product.images[context.name] = [];

    const imgName = product.name.toLowerCase().replaceAll(" ", "-").trim();

    //Push the full-size image location if the image exists
    for (let i = 1; i <= 10; i++) {
      const existImage = context.location[imgName + `-${i}.webp`] || false;

      if (existImage) {
        const image = existImage.default;
        product.images[context.name].push(image);
      } else {
        break;
      }
    }
  };

  const ProductNameByImageName = (imageName) => {
    let productName = "";
    productName = imageName
      .replace(/-(\d).webp/, "")
      .replaceAll("-", " ")
      .trim();

    //Capitalizes name
    /* productName = productName.charAt(0).toUpperCase() + productName.slice(1); */

    return productName;
  };

  //Creating products list based on the local files
  const products = [];

  //Creating an array of names and cleaning repeated ones
  const ProductsNameArray = () => {
    const arrayOfImagesName = Object.keys(x15ImageContext.location).sort();

    const names = {};

    arrayOfImagesName.forEach((element) => {
      names[ProductNameByImageName(element)] = "";
    });

    return Object.keys(names);
  };

  //Pushing objects with the "name" key based on the image file name
  ProductsNameArray().forEach((name, idx) => {
    products[idx] = { name: name, images: {} };
  });

  //Assigning the different image sizes to the objects
  products.forEach((product) => {
    /* AssignImages(product, fullSizeImagesContext); */
    /* AssignImages(product, x70ImageContext); */
    AssignImages(product, x50ImageContext);
    AssignImages(product, x25ImageContext);
    AssignImages(product, x15ImageContext);
  });

  //Bringing each product extra info from the json "products-info.json" and assigning it to each product of the array
  products.forEach((product, idx) => {
    products[idx] = { ...products[idx], ...productsInfo[product.name] };
  });

  /* products.forEach((el) => console.log(el.name));

console.log(products); */

  // Uploading the Products to the DB
  const CreateProducts = () => {
    products.forEach((product) => CreateProduct(product));
  };

  console.log(CreateProducts)
};

//Db Functions

export const CreateProduct = async (product) => {
  try {
    const respuesta = await clienteAxios.post("/api/products/create", product);
    console.log(respuesta.data);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateProduct = async (product) => {
  try {
    await clienteAxios.put(`/api/products/update/${product._id}`, product);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteProduct = async (product) => {
  try {
    await clienteAxios.delete(`/api/products/delete/${product._id}`);
  } catch (err) {
    console.log(err);
  }
}

export const BringProducts = async (params) => {
  try {
    const respuesta = await clienteAxios.post("/api/products/bring", params);
    return respuesta.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

