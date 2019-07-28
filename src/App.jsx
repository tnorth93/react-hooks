import React from 'react';
import { Store } from './Store';
import { statements } from '@babel/template';
import { Link } from '@reach/router';

const EpisodesList = React.lazy(() => import('./EpisodesList'));

export default function App() {
  const { state, dispatch } = React.useContext(Store);
  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };p

// const fetchDataAction = episode =>
//   dispatch({
//     type: 'ADD_FAV',
//     payload: episode
//   });

  
const toggleFavAction = episode => {
  const episodeInFavorites = state.favorites.includes(episode);
  let dispatchObj = {
    type: 'ADD_FAV',
    payload: episode
  };
  if (episodeInFavorites) {
    const favoritesWithoutEpisode = state.favorites.filter(fav => fav.id !== episode.id)
    dispatchObj = {
      type: 'REMOVE_FAV',
      payload: favoritesWithoutEpisode
    };
  }
  return dispatch(dispatchObj);
}

  React.useEffect(() => {
    state.episodes.length === 0 &&
    fetchDataAction();
  });

  const props = {

    episodes: state.episodes,

    toggleFavAction: toggleFavAction,

    favorites: statements.favorites
  };
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}
        <header className='header'>
          <div>
            <h1>Rick and Morty</h1>
            <p>Pick your favourite episodes</p>
          </div>
          <div>
            <Link 
          to='/'>Home</Link>{' '}
            <Link 
          to='/faves'>Favourite(s) {state.favourites.length}</Link>
          </div>
        </header>
      
          <section className='episode-layout'>
            <EpisodesList {...props} />
          </section>
        </React.Suspense>
    </React.Fragment>
  );
}