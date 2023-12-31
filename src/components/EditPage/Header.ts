import {
  DEFAULT_TITLE,
  DISABLED_ID,
  ROOT_TITLE,
  classNameObj,
} from '../../utils/constants.ts';
import {
  ERROR_NEW_KEYWORD_MISSING,
  hasId,
  hasNewTarget,
  hasTitle,
} from '../../utils/error.ts';
import { setHeaderChange } from '../../utils/router.ts';

export default function Header(
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

  const $header = document.createElement('header');
  $target.appendChild($header);

  const isValidState = (state: object) => {
    if (!state || !hasId(state) || !hasTitle(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { title: '' };

  this.setState = (nextState: object) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    const { title } = this.state;
    const input = $header.querySelector('input') as HTMLInputElement;

    if (!title || title === DEFAULT_TITLE || title === ROOT_TITLE) {
      input.value = '';
      input.placeholder = !title ? DEFAULT_TITLE : title;
    } else {
      input.value = title;
    }

    input.disabled = this.state.id === DISABLED_ID;
  };

  this.render = () => {
    const { title } = this.state;
    $header.innerHTML = `
      <div class="${classNameObj.INPUT_WRAPPER}">
        <input type="text"${
          !title.length ? `placeholder="${DEFAULT_TITLE}"` : `value="${title}"`
        }/>
      </div>
    `;
  };

  const init = () => {
    this.render();

    $header.addEventListener('input', (e) => {
      const { value } = e.target as HTMLInputElement;

      setHeaderChange({
        id: this.state.id,
        title: value,
      });

      onEditing(value);
    });

    $header.querySelector('input')?.addEventListener('focus', (e) => {
      const element = e.target as HTMLInputElement;
      const { value } = element;

      element.placeholder = '';

      setHeaderChange({
        id: this.state.id,
        title: value,
      });
    });
  };

  init();
}
