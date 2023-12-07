import "./CardPosto.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";
import api from "../../api";
import { BiMapPin, BiSolidMap } from "react-icons/bi";
import "./CardPosto.css";
import { useFavoriteContext } from "../../context/Favorites";

const CardPosto = (props) => {
  // console.log('props', props)
  const { idPosto } = props;
  const estiloGasolina = {
    backgroundColor: "#F8333C",
    borderTopRightRadius: "12px",
  };
  const estiloEtanol = {
    backgroundColor: "#44AF69",
  };
  const estiloDiesel = {
    backgroundColor: "#FCAB10",
  };

  const [iconType, setIconType] = useState("outline");

  const handleIconToggle = () => {
    setIconType(iconType === "outline" ? "filled" : "outline");
  };

  const navigate = useNavigate();

  const data = {
    latitude: -23.644313612253786,
    longitude: -46.89789512355279,
  };

  const { favorite, addFavorite } = useFavoriteContext();
  const isFavorite = favorite.some((fav) => fav.id === props.id);
  const icone = !isFavorite ? AiOutlineStar : AiFillStar;
  const [active, setActive] = useState(false);

  // const { favorite, addFavorite } = useFavoriteContext()
  /*const isFavorite = favorite.some((fav) => fav.id === id)*/
  /*const icone = !isFavorite ? AiOutlineStar : AiFillStar*/
  async function favoriteGss(idPosto) {
    if (!active) {
      const jwt = localStorage.getItem("token");
      const data = {
        idPosto,
      };

      try {
        const response = await api.post("/favorite", data, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        setActive(true);
        console.log("Posto favoritado com sucesso:", response.data);
      } catch (err) {
        console.log("Não foi possivel favoritar posto: ", err);
      }
    } else {
      const jwt = localStorage.getItem("token");
      const data = {
        idPosto,
      };
      console.log(jwt);
      try {
        const response = await api.delete("/favorite", data, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        setActive(false);
        console.log("Posto excluído dos favoritos com sucesso:", response.data);
      } catch (err) {
        console.log("Não foi possivel excluir posto: ", err);
      }
    }
  }

  return (
    <div className="div-ajuste">
      <div className="main-container-cardPosto">
        <div className="container-dados-posto">
          <div className="container-bandeira-e-distancia">
            <div className="div-bandeira">
              <img src={props.url} alt="Bandeira do posto" />
              <h3>{props.nomePosto}</h3>
            </div>
            <div className="div-distancia">
              <BiSolidMap size={28} color="#F8333C" />
              <p>{props.endereco}</p>
            </div>
            <div className="div-distancia">
              <BiMapPin size={28} color="#467BEC" />
              <p className="paragraphDistance">A {props.distancia}</p>
            </div>
            <div className="div-favoritar-posto">
              <i
                onClick={() => {
                  // handleIconToggle();
                  // addFavorite({ id: props.id });
                  favoriteGss(idPosto);
                }}
                className="icon-favoritar-posto"
              >
                {!active ? <AiOutlineStar /> : <AiFillStar />}
              </i>
              <p>Favoritar posto</p>
            </div>
          </div>
          <div className="container-valores-postos">
            <div style={estiloGasolina} className="div-combustiveis">
              <h3>G</h3>
              <p>R$ {props.precoGasolina}</p>
            </div>
            <div style={estiloEtanol} className="div-combustiveis">
              <h3>E</h3>
              <p>R$ {props.precoEtanol}</p>
            </div>
            <div style={estiloDiesel} className="div-combustiveis">
              <h3>D</h3>
              <p>R$ {props.precoDiesel}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="maisInfo-container"
        onClick={() => navigate("/infoPosto/" + idPosto)}
      >
        <AiOutlineInfoCircle className="icon-info-posto" />
        Mais Informações
      </div>
    </div>
  );
};

export default CardPosto;

/*PropsUtilizaveis =
props.nomePosto = Adiciona o nome do posto
props.url = adicionar url da imagem da bandeira
props.endereco = adicionar endereço
props.distancia = adicionar valor da distancia do posto 
props.precoGasolina / props.precoEtanol / props.precoDiesel  = adicionar valor do preço do tipo do combustivel 
*/

/*no id, precisa passar o id do posto para que o card add seja unico e não se repita*/
