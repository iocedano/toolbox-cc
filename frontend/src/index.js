import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);