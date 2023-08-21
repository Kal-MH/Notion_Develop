import {
  ERROR_NEW_KEYWORD_MISSING,
  hasId,
  hasNewTarget,
} from '../../utils/error.ts';
import { DISABLED_ID, classNameObj } from '../../utils/constants.ts';

export default function Topbar({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $topbar = document.createElement('div');
  $topbar.setAttribute('class', classNameObj.EDITOR_TOPBAR);
  $target.appendChild($topbar);

  const isValidState = (state) => {
    if (!state || !hasId(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : { id: DISABLED_ID };

  this.setState = (nextState) => {
    if (!nextState) return;

    this.state = nextState;
  };
}
