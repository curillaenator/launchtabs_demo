import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@src/api';
import { setUser } from '@src/entities/user';

const useAuthState = () => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    sessionStorage.clear();
    setAppLoading(true);

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAppLoading(false);
        return;
      }

      setUser({ uid: user.uid, username: user.displayName, email: user.email, avatar: user.photoURL });
      setAppLoading(false);
    });

    return () => unsubAuth();
  }, []);

  return { appLoading };
};

export { useAuthState };
