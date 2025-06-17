import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Handle toggle light/dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    html.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col justify-flex-start min-h-screen transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <Nav />
      <Header />
        <div className="transition-colors duration-300 bg-light-accent text-light-text dark:bg-[#173924] dark:text-dark-text">
            {/* Toggle Switch */}
            <div className="flex justify-end px-6 py-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input 
                  id="switch" 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={toggleTheme} />
                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
              </label>
            </div>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
      <Footer />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
