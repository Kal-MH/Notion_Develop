import {
  ERROR_NEW_KEYWORD_MISSING,
  hasContent,
  hasNewTarget,
} from '../../utils/error.js';
import {
  classNameObj,
  DEFAULT_CONTENT,
  DISABLED_ID,
} from '../../utils/constants.js';

export default function Editor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: any,
  {
    $target,
    initialState,
    onEditing,
  }: {
    $target: HTMLElement;
    initialState: object;
    onEditing: (value: string) => void;
  },
) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $editor = document.createElement('div');
  $editor.setAttribute('class', classNameObj.EDOTOR_EDITOR);
  $target.appendChild($editor);

  const isValidState = (state: object) => {
    if (!state || !hasContent(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { content: '' };

  this.setState = (nextState: object) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    const { id, content } = this.state;
    const textarea = $editor.querySelector('textarea') as HTMLTextAreaElement;

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
      const { value } = e.target as HTMLTextAreaElement;

      onEditing(value);
    });

    $editor.querySelector('textarea')?.addEventListener('focus', (e) => {
      (e.target as HTMLTextAreaElement).placeholder = '';
    });
  };

  init();
}
