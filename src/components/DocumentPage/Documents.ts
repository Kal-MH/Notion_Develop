import { DocumentType } from '../../types/document';
import {
  classNameObj,
  LOCAL_STORAGE_DISPLAY,
  SLASH_DOCUMENTS,
  styleObj,
} from '../../utils/constants.ts';
import {
  ERROR_NEW_KEYWORD_MISSING,
  hasNewTarget,
  isValidArray,
} from '../../utils/error.ts';
import {
  routeCreateDocument,
  routePush,
  routeRemoveDocument,
} from '../../utils/router.ts';
import { getItem, setItem } from '../../utils/storage.ts';
import {
  sidebarNewDocumentBtnClick,
  sidebarDisplayBtnClick,
  createDocumentSection,
} from './document_util/documentUtil.ts';

//constants
const {
  TITLE,
  TITLE_WRAPPER,
  DISPLAY_BTN,
  NEW_BTN,
  REMOVE_BTN,
  DOCUMENT_BLOCK,
  DOCUMENT_LIST_BLOCK,
  DOCUMENT_SECTION,
  SIDEBAR_DOCUMENT_LIST_CONTAINER,
  SCROLLBAR,
} = classNameObj;

export default function Documents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: any,
  {
    $target,
    initialState,
  }: {
    $target: HTMLElement;
    initialState: object;
  },
) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $sidebar = document.createElement('div');
  $sidebar.setAttribute('id', SIDEBAR_DOCUMENT_LIST_CONTAINER);
  $sidebar.setAttribute('class', SCROLLBAR);
  $target.appendChild($sidebar);

  const isValidState = (state: object) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : [];

  const openDocumentsList = getItem(
    LOCAL_STORAGE_DISPLAY,
    new Map(this.state.map((document: DocumentType) => [document.id, false])),
  );

  this.setState = (nextState: object) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `
      ${this.state
        .map((rootDocument: DocumentType) =>
          createDocumentSection(
            rootDocument,
            styleObj.DEFAULT_PADDING,
            openDocumentsList,
          ),
        )
        .join('')}
    `;
  };

  this.render();

  $sidebar.addEventListener('click', (e) => {
    const element = e.target as HTMLElement;
    const { classList } = element;

    const id = parseInt(element.closest(`.${DOCUMENT_BLOCK}`)?.dataset.id);
    const documentSection = element.closest(`.${DOCUMENT_SECTION}`);
    const parentId = documentSection?.parentNode?.dataset.id;

    if (classList[0] === TITLE || classList[0] === TITLE_WRAPPER) {
      routePush(`${SLASH_DOCUMENTS}/${id}`, parentId);
    } else if (classList[0] === DISPLAY_BTN) {
      sidebarDisplayBtnClick(id, element, openDocumentsList);
      if (Array.from(element.classList).includes('clicked'))
        element.classList.remove('clicked');
      else element.classList.add('clicked');
    } else if (classList[0] === NEW_BTN) {
      //낙관적 업데이트
      sidebarNewDocumentBtnClick(id, element);

      //펼침 적용
      if (documentSection) {
        const documentListBlock = documentSection.querySelector(
          `.${DOCUMENT_LIST_BLOCK}`,
        );

        openDocumentsList[id] = true;
        setItem(LOCAL_STORAGE_DISPLAY, openDocumentsList);
        if (documentListBlock) documentListBlock.style.display = 'block';
      }

      routeCreateDocument({ id });
    } else if (classList[0] === REMOVE_BTN) {
      routeRemoveDocument({ id, parentId });
    }
  });
}
