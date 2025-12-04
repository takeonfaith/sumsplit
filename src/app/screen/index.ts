import { createApi, createStore } from 'effector';

import {
    LARGE_DESKTOP,
    MIDDLE_DESKTOP,
    MOBILE_SCREEN,
    SMALL_DESKTOP,
    TABLET_SCREEN,
    TINY_DESKTOP,
} from './constants';
import type { ScreenSizeType } from './types';

export const handleMedia = (): ScreenSizeType => {
    if (matchMedia(MOBILE_SCREEN).matches) {
        return 'mobile';
    } else if (matchMedia(TABLET_SCREEN).matches) {
        return 'tablet';
    } else if (matchMedia(TINY_DESKTOP).matches) {
        return 'tiny-desktop';
    } else if (matchMedia(SMALL_DESKTOP).matches) {
        return 'small-desktop';
    } else if (matchMedia(MIDDLE_DESKTOP).matches) {
        return 'middle-desktop';
    } else if (matchMedia(LARGE_DESKTOP).matches) {
        return 'large-desktop';
    } else {
        return 'not-mobile';
    }
};

export const $screenSize = createStore<ScreenSizeType>(handleMedia());
export const $isMobile = $screenSize.map((size) => size === 'mobile');

export const { setScreenSize } = createApi($screenSize, {
    setScreenSize: (_, size: ScreenSizeType) => size,
});

const handleFullResize = () => {
    setScreenSize(handleMedia());
};

window.addEventListener('resize', handleFullResize);
