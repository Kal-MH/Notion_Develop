import App from './components/App.ts';

const $container = document.querySelector('#container');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
new (App as any)({
  $target: $container,
});
