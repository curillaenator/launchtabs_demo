import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setSignIn } from '@src/entities/app';

const useAppDemo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDemo, setIsDemo] = useState<boolean>(false);

  const onCancelAppDemo = useCallback(() => {
    setIsDemo(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('auth') !== 'demo') return;

    setIsDemo(true);
    setSignIn(true);
    navigate(location.pathname, { replace: true });
  }, [location, navigate]);

  return { isDemo, onCancelAppDemo };
};

export { useAppDemo };
