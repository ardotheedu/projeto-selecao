import React from 'react';
import {TracksListDataSaved} from '../components/ListTracks'

import styles from '../styles/pages/homepage.module.scss';

const Salvos = () => {
  const recomendacoes = localStorage.getItem("recomendacoes");
  if (recomendacoes) {
    const recomendacoesArray: TracksListDataSaved[] = JSON.parse(recomendacoes);
    console.log(recomendacoesArray);
    console.log(recomendacoes);
    return (
      <div>
        {recomendacoesArray.map(recomendacao => (
          recomendacao.tracks.map(track => (
            <p>{track.name}</p>
          ))
        ))}
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <h1>Não há recomendações para mostrar</h1>
      </div>
    );
  }

}

export default Salvos
