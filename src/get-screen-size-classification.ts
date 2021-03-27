enum ScreenSizes {
  xxl = 1400,
  xl = 1200,
  lg = 992,
  md = 768,
  sm = 576,
}

/**
 * Retorna a tag correspondente a largura da tela do dispositivo
 * ```js
 * {
 *  xs: '<576px',
 *  sm: '≥576px',
 *  md: '≥768px',
 *  lg: '≥992px',
 *  xl: '≥1200px',
 *  xxl: '≥1400px'
 * }
 * ```
 */
const getScreenSizeClassification = () => {
  if (window.innerWidth >= ScreenSizes.xxl) return 'xxl';
  if (window.innerWidth >= ScreenSizes.xl) return 'xl';
  if (window.innerWidth >= ScreenSizes.lg) return 'lg';
  if (window.innerWidth >= ScreenSizes.md) return 'md';
  if (window.innerWidth >= ScreenSizes.sm) return 'sm';
  return 'xs';
};

export type screenClassificationsType = ReturnType<typeof getScreenSizeClassification>

export default getScreenSizeClassification;
