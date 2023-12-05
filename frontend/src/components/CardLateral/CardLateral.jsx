import "./CardLateral.css";
import CardPosto from "../CardPosto/CardPosto";
import { useState, useEffect, useContext } from "react";
import { LocationContext } from "../../context/LocationContext";
import { DistanceContext } from "../../context/DistanceContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import FilterButton from "../FilterButton/FilterButton";
import api from "../../api";
import axios from "axios";

const CardLateral = () => {
  const { distance } = useContext(DistanceContext);

  const [btnState, setBtnState] = useState(false);
  const [loader, setLoader] = useState(false);
  const { location } = useContext(LocationContext);
  // const [data, setData] = useState({});
  let data = {};
  // console.log(location.lat)
  // console.log(location.lat)
  // console.log("Essa é a localização do usuário context: ", location.lng);

  useEffect(() => {
    data = {
      latitude: -23.543617079423655,
      longitude: -46.732223246545004,
      distanceKm: distance
    };

    console.log('localização atual: ',data)
    getPricesGss(data);
  }, [location, distance]);

  const [price, setPrice] = useState([]);

  async function getPricesGss(data) {
    try {
      setLoader(true);
      const response = await api.post("/station/all/", data);
      setPrice(response.data);
      console.log(response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  }

  useEffect(() => {
    // calcularDistancia(origem, destino, chaveAPI)
  }, []);

  async function calculateRoute() {
  
    // eslint-disable-next-line no-undef
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: originRef.current.value,
      // destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    // console.log("resultado", results);
    // setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  const getFlagGss = (flag) => {
    // if(flag == )
  };

  const calcularDistancia = async (origem, destino, chaveAPI) => (
    (await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&key=${chaveAPI}`))
      .data.rows[0].elements[0].distance.text
  );

  const chaveAPI = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const origem = 'ETEC DE EMBU';
  const destino = 'Padaria casa nossa';

  calcularDistancia(origem, destino, chaveAPI)
    .then(distancia => console.log(`Distância: ${distancia}`))
    .catch(error => console.error(error));
  return (
    <section
      className={`main-container-CardLateral ${!btnState ? "" : "ocult"}`}
    >
      <div className="container-janela">
        {/* Aqui começa a janela */}
        <button
          onClick={() => setBtnState(!btnState)}
          className="btnActionCard"
        >
          {!btnState ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </button>
        <div className="containerBtnFiltrar-H2">
          <FilterButton />
          <h2>Postos Próximos</h2>
        </div>
        {loader ? (
          <div className="containerLoaderCard">
            <div class="custom-loader"></div>
          </div>
        ) : (
          <ul>
            {price &&
              price.map((item, i) => (
                <CardPosto
                  key={"cardlateralpost" + i}
                  nomePosto={price[i].nome_posto}
                  endereco={`${price[i].endereco}, ${price[i].numero}.`}
                  url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
                  distancia="100"
                  idPosto={price[i].place_ID}
                  precoGasolina={price[i].produtos[0]?.valor?.toFixed(2)}
                  precoEtanol={price[i].produtos[1]?.valor?.toFixed(2)}
                  precoDiesel={price[i].produtos[2]?.valor?.toFixed(2)}
                />
              ))}
          </ul>
        )}

        {/* <CardPosto
          nomePosto="Shell Brasil"
          endereco = "R. Solano Trindade"
          url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
          distancia="100"
          precoGasolina="5,19"
          precoEtanol="4,05"
          precoDiesel="5,40"
        /> */}
      </div>
    </section>
  );
};

export default CardLateral;
