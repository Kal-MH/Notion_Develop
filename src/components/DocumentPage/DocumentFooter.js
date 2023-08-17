import { classNameObj, styleObj, idNameObj } from '../../utils/constants.ts';
import { ERROR_NEW_KEYWORD_MISSING, hasNewTarget } from '../../utils/error.ts';
import { routeCreateDocument } from '../../utils/router.ts';

const { TITLE, NEW_BTN, DOCUMENT_BLOCK_INNER } = classNameObj;
const DOCUMENT_FOOTER_CONTENT = 'New Doc';

export default function DocumentFooter({ $target }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $footer = document.createElement('div');
  $footer.setAttribute('id', idNameObj.SIDEBAR_FOOTER);
  $target.appendChild($footer);

  const CONTENT = DOCUMENT_FOOTER_CONTENT;
  const DEFAULT_PADDING = styleObj.DEFAULT_PADDING;

  this.render = () => {
    $footer.innerHTML = `
      <div class="${DOCUMENT_BLOCK_INNER}" style="padding: 2px 10px 2px ${DEFAULT_PADDING}px">
        <div class="${NEW_BTN}"></div>
        <div class="${TITLE}"> ${CONTENT} </div>
      </div>
    `;
  };

  this.render();

  $footer.querySelector(`.${NEW_BTN}`).addEventListener('click', () => {
    routeCreateDocument({ id: null });
  });
}
