import React, { useState } from "react";
import AddMenu from "./AddMenu";
import ModifyMenu from "./ModifyMenu";

const Menu = props => {
  const { handleClick, api, rolActivo } = props;
  const [carga, setCarga] = useState(true);
  const [perros, setPerros] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  if (carga) {
    if (perros.length === 0) {
      api.getHotDogs(res => {
        setPerros(res);
      });
    }
    if (bebidas.length === 0) {
      api.getDrinks(res => {
        setBebidas(res);
      });
    }
    setCarga(false);
  }

  return (
    <div className="Menu">
      <h1 className="title-menu">Facturacion</h1>
      {rolActivo === "administrador" ? <AddMenu api={api} /> : null}
      {//console.log(perros)
      rolActivo === "administrador" ? <ModifyMenu api={api} /> : null}
      <h1 className="subtitle-menu">Perros</h1>
      <div className="container-menu">
        {perros.map((perro, i) => {
          return (
            <div className="container-platillo" key={i} onClick={() => handleClick(perro, 1)}>
              {
                //console.log(perro)
              }
              {perro.foto ? (
                <div className="image-menu" style={{ backgroundImage: `url(${perro.foto})` }} />
              ) : (
                <div className="image-menu" style={{ backgroundColor: "rgb(113, 13, 14)" }} />
              )}
              <div className="overlay-menu" />
              <div className="label-platillo">{perro.name}</div>
            </div>
          );
        })}
      </div>
      <h1 className="subtitle-menu">Bebidas</h1>
      <div className="container-menu">
        {bebidas.map((bebida, i) => {
          return (
            <div className="container-platillo" key={i} onClick={() => handleClick(bebida, 2)}>
              {bebida.foto ? (
                <div className="image-menu" style={{ backgroundImage: `url(${bebida.foto})` }} />
              ) : (
                <div className="image-menu" style={{ backgroundColor: "rgb(209, 145, 50)" }} />
              )}
              <div className="overlay-menu" />
              <div className="label-platillo">{bebida.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
