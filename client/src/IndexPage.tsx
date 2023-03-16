import React from 'react';
import {Link} from "react-router-dom";

import {useAppSelector} from "./app/hooks";
import {selectUser} from "./slices/UserSlice";

import styles from './IndexPage.module.css';

function IndexPage() {
  const loggedInUser = useAppSelector(selectUser);

  return (
    <div className={styles.Container}>
      <ul>
        {loggedInUser && <li><Link to={'/pantryItems'}>My Pantry</Link></li>}
        <li><Link to={'/foodIngredients'}>Ingredients</Link></li>
      </ul>
    </div>
  )
}

export default IndexPage;
