export class CommonUtils {
  static parseNumber(input: string | number, defaultValue = 0): number {
    if (isNaN(+input)) {
      return defaultValue;
    }

    return +input;
  }
}
