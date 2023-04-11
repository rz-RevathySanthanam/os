import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { asRem } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import { ReactComponent as RightArrowIcon } from '@/roanuz/view/imgs/RightArrow.svg';
import { Button } from '@/roanuz/view/button';
import { LogoView } from '@/roanuz/view/brand';
import { InfinitySliderWrapper } from './style';

const dummyData = [
  { name: 'Slide 1' },
  { name: 'Slide 2' },
  { name: 'Slide 3' },
  { name: 'Slide 4' },
];

const SampleCard = styled.h4`
  margin: ${asRem(20)} 0;
  font-weight: 600;
  line-height: 1.1;
  font-size: ${asRem(30)};
`;

const dummyCardItems = dummyData.map((el) => (
  <SampleCard>
    <LogoView />
    {el.name}
  </SampleCard>
));

export const InfinitySlider = ({
  itemOnView = 3,
  items = dummyCardItems,
  transitionDelay = 0.5,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [forward, setForward] = useState(null);
  const [isRendered, setIsRendered] = useState(false);

  const totalItem = items.length < itemOnView ? itemOnView : items.length;
  const itemWidth = 100 / itemOnView;

  let itemsRef = [];
  if (items.length === 1) {
    itemsRef = Array(itemOnView).fill(...items);
  } else if (items.length < itemOnView) {
    itemsRef.push(...items, ...items.slice(0, itemOnView - items.length));
  } else {
    itemsRef.push(...items);
  }
  const postItems = itemsRef.slice(0, itemOnView);
  const preItems = itemsRef.slice(totalItem - itemOnView, totalItem);

  const wrapper = useRef();

  const activeSlide = currentSlide + 1;
  const nextslide = currentSlide + 2;

  function buildStyleTransform() {
    wrapper.current.style.transform = `translateX(${-itemWidth * (itemOnView + currentSlide)}%)`;
    wrapper.current.style.transition = `${transitionDelay}s ease`;
    if (forward && currentSlide === totalItem) {
      setTimeout(() => {
        wrapper.current.style.transform = `translateX(${-itemWidth * itemOnView}%)`;
        wrapper.current.style.transition = 'none';
      }, 500);
    } else if (!forward && currentSlide === -itemOnView) {
      setTimeout(() => {
        wrapper.current.style.transform = `translateX(${-itemWidth * (totalItem)}%)`;
        wrapper.current.style.transition = 'none';
      }, 500);
    }
  }

  useEffect(() => {
    if (isRendered) {
      buildStyleTransform();
    }
  }, [currentSlide]);

  useEffect(() => {
    wrapper.current.style.display = 'none';
    wrapper.current.style.opacity = '0';
    wrapper.current.style.transform = `translateX(${-itemWidth * (itemOnView + 0)}%)`;
    setTimeout(() => {
      wrapper.current.style.display = 'flex';
      wrapper.current.style.animation = 'fade-In 1s ease forwards';
    }, 50);
    setCurrentSlide(0);
    setIsRendered(true);
  }, [items]);

  const handlePointerEvent = () => {
    setPointerEvent('none');
    setTimeout(() => {
      setPointerEvent('auto');
    }, transitionDelay * 1000);
  };

  const onRightClick = () => {
    if (currentSlide === totalItem) {
      setCurrentSlide(1);
    } else if (!forward && currentSlide === -itemOnView) {
      setCurrentSlide(totalItem - itemOnView + 1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
    setForward(true);
    handlePointerEvent();
  };

  const onLeftClick = () => {
    if (currentSlide === -itemOnView) {
      setCurrentSlide(totalItem - itemOnView - 1);
    } else if (forward && currentSlide === totalItem) {
      setCurrentSlide(-1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    setForward(false);
    handlePointerEvent();
  };

  function prepareClassName(index) {
    let setClassName = '';
    if (index === currentSlide) {
      setClassName = 'previous-slide';
    } if (index === activeSlide) {
      setClassName = 'active-slide';
    } if (index === nextslide) {
      setClassName = 'next-slide';
    }
    return setClassName;
  }

  const updateIndex = (index) => {
    let indexValue = index;
    if (currentSlide === totalItem) {
      indexValue = (totalItem + index);
    } else if (currentSlide < 0) {
      if ((!(totalItem > itemOnView)
      || currentSlide === -(totalItem - itemOnView)) && currentSlide !== -totalItem) {
        indexValue = index;
      } else if (index >= (totalItem - itemOnView)) {
        indexValue = -(totalItem - index);
      }
    }
    return indexValue;
  };

  return (
    <InfinitySliderWrapper
      transitionDelay={transitionDelay}
      itemWidth={itemWidth}
      itemOnView={itemOnView}
    >
      <div className="infinity-slider-container">
        <div className="arrow-item arrow-left" style={{ pointerEvents: pointerEvent }}>
          <Button
            onClick={() => onLeftClick()}
            icon={<RightArrowIcon />}
            noborder
            ariaLabel="Left Arrow Button"
          />
        </div>
        <div className="infinity-slider-container-items">
          <div
            className="carousel-wrapper"
            ref={wrapper}
          >
            {preItems.map((el, index) => (
              <div
                className={`${prepareClassName(currentSlide < 0 ? index - itemOnView : index)} item`}
                tabIndex={index - itemOnView}
              >
                {el}
              </div>
            ))}
            {itemsRef.map((el, index) => (
              <div
                className={`${prepareClassName(updateIndex(index))} item`}
                tabIndex={updateIndex(index)}
              >
                {el}
              </div>
            ))}
            {postItems.map((el, index) => (
              <div
                className={`${prepareClassName(currentSlide > (totalItem - itemOnView) ? totalItem + index : index)} item`}
                tabIndex={index}
              >
                {el}
              </div>
            ))}
          </div>
        </div>
        <div className="arrow-item arrow-right" style={{ pointerEvents: pointerEvent }}>
          <Button
            onClick={() => onRightClick()}
            icon={<RightArrowIcon />}
            noborder
            ariaLabel="Right Arrow Button"
          />
        </div>
      </div>
    </InfinitySliderWrapper>
  );
};

InfinitySlider.propTypes = {
  itemOnView: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.element),
  transitionDelay: PropTypes.number,
};
