import {
  ERROR_NEW_KEYWORD_MISSING,
  hasContent,
  hasNewTarget,
} from '../../utils/error.ts';
import {
  classNameObj,
  DEFAULT_CONTENT,
  DISABLED_ID,
} from '../../utils/constants.ts';

export default function Editor({ $target, initialState, onEditing }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $editor = document.createElement('div');
  $editor.setAttribute('class', classNameObj.EDOTOR_EDITOR);
  $target.appendChild($editor);

  const isValidState = (state) => {
    if (!state || !hasContent(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { content: '' };

  this.setState = (nextState) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    const { id, content } = this.state;
    const textarea = $editor.querySelector('textarea');

    if (!content || content === DEFAULT_CONTENT) {
      textarea.value = '';
      textarea.placeholder = id === DISABLED_ID ? '' : DEFAULT_CONTENT;
    } else {
      textarea.value = this.state.content;
    }

    textarea.disabled = this.state.id === DISABLED_ID;
  };

  this.render = () => {
    $editor.innerHTML = `
      <textarea class="${classNameObj.SCROLLBAR}">${this.state.content}</textarea>
    `;
  };

  const init = () => {
    this.render();

    $editor.addEventListener('input', (e) => {
      const { value } = e.target;

      onEditing(value);
    });

    $editor.querySelector('textarea').addEventListener('focus', (e) => {
      e.target.placeholder = '';
    });
  };

  init();
}
