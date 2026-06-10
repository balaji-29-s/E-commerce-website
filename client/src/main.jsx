import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './store/user-context';

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>
)
