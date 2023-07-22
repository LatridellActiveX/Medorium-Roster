import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../public/index.css';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept();
}
