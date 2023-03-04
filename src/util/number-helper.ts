function truncDecimal(value: number, digitos = 4): string {
  const valueAsString = `${value}`;

  return `${valueAsString}`.slice(0, valueAsString.indexOf('.') + digitos + 1);
}

export { truncDecimal };
