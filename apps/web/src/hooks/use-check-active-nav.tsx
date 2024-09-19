import { useLocation } from '@tanstack/react-router';

export function useCheckActiveNav<T>() {
  const { pathname } = useLocation();

  function checkActiveNav(nav: T) {
    const pathArray = pathname.split('/').filter((item) => item !== '');

    if (nav === '/' && pathArray.length === 0) return true;

    return pathArray.includes((nav as string).replace(/^\//, ''));
  }

  return { checkActiveNav };
}
