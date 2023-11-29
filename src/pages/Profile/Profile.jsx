import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.css';
import { Content } from '../../components/Content/Content';
import { setMovies } from '../../redux/reducers/watchlist';
import { getMovie } from '../../services/movies.service';
import { handleWatchlist } from '../../tools';

export const ProfilePage = () => {
  const { movies, watchlist } = useSelector((state) => state.watchlist);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await handleWatchlist();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Extract IDs from watchlist that do not exist in movies to avoid redundant requests
        const noMovies = watchlist.filter((id) => !movies.some((movie) => movie.id === id));

        if (noMovies.length) {
          const updatedMovies = [...movies];

          for (let i = 0; i < noMovies.length; i++) {
            const { movie } = await getMovie(noMovies[i]);

            updatedMovies.push(movie);
          }

          dispatch(setMovies(updatedMovies));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, movies, watchlist]);

  return (
    <main className='main'>
      <div className='hero'>
        <div className='hero-column'>
          <div className={styles['scroll-container']}>
            <Content buttons={<></>} heading='@nadya' subHeading='' />
          </div>
        </div>
        <div className='hero-column'>
          {movies.map((movie, i) => (
            <div key={movie.id}>{`(${i}) ${movie.title}`}</div>
          ))}
        </div>
      </div>
    </main>
  );
};