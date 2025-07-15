import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Confirmed from './pages/Confirmed';
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
        path: '/resume',
        element: <Resume />
      }, {
        path: '/projects',
        element: <Projects />
      }, {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/confirmed',
        element: <Confirmed />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
