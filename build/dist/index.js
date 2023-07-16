import React from '../_snowpack/pkg/react.js';
import ReactDOM from '../_snowpack/pkg/react-dom.js';
import App from './App.js';
ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(App, null)), document.getElementById('root'));

//Later

// var button = document.getElementById('btn');
// var target = document.getElementById('target')

//now to test something interesting

// var count = 100;

// function changeCount(){
//     target.innerHTML = count;
//     count--;

// }

// button.addEventListener("click", (event)=>{
//     var intervalId = setInterval(() => {
//         if (count >= 1) {
//           changeCount();
//         } else {
//           clearInterval(intervalId); // Stop the interval when count reaches 0
//         }
//       }, 1000);
// });

// function test(){
//     target.innerHTML = "Button has been clicked!"
// }