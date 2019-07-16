import React from 'react';
import { Store } from './Store';

export default function App() {
  const { state, dispatch } = React.useContext(Store);
  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  const fetchDataAction = episode => {
  dispatch({
    type: 'ADD_FAV',
    payload: episode
  });
}
  

  React.useEffect(() => {
    state.episodes.length === 0 &&
    fetchDataAction();
  });
  return (
    <React.Fragment>
      {console.log(state)}
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favourite episodes</p>
        </div>
        <div>
          Favorites {state.favorites.length}
        </div>
      </header>
    
        <section className='episode-layout'>
          {state.episodes.map(episode => {
            return (
              <section className='episode-box' key={episode.id}>
                <img
                  src={!!episode.image ? episode.image.medium : ''}
                  alt={`Rick and Morty ${episode.name}`}
                />
                <div>{episode.name}</div>
                <section>
                  <div>
                    Season: {episode.season} Number: {episode.number}
                  </div>
                  <button type='button' onClick={ () => toggleFavAction(episode)}>
                    favourite
                  </button>
                </section>
              </section>
            );
          })}
        </section>
    </React.Fragment>
  );
}