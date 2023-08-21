/* eslint-disable @typescript-eslint/no-explicit-any */
import { DISABLED_ID, idNameObj } from '../../utils/constants.ts';
import { ERROR_NEW_KEYWORD_MISSING, hasNewTarget } from '../../utils/error.ts';
import { routePutDocument } from '../../utils/router.ts';
import Editor from './Editor.ts';
import Header from './Header.ts';
import Topbar from './Topbar.ts';

export default function EditPage(
  this: any,
  { $target, initialState }: { $target: HTMLElement; initialState: object },
) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $page = document.createElement('div');
  $page.setAttribute('id', idNameObj.EDITOR_CONTAINER);

  let isInit = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  this.state = initialState || {
    id: DISABLED_ID,
    title: '',
    content: '',
  };

  const topbar = new (Topbar as any)({
    $target: $page,
    initialState: {},
  });

  const header = new (Header as any)({
    $target: $page,
    initialState: {
      id: this.state.id,
      title: this.state.title,
    },
    onEditing: (title: string) => {
      this.setState({
        ...this.state,
        title,
      });

      autoSaveDocument({ delay: 500 });
    },
  });

  const editor = new (Editor as any)({
    $target: $page,
    initialState: {
      content: this.state.content,
    },
    onEditing: (content: string) => {
      this.setState({
        ...this.state,
        content,
      });

      autoSaveDocument({ delay: 500 });
    },
  });

  this.setState = (nextState: object) => {
    if (!nextState) return;

    this.state = nextState;

    const { id, parentId, title, content } = this.state;

    header.setState({ id, title });
    editor.setState({ id, content });
    topbar.setState({ id, parentId: parentId || null });

    if (!isInit) {
      this.render();
      isInit = true;
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const autoSaveDocument = ({ delay }: { delay: number }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      const { id, title, content } = this.state;

      routePutDocument({ id, title, content });
    }, delay);
  };
}
