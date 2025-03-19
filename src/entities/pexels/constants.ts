import type { PhotosWithTotalResults } from 'pexels';

const PEXELS_INITIAL_STATE: PhotosWithTotalResults = {
  total_results: 0,
  page: 1,
  per_page: 8,
  photos: [],
  next_page: 2,
};

export { PEXELS_INITIAL_STATE };
