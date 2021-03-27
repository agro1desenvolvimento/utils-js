enum DevicesMinSize {
  phone = 0,
  tablet = 768,
  desktop = 992,
}

/**
 * Retorna o tipo do dispositivo de acordo com o `getScreenSizeClassification`
 * ```js
 * {
 *   phone: '<768px',
 *   tablet: '≥768px',
 *   desktop: '≥992px',
 * }
 * ```
 * @see {getScreenSizeClassification}
 */
const getDeviceTypeByScreen = (): devicesTypes => {
  if (window.innerWidth >= DevicesMinSize.desktop) return 'desktop';
  if (window.innerWidth >= DevicesMinSize.tablet) return 'tablet';
  return 'phone';
};

export type devicesTypes = 'phone' | 'tablet' | 'desktop'

export default getDeviceTypeByScreen;
