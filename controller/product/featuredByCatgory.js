import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { lookUpQuery } from '@/roanuz/store/api';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { useQuery } from '@apollo/client';
import { FeaturedByCategoryView } from '@/roanuz/view/product/featuredByCategory';
import { categoryLink } from '@/roanuz/view/category/model';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import { UserContext } from '@/roanuz/store/core/context';
import { createBrandLink } from '@/roanuz/view/brand/model';
import { checkEligibilityOfQuerySet, translateV2 } from '@/roanuz/lib/utils';
import Config from '../../../config';

function featuredProductsQuery({ items, displayMode, carousel } = {}) {
  let pageSize = items;

  if (!items) {
    const pages = 3;
    let itemsPerPage = 5;
    if (displayMode === ProductCardDisplayMode.OneByThree) {
      itemsPerPage = 3;
    } else if (displayMode === ProductCardDisplayMode.OneByTwo) {
      itemsPerPage = 2;
    }

    if (carousel) {
      pageSize = pages * itemsPerPage;
    } else {
      pageSize = itemsPerPage;
    }
  }

  return {
    filterQuery: {},
    sortQuery: { position: 'ASC' },
    pageSize,
  };
}

export const ProductsFeaturedByCategoryController = ({
  categoryId,
  categoryName,
  category,
  brandMeta,
  displayMode,
  showMoreLinks,
  carousel,
  items,
}) => {
  const rzIsManufacturerEnabled = checkEligibilityOfQuerySet('rzIsManufacturerEnabled');
  const query = featuredProductsQuery({ items, displayMode, carousel });
  const basedOnUid = category && category.uid !== null && category.uid !== undefined;

  if (basedOnUid) {
    query.filterQuery.category_uid = { eq: category.uid };
  } else {
    query.filterQuery.category_id = { eq: categoryId };
  }
  if (brandMeta && rzIsManufacturerEnabled) {
    query.filterQuery.rz_manufacturer = { eq: brandMeta.id };
  }
  const {
    loading, data, error, refetch,
  } = useQuery(lookUpQuery('product.queries.productsFilter'), { variables: query });

  const clientReady = useWaitForClientSide();
  const userContext = useContext(UserContext);
  const { isB2B } = userContext;

  useEffect(() => {
    if (clientReady && userContext.token && Config.EnableClientSideRefresh && !carousel && isB2B) {
      refetch();
    }
  }, [clientReady, refetch, isB2B]);

  if ((!data) && loading) return (<LoadingView message="Fetching categories" />);
  if ((!data) && error) return (<ErrorView error={error} />);

  const name = basedOnUid ? category.name : categoryName;
  let title = name;
  let link = '';
  let linkText = translateV2('category.SEE_ALL');

  if (brandMeta) {
    title = `${name} ${translateV2('category.FROM')} ${brandMeta.name}`;
    linkText = `${translateV2('category.SEE_ALL')} ${brandMeta.name}'s ${name}`;
    link = createBrandLink(brandMeta.key, categoryId);
  } else if (category) {
    link = categoryLink(category);
  }

  return (
    <FeaturedByCategoryView
      title={title}
      link={link}
      linkText={showMoreLinks ? linkText : ''}
      products={data.products.items}
      displayMode={displayMode}
      carousel={carousel}
    />
  );
};

ProductsFeaturedByCategoryController.propTypes = {
  categoryId: PropTypes.string,
  categoryName: PropTypes.string,
  category: PropTypes.object,
  brandMeta: PropTypes.object,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
  showMoreLinks: PropTypes.bool,
  carousel: PropTypes.bool,
  items: PropTypes.number,
};
