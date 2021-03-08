import React, { useState, useEffect } from "react";
import { Container, Text } from "../../../framework/assets";
import categories from "../db/categories";
import { IsMobile } from "../../../helpers/functions";
import { lazy } from "@loadable/component";

const AcordeonOptions = lazy(() => import("./acordeon-options"));
const CategoryResume = lazy(() => import("./category-summary"));

const StyledCategories = ({ products }) => {
  const [acordeonOptions, setAcordeonOptions] = useState([]);
  const [categoryToShow, setCategoryToShow] = useState({
    ...categories[0],
    color: "dark-red",
  });

  useEffect(() => {
    const fetchData = async () => {
      let options = [];

      categories.forEach(async (cat) => {
        let catImgs = products.filter((prod) => prod.category === cat.name);

        if (IsMobile()) {
          catImgs = (await catImgs.length) > 1 && catImgs[0].images.x15[0];
        } else {
          catImgs = (await catImgs.length) > 1 && catImgs[0].images.x50[0];
        }

        const category = {
          ...cat,
          img: (await catImgs) || cat.img,
        };

        options.push(await category);
        setAcordeonOptions(await options);
      });
    };

    fetchData();
  }, [products]);

  const chooseCategory = (option) => {
    setTimeout(() => {
      setCategoryToShow(
        categories.filter((cat) => cat.name === option.name)[0]
      );
    }, 750);
  };

  return (
    <Container
      direction="c"
      w-100
      black
      style={{ minHeight: "130vh", zIndex: "10" }}
      bg-image="graffiti"
    >
      <Container w-50 sm-w="w-100" ph="xl" direction="c">
        <Text
          w-70
          sm-w="w-100"
          whitesmoke
          fourth
          weight="thin"
          mh="sm"
          lg
          sm-size="md"
          style={{
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          CATEGORÍAS
        </Text>

        <Text red md main d-shadow="8">
          #FMFSneakers
        </Text>
      </Container>

      <Container b-shadow={!IsMobile() && "8"} w-90 sm-w="w-100">
        <AcordeonOptions setOption={chooseCategory} options={acordeonOptions} />
      </Container>

      <Container w-100 direction="c" style={{ paddingTop: "3rem" }}>
        <Container w-100 direction="c" dark-gray bg-image="wall">

          <CategoryResume
            category={categoryToShow}
            color={categoryToShow.color}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default StyledCategories;
