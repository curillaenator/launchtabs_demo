import { useEffect, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { createClient, type PhotosWithTotalResults } from 'pexels';

import { $pexelsStore, setPexels, setPexelsLoading } from '@src/entities/pexels';

const client = createClient('C4n9S5rIWDpuE2YVHwTmyZy7CMuHjehR6lsquBxJq2NTIoIatAWR5AT5');

const usePexels = () => {
  const { pexels, pexelsLoading, pexelsQuery } = useEffectorUnit($pexelsStore);

  const pexelsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pexelsQuery) {
      setPexelsLoading(false);
      return;
    }

    if (pexelsTimer.current) clearTimeout(pexelsTimer.current);

    pexelsTimer.current = setTimeout(() => {
      setPexelsLoading(true);

      client.photos
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
