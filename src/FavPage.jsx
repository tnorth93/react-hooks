import React from 'react';
import { Store } from './Store';

const EpisodesList = React.lazy(() => import('./EpisodesList'));

export default function FavPage() {
    const
   { state, dispatch } = React.useContext(Store);
   
   const props = {
      
  episodes: state.favourites,
      
  toggleFavAction: toggleFavAction,
      
  favourites: state.favourites
    
  };

  return (
    <React.Suspense 
fallback={<div>Loading...</div>}>
      <div 
className='episode-layout'>
        <EpisodesList {...props} />
      </div>
    </React.Suspense>
  );
}