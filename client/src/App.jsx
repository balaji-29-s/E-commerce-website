import { Fragment } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header';
import { Layout } from './components/Layout';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
    return <Fragment>
        <Header />
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </Layout>
    </Fragment>
}

export default App
