import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';   
import { AuthContext } from '../../context/tracksContext';

export function ListTracks() {

    const {data} = useContext(AuthContext)
    data?.tracks.map(track => {
        console.log(track.name)
    })
    async function handleSearchWeather() {

    }

    return (
        <div>
          {data?.tracks.map(track => (
              <p>{track.name}</p>
          ))}
        </div>
    )
}