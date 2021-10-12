import React from 'react';
import { ListTracks } from '../components/ListTracks';
import { SearchBox } from '../components/searchBox';
import styles from '../styles/pages/homepage.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <SearchBox />
      <ListTracks />
    </div>
  )
}

export default Home
