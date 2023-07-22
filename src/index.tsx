import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);

/** Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 Learn more: https://snowpack.dev/concepts/hot-module-replacement 
 
 -->Allows snowpack to reload the page when changes to any files are made in src. 
 
 
 **/
if (import.meta.hot) {
    import.meta.hot.accept();
}
