import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/User.js';
import Signup from './pages/Signup';
import Error from './pages/Error';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/user/:userId',
        element: <Profile />
      }, {
        path: '/Home',
        element: <Home />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
