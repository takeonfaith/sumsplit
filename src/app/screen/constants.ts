export const SMALL_MOBILE_SCREEN = '(max-width: 389px)';
export const TINY_MOBILE_SCREEN = '(max-width: 340px)';
export const MOBILE_SCREEN = '(max-width: 766px)';
export const NOT_MOBILE_SCREEN = '(min-width: 767px)';
export const NOT_TABLET_SCREEN = '(min-width: 901px)';
export const TABLET_SCREEN = '(max-width: 900px)';
export const SMALL_DESKTOP = '(max-width: 1380px)';
export const TINY_DESKTOP = '(max-width: 1080px)';
export const BIGGER_THAN_SMALL_DESKTOP = '(min-width: 1381px)';
export const MIDDLE_DESKTOP = '(max-width: 1750px)';
export const LARGE_DESKTOP = '(min-width: 1751px)';

export const MEDIA_QUERIES = {
    isMobile: `@media ${MOBILE_SCREEN}`,
    isSmallMobile: `@media ${SMALL_MOBILE_SCREEN}`,
    isTinyMobile: `@media ${TINY_MOBILE_SCREEN}`,
    isNotMobile: `@media ${NOT_MOBILE_SCREEN}`,
    isTablet: `@media ${TABLET_SCREEN}`,
    isTinyDesktop: `@media ${TINY_DESKTOP}`,
    isSmallDesktop: `@media ${SMALL_DESKTOP}`,
    isMiddleDesktop: `@media ${MIDDLE_DESKTOP}`,
    isLargeDesktop: `@media ${LARGE_DESKTOP}`,
    isNotTablet: `@media ${NOT_TABLET_SCREEN}`,
    isBiggerThanSmallDesktop: `@media ${BIGGER_THAN_SMALL_DESKTOP}`,
} as const;
