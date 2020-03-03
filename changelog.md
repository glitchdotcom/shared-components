# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.13.16] - 2020-03-03
### Changed 
- `lib/icon.js`: 
  - reverses orientation of the search icon's magnifying glass

## [0.13.15] - 2020-02-05
### Changed
- `lib/notifications.js`: 
  - Modified default padding and width for notifications
  - Added ability to remove a notification programmatically
  - Set default notification timeout to 2.5s and added a persistent notification prop

## [0.13.14] - 2020-01-13
### Changed 
- `.glitch-assets`: updated with all new editor icons
- `lib/icons.js`: added editor icons that were missed from previous release

## [0.13.13] - 2020-01-10
### Changed
- `lib/icons.js`: added editor icons, and set default size from 0.875em to 1em

## [0.13.12] - 2020-01-08
- `lib/button.js`: fix issue where Button components were outputting `true` on the line for font-size

## [0.13.11] - 2020-01-02
- update documentation

## [0.13.10] - 2019-12-17
### Changed
- `lib/block.js`: update flex so titles will wrap as needed
- `lib/button.js`: add text wrapping as an option (default false)

## [0.13.8] - 2019-12-05
### Changed
- `lib/popovers.js`: added max width for popovers

## [0.13.7] - 2019-12-05
- brought back dividers to results list, added ability to mark a resultitem as private

## [0.13.6] - 2019-12-02
### Changed
- `lib/icon.js`: added lightbulb emoji

## [0.13.5] - 2019-11-21
### Changed
- `lib/icon.js`: added victoryHand and refresh icons

## [0.13.4] - 2019-11-06
### Changed
- `lib/themes.js`: fixed z-index bug

## [0.13.3] - 2019-11-05
### Changed
- `.glitch-assets`: added "coffin" icons
- `CONTRIBUTING.md`: added instructions for adding emoji

## [0.13.2] - 2019-11-05
### Changed
- `.glitch-assets`

## [0.13.1] - 2019-10-31
### Changed
- `lib/text-input.js`: fixed CSS error breaking font size


## [0.13.0] - 2019-10-17
### Changed
- `lib/block.js`: added styles that were being overridden on glitch.com
- `lib/popover.js`: added "startOpen" prop for popovers that should be open on page load

## [0.12.1] - 2019-10-16
### Changed
- `rollup.config.js`: run the styled-components babel plugin in builds

## [0.12.0] - 2019-10-16
### Changed
- `lib/icon.js`: added "blockArrowDown" and "blockArrowUp" icons

## [0.11.3] - 2019-10-15
### Changed
- `CONTRIBUTING.md`: added contributing instructions

## [0.11.2] - 2019-10-09
### Changed
- `lib/icons.js`: added "glitch fish" icon

## [0.11.1] - 2019-10-03
### Changed
- `lib/text-input.js`: give opaque text input a border radius

## [0.11.0] - 2019-10-02
### Changed
- `.glitch-assets`: added "shuffle" icon
- `lib/icon.js`: added "shuffle" icon

## [0.10.0] - 2019-09-23
### Added
- `lib/toggle.js`: `Toggle` component

## [0.9.1] - 2019-09-19
### Changed
- `lib/text-input.js`: added box-shadow styling when input is focused
- `lib/themes.js`: added focus color

## [0.9.0] - 2019-09-19
### Changed
- `.glitch-assets`: add "television" and "telephone" icons
- `lib/icon.js`: add "television" and "telephone" icons

## [0.8.0] - 2019-09-18
### Changed
- `lib/icon.js`: add "handshake" and "party" icons
- `lib/popover.js`: fix documentation error
- `lib/results-list.js`: put border on scroll container instead of inner results list

## [0.7.1] - 2019-09-17
### Changed
- `package.json`: made `styled-components` a peer dependency

## [0.7.0] - 2019-09-10
### Changed
- `lib/themes.js`: make 'selected' color a lighter shade of blue in light theme

## [0.6.0] - 2019-09-05
### Changed
- `lib/themes.js`: make 'selected' color a lighter shade of blue in light theme

## [0.5.2] - 2019-08-30
### Changed
- `lib/button.js`: changed `white-space` property so buttons don't overflow their containers

## [0.5.1] - 2019-08-30
### Changed
- `lib/button.js`: added `:disabled` styling for buttons

## [0.5.0] - 2019-08-19
### Added
- `lib/live-announcer.js`: aria-live announcer components for Notification a11y
- `lib/notification.js`: `Notification`, `NotificationsContainer`, `NotificationsProvider` components; `useNotifications` hook
- `lib/progress.js`: `Progress` component
### Changed
- `lib/button.js`: add margin for CTA button (to account for shadow)
- `lib/themes.js`: update theme colors for contrast a11y

## [0.4.0] - 2019-08-19
### Added
- `lib/button-group.js`: `ButtonGroup` and `SegmentedButton` components
### Changed
- `lib/button.js`: add "active" state for buttons

## [0.3.0] - 2019-08-16
### Added
- `lib/badge.js` - `Badge` component
- `SearchResults` & `ResultsList` components
- update `AnimationContainer` to handle reduced motion

## [0.2.0]
### Added
- `lib/animation-container.js`: `AnimationContainer` component, `slideUp` and `slideDown` animations
- `lib/checkbox-button.js`:  `CheckboxButton` component
- `lib/icon-button.js`: `IconButton` component
- `lib/overlay.js`: `Overlay` component
- `lib/popover.js`: `Popover` component
- `lib/block.js`: `Info`, `Actions`, and `DangerZone` blocks for overlays and popovers

## [0.1.1] - 2019-07-31
### Added
- created a changelog
- `server/changelog.js`: script to populate the changelog with a new entry, including stubs for each changed file

## [0.1.0] - 2019-07-31
### Added
- initial release: `Avatar`, `Button`, `Icon`, `Loader`, `TextInput`, `TextArea` components, `createRemoteComponent` helper
