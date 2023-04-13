# The Omni Shop Package

Entire `roanuz` has be moved to this repo and can be used as a sub module in your application.
Editing to check the commit history

## Add Package as submodule in your App.

To add this package as a submodule in your app. In the root location of your app, run the below:

```
git submodule add https://github.com/roanuz/omnishop-js.git roanuz
```


### App Settings

`StickHeaderAtPosition`: Position of Sticky Header,


### StickyBar Settings

Build the site sticky bar using the settings.
[Explore Sticky Bar Settings](./view/stickyBar/stickyBarSettings.md).


### Category Page Config

Customise the individual category page using the configuration.
[Explore Category Page Config](./view/category/settings.md).


### Searchbar Config

Customise the searchbar input events using the configutation.

`disableOnFocus`: To hide Search suggestion onFocus, shown by default.

`disableOnBlur`: To hide Search Suggestion during input blur event, shown by default.

`enableAutoFocus`: Toggler to enable/disable autofocus, disabled by default.

`showRecentSearch`: To Show Recent Search on focus, disabled by default.
