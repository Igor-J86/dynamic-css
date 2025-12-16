import {createRoot} from 'react-dom/client';
import './assets/main.css';
import './assets/dynamic.css';
import Main from './components/Main';

const root = createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  <Main />
);
