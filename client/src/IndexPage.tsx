import React from 'react';
import {Link} from "react-router-dom";

import styles from './IndexPage.module.css';

function IndexPage() {
  return (
    <div className={styles.Container}>
      <ul>
        <li><Link to={'/foodIngredients'}>Ingredients</Link></li>
      </ul>
    </div>
  )
}

export default IndexPage;
