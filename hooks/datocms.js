import { useQuery } from '@apollo/client';
import { DatoCmsPageQuery } from '@/roanuz/store/cms/datoCmsQuery';

export function useDatoCmsStaticContent(pageId) {
  const { loading, error, data } = useQuery(
    DatoCmsPageQuery, { variables: { pageId } },
  );
  let content = null;

  if (data) {
    const { rzfDatoCmsPage } = data;
    if (rzfDatoCmsPage) {
      content = rzfDatoCmsPage;
    }
  }

  return {
    loading,
    error,
    content,
  };
}
