import React from 'react';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Display20 } from '@/roanuz/typopgraphy';
import PropTypes from 'prop-types';
import { SVGIcon } from '@/roanuz/view/icon';
import { ImageView } from '@/roanuz/view/image';
import { ReactComponent as QuotesIcon } from '@/roanuz/view/imgs/QuotesIcon.svg';

export const TestimonialWrapper = styled.div`
  padding: ${asRem(60)} 0;

  .testimonial-container {
    overflow: hidden;
    text-align: center;
    position: relative;
  }

  .testimonial-content-wrapper {
    display: flex;
    flex-wrap: nowrap;
    transition: 1s ease;

    .testimonial-content {
      width: 100%;
      min-width: 100%;
      align-items: center;
      justify-content: flex-end;
      transition: all 1s ease;
      @media screen and (min-width: ${Breakpoint.sm}) {
        display: flex;
      }
    }
  }
  .dots-wrapper {
    display: flex;
    gap: ${asRem(10)};
    justify-content: center;
    margin-right: ${asRem(20)};
    margin-top: ${asRem(30)};
    position: relative;
    .dot {
      width: ${asRem(10)};
      height: ${asRem(10)};
      background-color: var(--color-text-rev);
      opacity: 0.6;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .testimonial-image-wrapper {
    position: relative;
    margin: ${asRem(50)} 0 0 ${asRem(135)};

      .rz-image-view {
        height: ${asRem(214)};
        position: relative;
        display: inline-block;
        @media screen and (min-width: ${Breakpoint.md}) {
          height: ${asRem(416)};
        }
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-text);
          opacity: 0.2;
        }
        
      }
      img {    
        object-fit: cover;
        height: 100%;
        width: 100%;
      }

    .quote-image {
      position: absolute;
      z-index: 2;
      top: -${asRem(10)};
      left: -${asRem(58)};
      @media screen and (min-width: ${Breakpoint.md}) {
        top: -${asRem(20)};
        left: -${asRem(110)};
      }
      .rz-svg-icon {
        height: ${asRem(70)};
        @media screen and (min-width: ${Breakpoint.md}) {
          height: ${asRem(137)};
        }
        svg path {
          opacity: 0.5;
        }
      }
    }
  }
`;

export const TestimonialCardView = ({
  items, currentSlide,
  setCurrentSlide, setReverseSlide,
}) => {
  return (
    <TestimonialWrapper className="testimonial-wrapper">
      <div className="testimonial-container">
        <div
          className="testimonial-content-wrapper"
          style={{ transform: `translateX(calc(-${currentSlide} * 100%))` }}
        >
          {items?.slice().sort((x, y) => x.sortOrder - y.sortOrder).map((item) => (
            <div
              className="testimonial-content"
            >
              <div className="testimonial-text-wrapper">
                <Display20 className="client-data">{item.title}</Display20>
                <Display20 className="client-title">
                  {item.description}
                </Display20>
              </div>
              <div className="testimonial-image-wrapper">
                {item.image && (
                  <>
                    <div className="quote-image">
                      <SVGIcon
                        heightPx={60}
                      >
                        <QuotesIcon />
                      </SVGIcon>
                    </div>
                    <div className="client-image">
                      <ImageView
                        src={item.image.url}
                        alt={item.image.alt || 'Testimonial'}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dots-wrapper">
        {items.map((el, index) => (
          <div
            className="dot"
            style={index === currentSlide ? { opacity: 1 } : { opacity: 0.5 }}
            onClick={() => [setCurrentSlide(index), setReverseSlide(false)]}
            role="presentation"
          />
        ))}
      </div>
    </TestimonialWrapper>
  );
};

TestimonialCardView.propTypes = {
  items: PropTypes.array,
  currentSlide: PropTypes.number,
  setCurrentSlide: PropTypes.func,
  setReverseSlide: PropTypes.func,
};
