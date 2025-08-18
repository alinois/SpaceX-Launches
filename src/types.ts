export interface Launch {
    mission_name: string;
    details: string | null;
    rocket?: {
    rocket_name: string;
  };
    links?: {
    mission_patch: string;
    mission_patch_small: string;
  };
}

export type State = {
  launches: Launch[];
  selectedLaunch: Launch | null;
  isModalOpen: boolean;
};

export type Action =
  | { type: 'SET_LAUNCHES'; payload: Launch[] }
  | { type: 'OPEN_MODAL'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

export const initialState: State = {
  launches: [],
  selectedLaunch: null,
  isModalOpen: false,
};