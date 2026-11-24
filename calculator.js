'use strict';
const TripMath = (() => {
  const fields = ['paid', 'empty', 'consumption', 'price', 'revenue', 'driver', 'tolls', 'extra'];
  const defaults = {paid:'850', empty:'150', consumption:'30', price:'6.50', revenue:'5800', driver:'850', tolls:'420', extra:'180'};
  // Each input is stored as an integer number of hundredths.
  function parse(raw) {
    const match = /^(\d{1,12})(?:[.,](\d{1,2}))?$/.exec(String(raw ?? '').trim());
    return match ? BigInt(match[1]) * 100n + BigInt((match[2] || '').padEnd(2, '0')) : null;
  }
  function round(a, b) {
    if (b === 0n) return null;
    const sign = a < 0n ? -1n : 1n;
    return sign * ((2n * a * sign + b) / (2n * b));
  }
  function calculate(raw) {
    const n = Object.fromEntries(fields.map(key => [key, parse(raw[key])]));
    const errors = fields.filter(key => n[key] === null);
    if (errors.length) return {errors};
    const distance = n.paid + n.empty;
    const fuel = round(distance * n.consumption * n.price, 1000000n);
    const costs = fuel + n.driver + n.tolls + n.extra;
    const profit = n.revenue - costs;
    return {
      errors, inputs:n, distance, fuel, costs, profit,
      margin:round(profit * 10000n, n.revenue),
      costKm:round(costs * 100n, distance),
      breakEven:n.paid ? (costs * 100n + n.paid - 1n) / n.paid : null,
      parts:[fuel, n.driver, n.tolls, n.extra]
    };
  }
  function format(value, lang, {min=2, group=true} = {}) {
    if (value == null) return '—';
    const positive = value < 0n ? -value : value;
    const whole = (positive / 100n).toLocaleString(lang === 'PL' ? 'pl-PL' : 'en-GB', {useGrouping:group});
    let fraction = String(positive % 100n).padStart(2, '0');
    while (fraction.length > min && fraction.endsWith('0')) fraction = fraction.slice(0,-1);
    return (value < 0n ? '-' : '') + whole + (fraction ? (lang === 'PL' ? ',' : '.') + fraction : '');
  }
  return {fields, defaults, calculate, round, format};
})();

