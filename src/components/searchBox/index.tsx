import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles.module.scss';

export function SearchBox() {
    const [searchOption, setSearchOptions] = useState('cidade')

    function handleSelectedOption(event: ChangeEvent<HTMLSelectElement>) {
      event.preventDefault;
      setSearchOptions(event.target.value)
      console.log(event.target.value)
    }
    return (
        <div className={styles.container}>
          <div className={styles.searchBox}>
            <div>
              <select className={styles.searchOptions} onChange={e => handleSelectedOption(e)} title="Selecione entre cidade e coordenadas para saber a temperatura">
                <option value="cidade">Cidade</option>
                <option value="coordernadas">Coordenadas</option>
              </select>
            </div>
            {searchOption == 'cidade' ? (
              <div className={styles.searchBarCity}>
                <input type="text" placeholder="Digite o nome da cidade" />
              </div>
            ) : (
              <div className={styles.searchBarCoor}>
                <input type="text" placeholder="Digite a latitude" />
                <input type="text" placeholder="Digite a longitude" />
              </div>  
            )}
          </div>
          <div>
              <button className={styles.search}>
                Pesquisar
              </button>
          </div>
        </div>
    )
}