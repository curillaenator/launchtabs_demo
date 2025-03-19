import type { PhotosWithTotalResults } from 'pexels';
import { createStore, createEvent } from 'effector';

import { PEXELS_INITIAL_STATE } from './constants';

interface PexelsStore {
  pexelsQuery: string;
  pexelsLoading: boolean;
  pexels: PhotosWithTotalResults;
}

const setPexels = createEvent<PhotosWithTotalResults>();
const setPexelsQuery = createEvent<string>();
const setPexelsLoading = createEvent<boolean>();

const $pexelsStore = createStore<PexelsStore>({
  pexelsQuery: '',
  pexelsLoading: false,
  pexels: PEXELS_INITIAL_STATE,
});

$pexelsStore
  .on(setPexels, (prevState, pexels) => ({ ...prevState, pexels }))
  .on(setPexelsQuery, (prevState, pexelsQuery) => ({ ...prevState, pexelsQuery }))
  .on(setPexelsLoading, (prevState, pexelsLoading) => ({ ...prevState, pexelsLoading }));

export { $pexelsStore, setPexels, setPexelsQuery, setPexelsLoading };
