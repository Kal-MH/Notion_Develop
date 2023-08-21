import { setItem } from '../../../utils/storage.js';
import {
  classNameObj,
  styleObj,
  DEFAULT_TITLE,
  DEFAULT_ID,
  LOCAL_STORAGE_DISPLAY,
} from '../../../utils/constants.js';
import { DocumentType, StorageDocumentType } from '../../../types/document.js';

//constants
const {
  TITLE,
  TITLE_WRAPPER,
  BTN_WRAPPER,
  DISPLAY_BTN,
  NEW_BTN,
  REMOVE_BTN,
  DOCUMENT_BLOCK,
  DOCUMENT_BLOCK_INNER,
  DOCUMENT_LIST_BLOCK,
  DOCUMENT_SECTION,
} = classNameObj;

const { PADDING_INCREMENT } = styleObj;

type DocumentArgsType = { id: number; title: string; padding: number };

//private method
const createDocumentBlock = (id: number, title: string, padding: number) => {
  return `
    <div data-id=${id} class="${DOCUMENT_BLOCK}">
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${padding}px">
        <div class="${DISPLAY_BTN}"></div>
        <div class="${TITLE_WRAPPER}">
          <div class="${TITLE}">${title || DEFAULT_TITLE}</div>
        </div>
        <div class="${BTN_WRAPPER}">
          <div class="${REMOVE_BTN}"></div>
          <div class="${NEW_BTN}"></div>
        </div>
      </div>
    </div>
  `;
};

const createNewHTML = (origin: string, documentArgs: DocumentArgsType) => {
  const { id, title, padding } = documentArgs;

  return `
    ${origin}
    <div class="${DOCUMENT_SECTION}">
      ${createDocumentBlock(id, title, padding)}
    </div>
  `;
};

const addNewDocumentBlock = (
  documentListBlock: HTMLElement,
  paddingLeft: number,
) => {
  const innerTags = documentListBlock.innerHTML;

  documentListBlock.innerHTML = `
    ${createNewHTML(innerTags.substring(0, innerTags.length - 5), {
      id: DEFAULT_ID,
      title: DEFAULT_TITLE,
      padding: paddingLeft + PADDING_INCREMENT,
    })}
    </div>
  `;
};

const addNewDocumentList = (
  id: number,
  documentListAddBlock: HTMLElement,
  paddingLeft: number,
) => {
  const origin = `
    ${documentListAddBlock.innerHTML}
    <div data-id="${id}" class="${DOCUMENT_LIST_BLOCK}" style="display:block">
  `;

  documentListAddBlock.innerHTML = `
    ${createNewHTML(origin, {
      id: DEFAULT_ID,
      title: DEFAULT_TITLE,
      padding: paddingLeft + PADDING_INCREMENT,
    })}
    </div>
  `;
};

//public method
export const createDocumentSection = (
  parentDocument: DocumentType,
  padding: number,
  openDocumentsList: StorageDocumentType,
): string => {
  const { id, title, documents } = parentDocument;

  if (!id || title === undefined) return '';

  return `
  <div class="${DOCUMENT_SECTION}">
    ${createDocumentBlock(id, title, padding)}
    ${
      documents.length
        ? `
            <div data-id="${id}" class="${DOCUMENT_LIST_BLOCK} ${
              openDocumentsList[id] ? 'block' : 'none'
            }">
                  ${documents
                    .map((document) =>
                      createDocumentSection(
                        document,
                        padding + PADDING_INCREMENT,
                        openDocumentsList,
                      ),
                    )
                    .join('')}
            </div>
          `
        : ''
    }
  </div>
  `;
};

export const sidebarDisplayBtnClick = (
  id: number,
  target: EventTarget,
  openDocumentsList: StorageDocumentType,
) => {
  if (!target) return;

  const documentListBlock = (target as HTMLElement)
    .closest(`.${DOCUMENT_SECTION}`)
    ?.querySelector(`.${DOCUMENT_LIST_BLOCK}`);

  if (!documentListBlock) return;

  const { classList } = documentListBlock;

  if (classList.contains('none')) {
    openDocumentsList[id] = true;
    classList.remove('none');
    classList.add('block');
  } else {
    openDocumentsList[id] = false;
    classList.remove('block');
    classList.add('none');
  }
  setItem(LOCAL_STORAGE_DISPLAY, openDocumentsList);
};

export const sidebarNewDocumentBtnClick = (id: number, target: EventTarget) => {
  const documentListBlock = (target as HTMLElement)
    .closest(`.${DOCUMENT_SECTION}`)
    ?.querySelector(`.${DOCUMENT_LIST_BLOCK}`) as HTMLElement;

  const { paddingLeft } =
    (target as HTMLElement).closest(`.${DOCUMENT_BLOCK_INNER}`)?.style || '0px';

  const paddingLeftNum = parseInt(
    paddingLeft.substring(0, paddingLeft.length - 2),
  );

  if (documentListBlock) {
    addNewDocumentBlock(documentListBlock, paddingLeftNum);
  } else {
    const documentListAddBlock = (target as HTMLElement).closest(
      `.${DOCUMENT_SECTION}`,
    ) as HTMLElement;

    addNewDocumentList(id, documentListAddBlock, paddingLeftNum);
  }
};
