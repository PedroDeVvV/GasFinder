import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./InfoPosto.module.css";
import { BiSolidMap, BiSolidPencil } from "react-icons/bi";

function InfoPosto(props) {
  const [exibirPrecosANP, setExibirPrecosANP] = useState(true);

  const precos = {
    Etanol: 4.39,
    GasolinaC: 3.39,
    GasolinaADT: 5.39,
    DieselS10: 3.39,
    DieselS5: 6.39,
    GNV: 3.39,
  };

  const precosSugestao = {
    Etanol: 3.50,
    GasolinaC: 3.55,
    GasolinaADT: 3.60,
    DieselS10: 3.45,
    DieselS5: 3.40,
    GNV: 3.30,
  };

  const enderecoPosto = "Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000";

  const handleSwitchChange = () => {
    setExibirPrecosANP(!exibirPrecosANP);
  };

  const PrecoCard = ({ titulo, preco }) => (
    <div className={styles.cardPreco}>
      <div className={`${styles.title} ${styles[titleToStyleMap[titulo]]}`}>
        <h3>{titulo}</h3>
      </div>
      <div className={styles.preco}>
        <h2>R$ {preco.toFixed(2)}</h2>
      </div>
    </div>
  );

  const titleToStyleMap = {
    Etanol: "titleEtanol",
    GasolinaC: "titleGasolinaC",
    GasolinaADT: "titleGasolinaADT",
    DieselS10: "titleDieselS10",
    DieselS5: "titleDieselS5",
    GNV: "titleGNV",
  };

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.infoContainer}>
        <div className={styles.DadosPosto}>
          <h2>{props.nomePosto}Posto Cancun</h2>
          <div className={styles.endereco}>
            <BiSolidMap className={styles.iconePonteiro} />
            <h3>{props.enderecoPosto}Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000</h3>
          </div>
        </div>
        <div className={styles.containerSecundario}>
          <div className={styles.avaliacaoContainer}>
            <h2>{props.avaliacaoGeral}4.3</h2>
            <div className={styles.estrelas}>☆☆☆☆☆</div>
            <div className={styles.cardAvaliacao}>
              <h4>Atendimento</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
            <div className={styles.cardAvaliacao}>
              <h4>Qualidade Combustível</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
            <div className={styles.cardAvaliacao}>
              <h4>Custo Benefício</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
          </div>

          <div className={styles.mainContainerPrecos}>
            <div className={styles.precosContainer}>
              <div className={styles.switchPrice}>
                <h3>Tabela ANP</h3>
                <div className={styles.boxSwitch}>
                  <label className={styles.switch}>
                    <input type="checkbox" onChange={handleSwitchChange} checked={exibirPrecosANP} />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <h3>Média de sugestões</h3>
              </div>
              <PrecoCard titulo="Etanol" preco={exibirPrecosANP ? precos.Etanol : precosSugestao.Etanol} />
              <PrecoCard titulo="GasolinaC" preco={exibirPrecosANP ? precos.GasolinaC : precosSugestao.GasolinaC} />
              <PrecoCard titulo="GasolinaADT" preco={exibirPrecosANP ? precos.GasolinaADT : precosSugestao.GasolinaADT} />
              <PrecoCard titulo="DieselS10" preco={exibirPrecosANP ? precos.DieselS10 : precosSugestao.DieselS10} />
              <PrecoCard titulo="DieselS5" preco={exibirPrecosANP ? precos.DieselS5 : precosSugestao.DieselS5} />
              <PrecoCard titulo="GNV" preco={exibirPrecosANP ? precos.GNV : precosSugestao.GNV} />
            </div>

            <div className={styles.divSugerirPreco}>
              <h3>Sugerir Preço</h3>
              <BiSolidPencil className={styles.pencil} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPosto;
