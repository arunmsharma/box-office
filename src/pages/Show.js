import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, show: action.show, error: null };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(e => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: e.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(show);

  if (isLoading) {
    return <div>Data is being loaded.</div>;
  }

  if (error) {
    return <div>Error occured : {error}</div>;
  }

  return <div>this is show page.</div>;
};

export default Show;
