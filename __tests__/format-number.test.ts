import { formatNumber } from '../src';

describe('formatNumber', () => {
  let number = 0;

  beforeEach(() => {
    number = (Math.random() * 100) + 1;
  });

  it('should format the number', () => {
    const formatted = formatNumber(number, { maximumFractionDigits: 2, minimumFractionDigits: 2 }, 'pt-BR');

    expect(formatted).toEqual(`${number.toFixed(2).replace('.', ',')}`);
  });

  it('should not format the number', () => {
    const formatted = formatNumber(Number.NaN, { maximumFractionDigits: 2, minimumFractionDigits: 2 }, 'pt-BR');

    expect(formatted.length).toBe(0);
  });
});
