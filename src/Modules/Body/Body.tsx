import { LaunchCard  } from '../../Components/LaunchCard/LaunchCard'
import { fetchLaunches2020 } from '../../API/launchesList';
import { ModalWindow } from '../../Components/Modal/Modal';
import { useEffect, useReducer, useCallback, useRef } from 'react';
import type { Launch, State, Action} from '../../types';
import { Container } from '@mantine/core';
import './Body.scss'

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
  const bodyRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    fetchLaunches2020().then((launches) =>
      dispatch({ type: 'SET_LAUNCHES', payload: launches })
    );
  }, []);

  const openModal = useCallback((launch: Launch) => {
    dispatch({ type: 'OPEN_MODAL', payload: launch });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  return (
    <>
    <div id='bodyContainer' ref={bodyRef}>
    <h1>SpaceX Launches 2020</h1>
    <Container className='grid'>
        {state.launches.map((launch) => (
          <LaunchCard
          key={launch.mission_name}
          launch={launch}
          onSeeMore={openModal}/>
        ))}
    </Container>
    </div>
    {state.selectedLaunch && (
      <ModalWindow launch={state.selectedLaunch} opened={state.isModalOpen} onClose={closeModal} targetRef={bodyRef}/>
    )}
    </>
  );
}
