import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
);

// structure: page - routeIfAuth___routeIfUnauth

// admin panel - null___login
// main - null___login
// profile - null___login
// login - profile___null
// regestration - main___null