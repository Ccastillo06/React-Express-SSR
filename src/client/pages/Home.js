import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { loadCharacters, selectError, selectIsLoaded } from '../store/namespaces/characters';

import CardList from '../components/CardList';
import CharacterFilter from '../components/CharacterFilter';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoaded = useSelector(selectIsLoaded);
  const error = useSelector(selectError);

  useEffect(() => {
    const { gender, name } = qs.parse(location.search.replace('?', ''));
    dispatch(loadCharacters({ gender, name }));
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('There was an error loading the characters', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [error]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <CharacterFilter />
          <CardList />
        </div>
      ) : (
        <div className="mt-2 ">
          <Loader type="Puff" color="#1B998B" height={100} width={100} timeout={3000} />
        </div>
      )}
    </div>
  );
};

export default Home;
