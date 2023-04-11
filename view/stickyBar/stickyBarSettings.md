## Sticky Bar Settings

```
export const StickyBarSettings = {
    class_name: 'rz-stickybar-view',
    features: { ... }
}
```

### Features (features)
```
features: {
    left: [...],
    center: [...],
    right: [...],
    secondaryCenter: [...],
    menu: [...],
}
```

1. left | center | right: Left/center/right side respective items of StickyBar.

2. secondaryCenter: Secondary Row of StickyBar.

3. menu: Settings of menu.


### Individual Feature Possible Settings
```
{
    view: $PossibleViews,
    class_name: $className,
    href: $href,
    items: [...],
    showMiniView: true,
    modalView: true,
}
```

`$PossibleViews`
[Reference](./featureTypes.js): Whatever value we specify in settings, should match the value in _StickBarFeatureTypes_.

`$className:` External class name
- One of Defined class name `spacious-icon` - for extra place around icon view.

`$href:` It signifies the view / icon / text is an anchor link.

`$showMiniView:` [`Boolean`] To show / hide the mini view of cart / wishlist.

`$modalView:` [`Boolean`] To enable / disable the slider overlay view of cart / search.


### Individual Feature > Items [...] Configuration
```
label: $label,
href: $href,
icon: $icon,
showMiniView: $showMiniView,
isServiceTree: $isServiceTree,
menuActionFrame: $menuActionFrame,
```

`$icon:` To display icon and `$label` side by side. Whatever value we specify for icon, should match the value in _[MenuLinkIconTypes](./featureTypes.js)_.

`$showMiniView:` [`Boolean`] To show / hide the mini view of link items.

`$isServiceTree:` [`Boolean`] Hardcoded Secondary Menu tree.

`$menuActionFrame:` The value of frame to be displayed in Super Menu, on clicking the item link. - Only works on Super Menu mode.


### Menu [...] Settings
```
menu_mode: $menu_mode,
mobileMenuSettings: $mobileMenuSettings,
superMenuSettings: $superMenuSettings,
animation_mode: $animation_mode,
```

`$menu_mode:` Specify only if you need Super Menu, else don't specify the attribute. The value we specify for menu_mode, should match the value in _[StickBarMenuModeTypes](./featureTypes.js)_.

`$mobileMenuSettings:` Settings (links/menu) to display in Burger Menu in mobile view.

`$superMenuSettings:` Settings (links/menu) to display in Super Menu Mode.

`$animation_mode:` The animation_mode is SlideInLeft by default. While using SplitScreen in animation_mode, styles should be updated respectively.

```
$mobileMenuSettings/$superMenuSettings: {
    items: [],
    quickLinks: [],
}
```


### Menu settings > Items [...] Configuration
```
label: $label,
href: $href,
showMenuTree: $showMenuTree,
isServiceTree: $isServiceTree,
menuActionFrame: $menuActionFrame,
```

`$showMenuTree:` [`Boolean`] To show / hide the menu tree in Burger Menu in mobile view only.

`$isServiceTree:` [`Boolean`] Hardcoded Secondary Menu tree.

`$menuActionFrame:` The value of frame to be displayed in Super Menu, on clicking the item link. - Only works on Super Menu mode.


### Menu settings > QuickLinks [...] Configuration
```
label: $label,
href: $href,
icon: $icon,
authRequired: $authRequired,
isLogoutButton: $isLogoutButton,
```

`$authRequired:` [`Boolean`] Display specific link item only if user is logged-in.

`$isLogoutButton:` [`Boolean`] Logout Button View.

<br />

[_Reference:_ Settings of Sticky Bar Config](../../../data/stickyBar/settings.json).