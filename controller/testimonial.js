import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TestimonialCardView } from '@/roanuz/view/testimonialCardView';

export const TestimonialController = ({ items, sliderDelay = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reverseSlide, setReverseSlide] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const wrapper = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCurrentSlide(0);
        }
      },
    );
    if (wrapper.current) {
      observer.observe(wrapper.current);
    }
  }, [wrapper]);

  useEffect(() => {
    if (isVisible) {
      const id = setInterval(() => {
        if (reverseSlide) {
          if (currentSlide === 0) {
            setReverseSlide(false);
          } else {
            setCurrentSlide(currentSlide - 1);
          }
        } else if (currentSlide === items.length - 1) {
          setReverseSlide(true);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }, sliderDelay);
      return () => clearInterval(id);
    }
    return false;
  }, [isVisible, currentSlide, reverseSlide]);

  return (
    <div className="testimonial-card-container" ref={wrapper}>
      {items && (
        <TestimonialCardView
          items={items}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          setReverseSlide={setReverseSlide}
        />
      )}
    </div>
  );
};

TestimonialController.propTypes = {
  items: PropTypes.array,
  sliderDelay: PropTypes.number,
};
