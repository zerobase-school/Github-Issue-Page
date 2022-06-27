import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import { BrowserRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

dayjs.extend(relativeTime);
