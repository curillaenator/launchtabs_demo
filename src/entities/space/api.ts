import { doc, getDoc, collection, addDoc, updateDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';
import { keys } from 'lodash';

import type { LaunchSpaceProps } from './interfaces';

const updateLastViewedSpace = async (uid: string, lastViewedSpace: string) => {
  await updateDoc(doc(fsdb, 'users', uid), { lastViewedSpace });
};

interface UpdateSpaceQueryPayload {
  name: string;
  updatedBy: string;
}

const updateSpaceQuery = async (spaceCode: string, payload: UpdateSpaceQueryPayload) => {
  await updateDoc(doc(fsdb, 'spaces', spaceCode), {
    name: payload.name,
    updatedBy: payload.updatedBy,
    updatedAt: Date.now(),
  });
  return spaceCode;
};

interface DeleteSpaceQueryPayload {
  uid: string | null;
  spaces?: string[] | null;
}

const deleteSpaceQuery = async (space: LaunchSpaceProps, payload: DeleteSpaceQueryPayload) => {
  const { spaceCode, hierarchy } = space;
  const { uid, spaces: userSpaces = [] } = payload;

  const batch = writeBatch(fsdb);

  keys(hierarchy).forEach((unitCode) => {
    const unitDbRef = doc(fsdb, 'units', unitCode);
    const noteDbRef = doc(fsdb, 'notes', unitCode);

    batch.delete(unitDbRef);
    batch.delete(noteDbRef);
  });

  const spaceDbRef = doc(fsdb, 'spaces', spaceCode);
  batch.delete(spaceDbRef);

  await batch.commit();

  await updateDoc(doc(fsdb, 'users', uid!), {
    spaces: userSpaces?.filter((spCode) => spCode !== space.spaceCode) || [],
  });

  return {
    deletedSpaceCode: spaceCode,
    deletedUnitsCodes: keys(hierarchy),
  };
};

const createSpaceQuery = async (uid: string, spaceFormData: LaunchSpaceProps) => {
  const { name } = spaceFormData;

  const space: Omit<LaunchSpaceProps, 'spaceCode'> = { name, createdAt: Date.now(), createdBy: uid };

  const docRef = await addDoc(collection(fsdb, 'spaces'), space);

  await updateDoc(doc(fsdb, 'users', uid), { spaces: arrayUnion(docRef.id), lastViewedSpace: docRef.id });

  return { createdSpaceCode: docRef.id };
};

const getUserSpacesQuery = async (spaceIds: string[]) => {
  const userSpacesDto = await Promise.all(spaceIds.map((spaceId) => getDoc(doc(fsdb, 'spaces', spaceId))));

  const userSpaces = await Promise.all(
    userSpacesDto.map((spaceSnap) => {
      if (!spaceSnap.exists()) return null;
      return { ...spaceSnap.data(), spaceCode: spaceSnap.id };
    }),
  ).then((resolved) => resolved.filter(Boolean) as LaunchSpaceProps[]);

  return userSpaces;
};

export { getUserSpacesQuery, createSpaceQuery, updateLastViewedSpace, updateSpaceQuery, deleteSpaceQuery };
