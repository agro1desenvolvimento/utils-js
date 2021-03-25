enum ScreenSizes {
  xl = 1200,
  lg = 992,
  md = 768,
  sm = 576,
}

export default () => {
  if (window.innerWidth >= ScreenSizes.xl) return 'xl';
  if (window.innerWidth >= ScreenSizes.lg) return 'lg';
  if (window.innerWidth >= ScreenSizes.md) return 'md';
  if (window.innerWidth >= ScreenSizes.sm) return 'sm';
  return 'es';
};
