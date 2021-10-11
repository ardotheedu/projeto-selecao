import React from 'react';
import { SearchBox } from '../components/searchBox';
import styles from '../styles/pages/homepage.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <SearchBox />
    </div>
  )
}

export default Home
