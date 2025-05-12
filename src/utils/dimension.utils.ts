// src/theme/responsive.js
import { Dimensions } from 'react-native';

// Get the screen width
const { width, height } = Dimensions.get('window');

// Base dimensions (can be based on design specs)
const baseWidth = 375; // iPhone X width as base

// Scaling factor
export const scale = (size: number) => (width / baseWidth) * size;

// We can use these to calculate responsive font sizes
export const scaleFont = (size: number) => Math.round(scale(size));

// Device size detection (useful for rendering different layouts)
export const isSmallDevice = width < 375;
export const isMediumDevice = width >= 375 && width < 768;
export const isLargeDevice = width >= 768;

// We can also detect orientation
export const isPortrait = height > width;
export const isLandscape = width > height;

export const dimensions = { height, width };
