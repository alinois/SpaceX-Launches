import { LaunchCard  } from '../Components/LaunchCard/LaunchCard'
import { fetchLaunches2020 } from '../../../API/launchesList';
import { ModalWindow } from '../Components/Modal/Modal';
import { useEffect, useReducer } from 'react';
import type { Launch } from '../../../types';
import { Container } from '@mantine/core';
import './Body.scss'


type State = {
  launches: Launch[];
  selectedLaunch: Launch | null;
  isModalOpen: boolean;
};

type Action =
  | { type: 'SET_LAUNCHES'; payload: Launch[] }
  | { type: 'OPEN_MODAL'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

const initialState: State = {
  launches: [],
  selectedLaunch: null,
  isModalOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload };
    case 'OPEN_MODAL':
      return {
        ...state,
        selectedLaunch: action.payload,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedLaunch: null,
        isModalOpen: false,
      };
    default:
      return state;
  }
}

export const Body = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    fetchLaunches2020().then((launches) =>
      dispatch({ type: 'SET_LAUNCHES', payload: launches })
    );
  }, []);

  const openModal = (launch: Launch) => {
    dispatch({ type: 'OPEN_MODAL', payload: launch });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
    <h1>SpaceX Launches 2020</h1>
    <Container className='grid'>
        {state.launches.map((launch) => (
          <LaunchCard
          key={launch.mission_name}
          launch={launch}
          onSeeMore={() => openModal(launch)}/>
        ))}
    </Container>
    {state.selectedLaunch && (
      <ModalWindow launch={state.selectedLaunch} opened={state.isModalOpen} onClose={closeModal} />
    )}
    </>
  );
}
