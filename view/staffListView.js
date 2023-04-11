import React from 'react';
import styled from 'styled-components';
import { ImageView } from '@/roanuz/view/image';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { testIfMatchedSpecifiedModelType } from '@/roanuz/view/datocms/types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { DisplayBold40, Display30, DisplayMedium18, Small } from '@/roanuz/typopgraphy';

export const BaseStaffListViewWrapper = styled.div`
  .staff-view-wrapper {
    background-color: var(--color-sticky-bg);
    color: var(--color-text-rev);
  }
  .staff-title {
    padding: ${asRem(80)} 0 ${asRem(60)};
  }
  .employee-card {
    display: flex;
    padding-bottom: ${asRem(40)};
    margin-bottom: ${asRem(40)};
    flex-wrap: wrap;
    @media screen and (min-width: ${Breakpoint.sm}) {
      align-items: center;
    }
    .employee-image {
      padding-right: ${asRem(26)};
      .rz-image-view {
        width: ${asRem(160)};
        height: ${asRem(160)};
        img {
          width: 100%;
          height: 100%;
        }
      }
      @media screen and (min-width: ${Breakpoint.sm}) {
        padding-right: ${asRem(46)};
      }
    }
    .employee-details {
      max-width: calc(100% - ${asRem(186)});
      @media screen and (min-width: ${Breakpoint.sm}) {
        width: ${asRem(300)};
      }
      p {
        line-height: ${asRem(45)};
      }
    }
    .emp-name {
      line-height: ${asRem(45)};
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
  }
  .employee-contacts {
    margin-top: ${asRem(10)};
    padding-left: ${asRem(186)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      padding-left: 0;
    }
    >p {
      a {
        padding-bottom: ${asRem(4)};
        display: inline-block;
      }
      :first-child {
        margin-bottom: ${asRem(15)};
      }
    }
  }
`;

export const StaffListView = ({ article }) => {
  return (
    <StaffListViewWrapper>
      <div className="rz-section-content staff-view-wrapper">
        <div className="inner-container">
          <DisplayBold40 className="staff-title">{article.title}</DisplayBold40>
          <div className="employee-cards-wrapper">
            {article?.model?.slice()
              .sort((x, y) => x.sortOrder - y.sortOrder)
              .filter((item) => {
                return (
                  testIfMatchedSpecifiedModelType(item, article.specifiedModelType)
                );
              })
              .map((staff, staffKey) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="employee-card" key={staffKey}>
                  <div className="employee-image">
                    <ImageView
                      src={staff.staffImage.url}
                      alt="Banner Image"
                    />
                  </div>
                  <div className="employee-details">
                    <Display30 className="emp-name">
                      <p>{staff.firstname}</p>
                      <p>{staff.lastname}</p>
                    </Display30>
                    <DisplayMedium18 className="emp-designation">{staff.designation}</DisplayMedium18>
                  </div>
                  <div className="employee-contacts">
                    <Small as="p">
                      <a href={`mailto:${staff.email}`}>{staff.email}</a>
                    </Small>
                    <Small as="p">
                      <a href={`tel:${staff.telephone}`}>{staff.telephone}</a>
                    </Small>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </StaffListViewWrapper>
  );
};

StaffListView.propTypes = {
  article: PropTypes.object,
};

export const StaffListViewWrapper = withDependencySupport(BaseStaffListViewWrapper, 'StaffListViewWrapper');
