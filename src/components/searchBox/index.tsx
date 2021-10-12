import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';   
import { AuthContext } from '../../context/tracksContext';


export function SearchBox() {
    const [searchOption, setSearchOptions] = useState('cidade')
    const [city, setCity] = useState('')

    const {getTracks} = useContext(AuthContext)

    function handleSelectedOption(event: ChangeEvent<HTMLSelectElement>) {
      event.preventDefault;
      setSearchOptions(event.target.value)
    }

    async function handleSearchWeather() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WHEATER_KEY}`, {
        params: {
          units: 'metric'
        }
      })
      console.log(response.data)

      await getTracks()

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
              <div className={styles.searchBar}>
                <input type="text" placeholder="Digite o nome da cidade" value={city} onChange={e => setCity(e.target.value)}/>
              </div>
            ) : (
              <div className={styles.searchBar}>
                <input type="text" placeholder="Digite a latitude" />
                <input type="text" placeholder="Digite a longitude" />
              </div>  
            )}
          </div>
          <div>
              <button className={styles.search} onClick={handleSearchWeather}>
                Pesquisar
              </button>
          </div>
        </div>
    )
}