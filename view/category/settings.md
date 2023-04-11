## Category Page Config

Place the settings in you client's Config.js file.

```
CategoryPageSettings: {
    filterSettings: {...},
    productSortSettings: {...},
    productsFetchSettings: {...},
}
```

### Filter Settings (filterSettings)
*--Which used to customize the filters selections.*

`showOnlyChildLevel`: Toggler to show the immediate child categories only, not the nested ones.

`closeDefaults`: Toggler to expand/close the default filters. 

`closePrice`: Toggler to expand/close the price group by default.

`closeFilters`: Toggler to expand/close all the filter groups by default.

<br />

`showAsSlider`: Show entire filters section in a slider. 

`sliderAnimationMode`: On setting above true, to change slider motion mode [Refer featureTypes](../stickyBar/featureTypes.js). Default is slide from left.

<br />

`enableFilterOptionsSearch`: To enable client side search for individual filter options.

`maximumOptionsToShowInitially`: To display maximum filter options initillay with "Show more".

<br />

`showQuickFilters`: To enable the quick filter mode.

`exposedQuickFilter`: To display the any one of the specifc filter options in the quick filter mode.

`enableIconOfExposedQuickFilter`: To display image for exposed quick filter.

`quickFilterItemsDisplayLimit`: [array] Enables "Show More" option after n number of filter items.

`enablePriceSlider`: To display the price filter as slider mode, be default its list view.


### Product Sort Settings (productSortSettings)
*--Related to default sort by and enable/disable to display specific sort option.*


### Products Fetch Config (productsFetch)
`productsPerPage`: Number of products to fetch at a time
`enableLoadMoreMode`: Enable load more button. If OFF, then default will be Pagination.