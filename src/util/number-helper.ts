const DEFAULT_TRUNC_PRECISION = 4;

function truncDecimal(value: number, digits = DEFAULT_TRUNC_PRECISION): string {
  const valueAsString = `${value}`;

  return `${valueAsString}`.slice(0, valueAsString.indexOf('.') + digits + 1);
}

export { truncDecimal };
