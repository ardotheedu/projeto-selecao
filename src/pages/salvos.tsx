import React, { useEffect, useState } from 'react';
import {TracksListDataSaved} from '../components/ListTracks'

import styles from '../styles/pages/salvos.module.scss';
import {FiTrash} from 'react-icons/fi'

const Salvos = () => {
  const [savedTracks, setSavedTracks] = useState<TracksListDataSaved[]>([]);

  useEffect(() => {
    const recomendacoes = localStorage.getItem("recomendacoes");

    if (recomendacoes) {
      const recomendacoesArray: TracksListDataSaved[] = JSON.parse(recomendacoes);
      setSavedTracks(recomendacoesArray);
    }
     
  }, [])
  
  if (savedTracks.length === 0) {
    return (
      <div className={`${styles.container} ${styles.none}`}>
        <h1>Não há recomendações salvas</h1>
      </div>
    )
  }

  const deleteRecomendacao = (id: string) => {
    const newRecomendacoes = savedTracks.filter(recomendacao => recomendacao.id !== id);        
    setSavedTracks(newRecomendacoes);
    localStorage.setItem("recomendacoes", JSON.stringify(newRecomendacoes));
  }

  return (
    <div className={styles.container}>
      {savedTracks.map(recomendacao => (
        <div className={styles.content} key={recomendacao.id}>
          <div className={styles.header}>  
            <p><strong>{recomendacao.savedAt}</strong></p>
            <button>
              <FiTrash onClick={() => deleteRecomendacao(recomendacao.id)} size={20} />
            </button>
          </div>
        {recomendacao.tracks.map(track => (
          <p>{track.name}</p>
        ))}
        </div>
      ))}
    </div>
  )

}

export default Salvos
