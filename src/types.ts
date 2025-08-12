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