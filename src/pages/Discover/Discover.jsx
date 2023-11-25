import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Discover.module.css';
import noise from '../../assets/noise.jpg';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/Content/Content';
import { Genres } from '../../components/Genres/Genres';
import { setMovies } from '../../redux/reducers/movies';
import { discoverMovies } from '../../services/movies.service';

export const DiscoverPage = () => {
  const [activeGenre, setActiveGenre] = useState(-1);
  const [activeMovie, setActiveMovie] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDiscoverMovies = useCallback(async () => {
    try {
      const { movies } = await discoverMovies(activeGenre);

      dispatch(setMovies(movies));
      setActiveMovie(movies[0]);
    } catch (error) {
      console.log(error);
    }
  }, [activeGenre, dispatch, setActiveMovie]);

  useEffect(() => {
    if (activeGenre !== -1) {
      handleDiscoverMovies();
    }
  }, [activeGenre, handleDiscoverMovies]);

  const Buttons = () => {
    return (
      <>
        <Button text='Details' type='filled' onClick={() => navigate(`/details/${activeMovie.id}`)} />
        <Button text='Refresh list' type='outlined' onClick={() => handleDiscoverMovies()} />
      </>
    );
  };

  const handleActiveGenre = useCallback((genre) => {
    setActiveGenre(genre);
  }, []);

  return (
    <main className='main'>
      <div
        className='hero'
        style={{
          backgroundImage: `url(${
            activeMovie.backdrop_path ? `https://image.tmdb.org/t/p/original/${activeMovie.backdrop_path}` : noise
          })`,
        }}>
        <div className='hero-column'>
          <Genres handleActiveGenre={handleActiveGenre} />
          <div className={styles['scroll-container']}>
            <Content buttons={<Buttons />} heading={activeMovie.title} subHeading={activeMovie.overview} />
          </div>
        </div>
        <div className='hero-column' />
      </div>
    </main>
  );
};
