import {createRoot} from 'react-dom/client';
import './assets/main.css';
import Main from './components/Main';

const root = createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  <Main />
);
