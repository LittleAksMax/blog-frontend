import { FC, useState, useEffect } from 'react';
import { ThemeType } from '../../../types';

const localStorageThemeKey = 'theme';

/**
 * Shamelessly stolen from: https://flowbite.com/docs/customize/dark-mode/
 */
const toggleHtmlThemeClassName = () => {
  // if set via local storage previously
  if (localStorage.getItem(localStorageThemeKey)) {
    if (localStorage.getItem(localStorageThemeKey) === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem(localStorageThemeKey, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(localStorageThemeKey, 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(localStorageThemeKey, 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem(localStorageThemeKey, 'dark');
    }
  }
};

const getMatchingIcon = (theme: ThemeType | undefined) => {
  switch (theme) {
    case 'dark':
      return 'DARK MODE';
    case 'light':
      return 'LIGHT MODE';
    default:
      return '?';
  }
};

const ThemeToggle: FC = () => {
  const [mode, setMode] = useState<ThemeType | undefined>();

  // set initial theme
  useEffect(() => {
    const darkMode = document
      .getElementsByTagName('html')[0]
      .classList.contains('dark');
    switch (darkMode) {
      case true:
        setMode('dark');
        break;
      case false:
        setMode('light');
        break;
      default:
        // unknown theme
        setMode(undefined);
    }
  }, []);

  const toggleTheme = () => {
    toggleHtmlThemeClassName();
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="hover:text-myorange-500 w-28 pt-2 pb-2 box-border border-solid border-2 border-black dark:border-mygrey-100 hover:border-myorange-500 text-center"
    >
      {getMatchingIcon(mode)}
    </button>
  );
};

export default ThemeToggle;
