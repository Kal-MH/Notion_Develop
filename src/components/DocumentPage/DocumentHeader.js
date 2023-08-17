import { classNameObj, styleObj, idNameObj } from '../../utils/constants.ts';
import { ERROR_NEW_KEYWORD_MISSING, hasNewTarget } from '../../utils/error.ts';

const { TITLE, DOCUMENT_BLOCK_INNER } = classNameObj;
const DOCUMENT_HEADER_CONTENT = 'Notion';

export default function DocumentHeader({ $target }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $header = document.createElement('div');
  $header.setAttribute('id', idNameObj.SIDEBAR_HEADER);
  $target.appendChild($header);

  const CONTENT = DOCUMENT_HEADER_CONTENT;
  const DEFAULT_PADDING = styleObj.DEFAULT_PADDING;

  this.render = () => {
    $header.innerHTML = `
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${DEFAULT_PADDING}px">
        <div class="${TITLE}"> ${CONTENT} </div>
      </div>
    `;
  };

  this.render();
}
