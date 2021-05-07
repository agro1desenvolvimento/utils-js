/**
 * (pt-BR) Formata um número utilizando a internacionalização (I18n) com a locale sistema ou o
 * locale que passado por argumento.
 *
 * Ex: formatNumber(100.67) -> "100,67"
 *
 * (en-US) Formats the number using the internationalization (I18n) with the locale of the system
 * or the locale passed by argument
 *
 * Ex: formatNumber(100.67) -> "100.67"
 */
const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string | string[],
) => (Number.isNaN(value) ? '' : Intl.NumberFormat(locale, { useGrouping: false, ...options }).format(value));

export default formatNumber;
