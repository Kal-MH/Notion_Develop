import { request } from './api.ts';
import { DEFAULT_TITLE, SLASH_DOCUMENTS } from '../utils/constants.ts';

export const getPostAll = async () => {
  try {
    const documentsList = await request(`${SLASH_DOCUMENTS}`);

    return documentsList;
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};

export const getPostOne = async (documentId: number) => {
  try {
    const document = await request(`${SLASH_DOCUMENTS}/${documentId}`);

    return document;
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};

export const postNewPost = async (id: number | null) => {
  try {
    const createNewDocument = await request(`${SLASH_DOCUMENTS}`, {
      method: 'POST',
      body: JSON.stringify({
        title: DEFAULT_TITLE,
        content: '',
        parent: id,
      }),
    });

    return createNewDocument;
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};

export const updatePost = async (
  id: number,
  title?: string,
  content?: string,
) => {
  try {
    await request(`${SLASH_DOCUMENTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
    });
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};

export const deletePost = async (id: number) => {
  try {
    const removedDocument = await request(`${SLASH_DOCUMENTS}/${id}`, {
      method: 'DELETE',
    });

    return removedDocument;
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};
