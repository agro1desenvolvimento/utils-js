import getDeviceTypeByScreen, { devicesTypes } from './get-device-type-by-screen';

const mobileDevices: devicesTypes[] = ['phone', 'tablet'];

/**
 * Checa se o dispositivo é mobile de acordo com o tamanho da tela
 * @see getDeviceTypeByScreen
 */
export default () => mobileDevices.includes(getDeviceTypeByScreen());
