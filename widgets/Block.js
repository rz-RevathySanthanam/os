import PropTypes from 'prop-types';
import React from 'react';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { useBlocksList } from '@/roanuz/widgets/model';
import MagentoHtml from './MagentoHtml';

export const BlocksListView = ({ blockIds }) => {
  const {
    loading,
    error,
    items,
  } = useBlocksList(blockIds);

  if (loading) return (<LoadingView />);
  if (error) return (<ErrorView error={error} />);

  return (
    <>
      {items.map((item) => <BlockView content={item} key={item.identifier} />)}
    </>
  );
};

BlocksListView.propTypes = {
  blockIds: PropTypes.arrayOf(PropTypes.string),
};

export const BlockView = ({ content }) => {
  return (
    <MagentoHtml html={content.content} />
  );
};

BlockView.propTypes = {
  content: PropTypes.shape({
    content: PropTypes.string,
  }),
};
