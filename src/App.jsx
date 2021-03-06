import React from 'react';
import { Store } from './Store';
import { Link } from '@reach/router';

export default function App(props) {
  const { state } = React.useContext(Store);

  return (
    <React.Fragment>
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favorite episodes</p>
        </div>
        <div>
          <Link to='/'>Home</Link>{' '}
          <Link to='/faves'>Favorite(s) {state.favorites.length}</Link>
        </div>
      </header>
      {props.children}
    </React.Fragment>
  );
}