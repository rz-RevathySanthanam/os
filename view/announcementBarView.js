import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import { Text16 } from '@/roanuz/typopgraphy';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { Button } from '@/roanuz/view/button';
import { asRem, changeContentAnimation } from '@/roanuz/lib/css';

export const AnnouncementBarViewWrapper = styled.div`
  background-color: var(--color-button);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${asRem(10)};
  text-align: center;
  color: var(--color-text-rev);
  height: 0;
  padding: 0 ${asRem(10)};
  overflow: hidden;
  animation: grow 0.5s ease 0.5s forwards;
  @keyframes grow {
    0% {
      height: 0;
    }
    100% {
      height: ${asRem(60)};
    }
  }

  .close-btn {
    color: #B3B3B3;
    padding: ${asRem(5)};
    &:hover {
      opacity: 0.8;
    }
  }

  .content-warp {
    flex: 1;
  }

  .content {
    text-align: center;
    animation: ${changeContentAnimation} 1s linear;
  }
  
`;

export const AnnouncementContentView = ({
  item,
  closeAnnouncement,
}) => {
  return (
    <AnnouncementBarViewWrapper>
      <div className="content-warp" key={`${item}`}>
        <Text16 as="p" className="content">{item}</Text16>
      </div>
      <Button
        icon={<CloseIcon />}
        noborder
        onClick={() => closeAnnouncement()}
        ariaLabel="Close Button"
        className="close-btn"
      />
    </AnnouncementBarViewWrapper>
  );
};

AnnouncementContentView.propTypes = {
  item: PropTypes.string,
  closeAnnouncement: PropTypes.func,
};

export const BaseAnnouncementBarView = ({
  showAnnouncement,
  closeAnnouncement,
  announcements,
}) => {
  const [currentItem, setCurrentItem] = useState(
    announcements && announcements[0] && announcements[0],
  );

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * announcements?.length);
    setCurrentItem(announcements && announcements[index] && announcements[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  if (!showAnnouncement) {
    return null;
  }

  if (announcements && announcements.length > 0) {
    return (
      <AnnouncementContentView
        item={currentItem}
        closeAnnouncement={closeAnnouncement}
      />
    );
  }
  return null;
};

BaseAnnouncementBarView.propTypes = {
  showAnnouncement: PropTypes.bool,
  closeAnnouncement: PropTypes.func,
  announcements: PropTypes.array,
};

export const AnnouncementBarView = withDependencySupport(BaseAnnouncementBarView, 'AnnouncementBarView');
