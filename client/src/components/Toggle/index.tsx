import { useEffect, useState } from 'react';

function Toggle() {
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
    <div className="w-full px-4 sm:px-6 lg:px-8"></div>
    </div>
  );
}

export default Toggle