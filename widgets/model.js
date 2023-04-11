import { useQuery } from '@apollo/client';
import { cmsBlocksQuery } from '@/roanuz/store/cms/query';

export function useBlocksList(blockIds) {
  const { loading, error, data } = useQuery(
    cmsBlocksQuery, { variables: { identifiers: blockIds } },
  );
  let itemsRef = [];

  if (data) {
    const { items } = data.cmsBlocks;
    if (items) {
      itemsRef = items;
    }
  }

  return {
    loading,
    error,
    items: itemsRef,
  };
}
