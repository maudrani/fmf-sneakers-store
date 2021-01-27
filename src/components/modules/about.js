import React from "react";
import { Container, Text } from "../../framework/assets";
import sneakHand from "../../Assets/IMG/Various/yellow-art-1.webp";

const About = () => {
  return (
    <Container
      black
      pw="lg"
      style={{ minHeight: "115vh" }}
      justify="sb"
      sm-direction="cr"
    >
      <Container h-100 w-50 sm-w='w-100'>
        <img alt="img" src={sneakHand} />
      </Container>
      <Container h-100 w-50 sm-w='w-100' ph='lg' direction="c">
        <Text main whitesmoke xl style={{ textAlign: "center" }}>
          Quienes somos
        </Text>
        <Text yellow xs ph="xs">
          FMF SNEAKERS ARGENTINA
        </Text>
        <Text whitesmoke style={{ textAlign: "center" }}>
          Somos una tienda dedicada a la personalización de sneakers. Con
          diseños muy originales y solicitados en todo el país. <br />
          Elegidos por Duki, Oky, Dng Team y más.
        </Text>
      </Container>
    </Container>
  );
};

export default About;







/* 

NOSOTROS➡️ FMF Sneakers Argentina se crea en el año 2020 a partir de la creativa idea de tres amigos, Facu, Maxi y Facu, al darnos cuenta que en nuestros país nadie se dedicaba a zapatillas/sneakers customizados, convirtiéndonos así en ser los primeros y mejores al día de hoy en nuestro país en hacer esto. Con el objetivo de crear los mejores y más innovadores diseños para ustedes, les presentamos la página web oficial de FMF SNEAKERS ARGENTINA.

PRODUCTO▶️ Puedes elegir entre 2 tipos de calidad de zapatillas para aplicar tu diseño: -Calidad original (AAA) 
-Originales ( mayor costo $) 
Nuestros diseños son aplicados a mano individualmente en las zapatillas con pintura especial resistente y también poseen un barnizado sobre la pintura para proteger aún más los diseños. 

DISEÑOS▶️ En FMF tenemos distintos diseños publicados en nuestra página y constantemente estamos creando nuevos para que encuentres el que más se adapte a tu personalidad. Si tienes una idea para tu diseño personalizado nos la cuentas y nosotros nos encargamos de plasmarlo en nuestras zapatillas FMF Customs.

CUIDADOS/MANTENIMIENTO➡️ Nuestros sneakers/zapatillas están para lucirse y disfrutarse, por eso, al momento de lavarlas, recomendamos realizar este proceso con agua, jabón blanco y esponja suave. Luego secar. Evitar cepillo cerda dura que pueda raspar o lastimar el barniz.

FORMAS DE PAGO➡️ 
•Puedes realizar el pago mediante transferencia bancaria (precio contado efectivo) 
•Tarjetas de crédito/débito recibimos mediante MercadoPago con un recargo del 10% sobre el precio total del producto. 

ENVÍOS PRODUCTOS▶️ Tenemos 2 tipos de envíos: 
-Entrega a domicilio
-Retiro en sucursal de encomienda 

Realizamos envíos a todo el país vía encomienda, las empresas encargadas de llevar nuestros paquetes son Andreani, Vía Cargo, Md Cargas o Correo Argentino dependiendo la ubicación del cliente. El producto se envía embalado en su caja con todos los datos del cliente en la parte superior. 

POLÍTICA DE COMPRA▶️ Por favor tenga en cuenta que todos los pedidos se procesan en el orden en que se reciben. Poseemos una demora de 14 días hábiles desde que se realiza la compra para que su pedido esté fabricado. Luego se despachan vía encomienda en las próximas 72hs con destino al cliente. FMF Sneakers Argentina realiza todos sus trabajos hechos a mano y únicamente se fabrican a pedido. No se otorgan reembolsos una vez realizada la compra. La compra de este artículo significa que ha leído y comprendido esta política, los cuidados de uso del producto, métodos de pago, métodos de envío y plazos de entrega. 
¡ Gracias por comprar!

⏺CONTACTO 
•E-Mail: fmfsneakers@gmail.com 
•Instagram: @fmfsneakers
•Facebook: FMF Sneakers 
•Twitter: @fmfsneakers

*/