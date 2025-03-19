import { useState, useEffect, useCallback } from 'react';
import { checkImageURL, CheckImageURL } from '@src/helpers/helpers';

const fetchLink = 'https://vector-logos-figma-plugin-api.vercel.app/api/search?query=';

interface IconsResponse {
  [title: string]: string;
}

export const useCustomIcons = (title: string) => {
  const [iconsResponse, setIconsResponce] = useState<IconsResponse[]>([]);
  const [icons, setIcons] = useState<CheckImageURL[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchIcons = useCallback(() => {
    if (!title.trim()) {
      setIcons([]);
      return;
    }

    setIsFetching(true);

    fetch(`${fetchLink}${title}`, {
      method: 'GET',
      credentials: 'omit', // omit, same-origin или include
      mode: 'cors', // mode: 'cors' | 'same-origin' | 'no-cors'
    })
      .then((res) => res.json())
      .then((json) => setIconsResponce(json.results))
      .catch(() => {
        setIconsResponce([]);
        setIsFetching(false);
      });
  }, [title]);

  useEffect(() => {
    if (!iconsResponse.length) return;

    const urlsCheck = iconsResponse.map((icon) => checkImageURL(icon.url));

    Promise.all(urlsCheck)
      .then((res) => {
        const goodLinks = res.length ? res.filter((resItem) => resItem.ok) : [];
        setIcons(!!goodLinks.length ? goodLinks : []);
      })
      .finally(() => setIsFetching(false));
  }, [iconsResponse]);

  return {
    isFetching,
    iconsWithGoodLinks: icons,
    fetchIcons,
  };
};
