import {
  deletePost,
  getPostOne,
  postNewPost,
  updatePost,
} from '../api/post.ts';
import { DocumentType } from '../types/document.ts';
import {
  classNameObj,
  EVENT_HEADER_CHANGE,
  EVENT_ROUTE_PUSH,
  EVENT_ROUTE_CREATE,
  EVENT_ROUTE_PUT,
  EVENT_ROUTE_REMOVE,
  SLASH_DOCUMENTS,
} from './constants.ts';

const { DOCUMENT_BLOCK, TITLE } = classNameObj;

type onRouteType = () => void;

export const initRouter = (onRoute: onRouteType) => {
  const removeAllDocument = async (document: DocumentType) => {
    for (const subDocument of document.documents) {
      removeAllDocument(subDocument);
    }

    await deletePost(document.id);
  };

  //event handlers
  window.addEventListener('popstate', () => onRoute());

  window.addEventListener(EVENT_ROUTE_PUSH, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    history.pushState(null, null, nextUrl);
    onRoute();
  });

  window.addEventListener(EVENT_ROUTE_REMOVE, async (e) => {
    const { id, parentId } = e.detail;

    if (!id) return;

    try {
      const removedDocument = await getPostOne(id);

      await removeAllDocument(removedDocument);

      routePush(`${parentId ? `${SLASH_DOCUMENTS}/${parentId}` : '/'}`);
    } catch (e: unknown) {
      console.error(e);
      routePush('/');
    }
  });

  window.addEventListener(EVENT_ROUTE_CREATE, async (e) => {
    const { id } = e.detail;

    try {
      const createNewDocument = await postNewPost(id);

      routePush(`${SLASH_DOCUMENTS}/${createNewDocument.id}`, id);
    } catch (e: unknown) {
      console.error(e);
      routePush(`${SLASH_DOCUMENTS}/${id}`);
    }
  });

  window.addEventListener(EVENT_ROUTE_PUT, async (e) => {
    const { id, title, content } = e.detail;

    try {
      await updatePost(id, title, content);
    } catch (e) {
      console.error(e);
    }
  });

  window.addEventListener(EVENT_HEADER_CHANGE, (e) => {
    const { id, title } = e.detail;

    const documentBlockList = window.document.body.querySelectorAll(
      `.${DOCUMENT_BLOCK}`,
    );
    let currentDocumentBlock = null;

    documentBlockList.forEach((e) => {
      const dataId = (e as HTMLElement).dataset.id;

      if (dataId && parseInt(dataId) === id) {
        currentDocumentBlock = e;
      }
    });

    if (!currentDocumentBlock) return;

    const currentTitleBlock = (
      currentDocumentBlock as HTMLElement
    ).querySelector(`.${TITLE}`);
    if (currentTitleBlock) {
      (currentTitleBlock as HTMLElement).textContent = title || null;
    }
  });
};

export const setHeaderChange = ({
  id,
  title,
}: {
  id: number;
  title?: string;
}) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_HEADER_CHANGE, {
      detail: {
        id,
        title,
      },
    }),
  );
};

export const routePush = (nextUrl?: string, parentId?: number) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_PUSH, {
      detail: {
        nextUrl,
        parentId,
      },
    }),
  );
};

export const routeRemoveDocument = ({
  id,
  parentId,
}: {
  id: number;
  parentId?: number;
}) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_REMOVE, {
      detail: {
        id,
        parentId,
      },
    }),
  );
};

export const routeCreateDocument = ({ id }: { id: number }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_CREATE, {
      detail: {
        id,
      },
    }),
  );
};

export const routePutDocument = ({
  id,
  title,
  content,
}: {
  id: number;
  title?: string;
  content?: string;
}) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_PUT, {
      detail: {
        id,
        title,
        content,
      },
    }),
  );
};
