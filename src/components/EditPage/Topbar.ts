import {
  ERROR_NEW_KEYWORD_MISSING,
  hasId,
  hasNewTarget,
} from '../../utils/error.ts';
import { DISABLED_ID, classNameObj } from '../../utils/constants.ts';

export default function Topbar(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: any,
  { $target, initialState }: { $target: HTMLElement; initialState: object },
) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $topbar = document.createElement('div');
  $topbar.setAttribute('class', classNameObj.EDITOR_TOPBAR);
  $target.appendChild($topbar);

  const isValidState = (state: object) => {
    if (!state || !hasId(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { id: DISABLED_ID };

  this.setState = (nextState: object) => {
    if (!nextState) return;

    this.state = nextState;
  };
}
