import {
  DEFAULT_STATE,
  DEFAULT_TITLE,
  DISABLED_ID,
  REMOVED_DOC_STATE,
  SLASH_DOCUMENTS,
} from '../utils/constants.ts';
import { ERROR_NEW_KEYWORD_MISSING, hasNewTarget } from '../utils/error.ts';
import DocumentPage from './DocumentPage/DocumentPage.ts';
import EditPage from './EditPage/EditPage.js';
import { initRouter } from '../utils/router.ts';
import { getPostAll, getPostOne } from '../api/post.ts';

export default function App({ $target }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const documentPage = new DocumentPage({
    $target,
    initialState: [],
  });

  const editPage = new EditPage({
    $target,
    initialState: {
      id: DISABLED_ID,
      title: DEFAULT_TITLE,
      content: '',
    },
  });

  this.route = async () => {
    const { pathname } = location;
    const documentsList = await getPostAll();

    documentPage.setState(documentsList);
    if (pathname === '/') {
      editPage.setState(DEFAULT_STATE);
    } else if (pathname.indexOf(`${SLASH_DOCUMENTS}`) === 0) {
      const [, , documentId] = pathname.split('/');
      const document = await getPostOne(documentId);

      if (document) {
        editPage.setState({ ...document });
      } else {
        editPage.setState({ ...REMOVED_DOC_STATE });
      }
    }
  };

  this.route();

  initRouter(() => this.route());
}
