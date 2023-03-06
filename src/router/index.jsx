import { createBrowserRouter  } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Writer from '../pages/Writer';
import Register from '../pages/Register';
import Single from '../pages/Single';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/write',
                element: <Writer />
            },
            {
                path: '/post/:id',
                element: <Single />
            }
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
]);

export default router;
