/* eslint-disable @typescript-eslint/no-explicit-any */
import { idNameObj } from '../../utils/constants.ts';
import {
  ERROR_NEW_KEYWORD_MISSING,
  hasNewTarget,
  isValidArray,
} from '../../utils/error.ts';
import DocumentFooter from './DocumentFooter.ts';
import DocumentHeader from './DocumentHeader.ts';
import Documents from './Documents.ts';

export default function DocumentPage(
  this: any,
  { $target, initialState }: { $target: HTMLElement; initialState: object },
) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $page = document.createElement('div');
  $page.setAttribute('id', idNameObj.SIDEBAR_CONTAINER);

  let isInit = false;

  const isValidState = (state: object) => {
    if (!state || !isValidArray(state)) return false;
    return true;
  };

  this.state = isValidState(initialState) ? initialState : [];

  new (DocumentHeader as any)({ $target: $page });

  const documents = new (Documents as any)({
    $target: $page,
    initialState: this.state,
  });

  new (DocumentFooter as any)({ $target: $page });

  this.setState = (nextState: object) => {
    if (!isValidState(nextState)) return;

    this.state = nextState;

    documents.setState(this.state);

    if (!isInit) {
      this.render();
      isInit = true;
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
