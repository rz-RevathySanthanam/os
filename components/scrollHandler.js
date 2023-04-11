import { useState, useEffect } from 'react';

export const useScrollHandler = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY;
      setScroll(scrollCheck);
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [scroll, setScroll]);

  return scroll;
};

export const scrollIntoViewHandler = (sectionId) => {
  const sectionView = document.getElementById(sectionId);
  const stickyBarSize = document.getElementById('stick_bar_view');
  if (sectionView) {
    if (sectionView.querySelector('.closed')) {
      sectionView.querySelector('.closed').click();
    }

    const headerOffset = stickyBarSize.offsetHeight;
    const elementPosition = sectionView.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};
