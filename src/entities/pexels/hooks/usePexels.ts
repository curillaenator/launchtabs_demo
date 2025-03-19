import { useEffect, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { createClient, type PhotosWithTotalResults } from 'pexels';

import { $pexelsStore, setPexels, setPexelsLoading } from '../store';

const pexelsClient = process.env.PEXELS_API_KEY ? createClient(process.env.PEXELS_API_KEY) : null;

const usePexels = () => {
  const { pexels, pexelsLoading, pexelsQuery } = useEffectorUnit($pexelsStore);

  const pexelsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pexelsQuery || !pexelsClient) {
      setPexelsLoading(false);
      return;
    }

    if (pexelsTimer.current) clearTimeout(pexelsTimer.current);

    pexelsTimer.current = setTimeout(() => {
      setPexelsLoading(true);

      pexelsClient.photos
        .search({ query: pexelsQuery, per_page: 50, page: 1 })
        .then((res) => {
          setPexels(res as PhotosWithTotalResults);
        })
        .catch(() => {
          alert('Image service unfurtunatelly failed =(');
        })
        .finally(() => {
          setPexelsLoading(false);
        });
    }, 5000);
  }, [pexelsQuery]);

  return {
    data: pexels,
    isLoading: pexelsLoading,
    queryString: pexelsQuery,
  };
};

export { usePexels };
