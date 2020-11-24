import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from 'react-loader-spinner';

import {
  loadCharacterById,
  selectCharacterById,
  selectError,
  selectIsLoaded,
} from '../store/namespaces/characters';

import Card from '../components/Card';

const Character = () => {
  const { id } = useParams();
  // Using local state due to characters module being globally used
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const isStoreLoaded = useSelector(selectIsLoaded);
  const error = useSelector(selectError);
  const character = useSelector(s => selectCharacterById(s, id));

  useEffect(() => {
    dispatch(loadCharacterById(id));
  }, []);

  useEffect(() => {
    if (character && !isLoaded && isStoreLoaded) {
      setIsLoaded(true);
    }
  }, [character, isLoaded, isStoreLoaded]);

  useEffect(() => {
    if (error) {
      toast.error('There was an error loadingn this character data', {
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
        <div className="flex-row-center">
          <Card id={id} noLink isLarge />
        </div>
      ) : (
        <div className="mt-2 ">
          <Loader type="Puff" color="#1B998B" height={100} width={100} timeout={3000} />
        </div>
      )}
    </div>
  );
};

export default Character;
