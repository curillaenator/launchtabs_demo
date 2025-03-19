import { doc, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';
import { omit, keys, mapValues } from 'lodash';

import type { LaunchUnitProps } from './interfaces';
import type { LaunchSpaceProps } from '../space';

interface DeleteNoteMutationQueryPayload {
  unit: LaunchUnitProps;
  currentSpace: LaunchSpaceProps | null;
}

const deleteNoteMutationQuery = async (payload: DeleteNoteMutationQueryPayload) => {
  const { unit, currentSpace } = payload;
  const { code: unitCode, path: unitPath, hierarchy: unitHierarchy } = unit;

  const isParentUnit = !!unitPath.length;
  const parentId = isParentUnit ? unitPath[unitPath.length - 1] : currentSpace?.spaceCode || null;
  const dbPath = isParentUnit ? 'units' : 'spaces';

  const { hierarchy: parentHierarchy = {} } = await getDoc(doc(fsdb, dbPath, parentId as string)).then((snap) => {
    if (!snap.exists()) return { hierarchy: {} };
    return snap.data() as { hierarchy: LaunchUnitProps['hierarchy'] };
  });

  const clearedParentHierarchy = mapValues(omit(parentHierarchy, unitCode), (order) =>
    order <= parentHierarchy[unitCode] ? order : order - 1,
  );

  console.log('clearedParentHierarchy', clearedParentHierarchy);

  // перенос детей удаляемого юнита в родителя юнита
  if (!!keys(unitHierarchy).length) {
    await updateDoc(doc(fsdb, dbPath, parentId as string), {
      hierarchy: {
        ...clearedParentHierarchy,
        ...mapValues(unitHierarchy, (order) => order + keys(clearedParentHierarchy).length),
      },
    });
  } else {
    await updateDoc(doc(fsdb, dbPath, parentId as string), { hierarchy: clearedParentHierarchy });
  }

  await deleteDoc(doc(fsdb, 'notes', unitCode));
  await deleteDoc(doc(fsdb, 'units', unitCode));
};

interface CreateNoteMutationQueryPayload {
  uid: string;
  path: string[];
  formData: Partial<LaunchUnitProps> & { noteBody: string };
  parentUnitId: string | null;
  parentSpace: LaunchSpaceProps | null;
  createUnitIdx: number;
}

const createNoteMutationQuery = async (payload: CreateNoteMutationQueryPayload) => {
  const { uid, path, formData, parentSpace, parentUnitId, createUnitIdx } = payload;

  const newUnit: Omit<LaunchUnitProps, 'code'> = {
    path,
    name: formData.name || '',
    createdBy: uid,
    createdAt: Date.now(),
  };

  const createdUnitId = await addDoc(collection(fsdb, 'units'), newUnit).then(async ({ id }) => {
    await setDoc(doc(fsdb, 'notes', id), {
      createdBy: uid,
      createdAt: Date.now(),
      tiptap: formData.noteBody,
    });

    const dbPath = !!parentSpace?.spaceCode ? 'spaces' : 'units';
    const dbEntityId = parentUnitId || parentSpace?.spaceCode;

    if (!dbEntityId) return null;

    await updateDoc(doc(fsdb, dbPath, dbEntityId), {
      [`hierarchy.${id}`]: createUnitIdx,
    });

    return id;
  });

  return { createdUnitId };
};

const getNoteBodyQuery = async (noteId: string) => {
  const bodySnap = await getDoc(doc(fsdb, 'notes', noteId));

  if (!bodySnap.exists()) return null;

  return bodySnap.data()['tiptap'] as string;
};

const getNoteUnitQuery = async (unitId: string) => {
  const unitSnap = await getDoc(doc(fsdb, 'units', unitId));

  if (!unitSnap.exists()) return null;

  return { ...unitSnap.data(), code: unitSnap.id } as LaunchUnitProps;
};

interface UpdateUnitPayload {
  unitName: string;
  locked: boolean;
}

const updateUnitMutation = async (uid: string, unitCode: string, payload: UpdateUnitPayload) => {
  const { unitName, locked = false } = payload;

  await updateDoc(doc(fsdb, 'units', unitCode), {
    name: unitName,
    locked,
    updatedBy: uid,
    updatedAt: Date.now(),
  });

  return { updatedUnitName: unitName };
};

const updateNoteBodyMutation = async (uid: string, noteId: string, noteBody: string) => {
  let response = { routerNoteId: false };

  await updateDoc(doc(fsdb, 'notes', noteId), {
    tiptap: noteBody,
    updatedBy: uid,
    updatedAt: Date.now(),
  }).then(() => (response.routerNoteId = true));

  return response;
};

export {
  getNoteBodyQuery,
  getNoteUnitQuery,
  updateUnitMutation,
  updateNoteBodyMutation,
  createNoteMutationQuery,
  deleteNoteMutationQuery,
  type CreateNoteMutationQueryPayload,
};
