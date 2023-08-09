declare module 'randomcolor' {
  /** This is needed to get IDE autocomplete on Literal Unions.
   * See: https://github.com/microsoft/TypeScript/issues/29729 */
  type LiteralUnion<T extends U, U = string> = T | (U & { msPls?: never });

  type Hue = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'monochrome';
  type Format = 'rgb' | 'rgba' | 'rgbArray' | 'hsl' | 'hsla' | 'hslArray' | 'hex';
  type Luminosity = 'bright' | 'light' | 'dark';

  interface Options {
    /** Controls the hue of the generated color.
     * If you pass a hexidecimal color string such as #00FFFF,
     * randomColor will extract its hue value and use that to generate colors. */
    hue?: LiteralUnion<Hue>;
    /** Controls the luminosity of the generated color */
    luminosity?: Luminosity;
    /** integer or string which when passed will cause randomColor to return the same color each time. */
    seed?: number | string;
    /** A string which specifies the format of the generated color */
    format?: Format;
    /** A decimal between 0 and 1. Only relevant when using a format with an alpha channel  */
    alpha?: number;
  }

  interface WithCount extends Options {
    /** An integer which specifies the number of colors to generate */
    count: number;
  }

  /** Without any args. returns string */
  export default function randomColor(): string;

  /** with Options, but without count. returns string */
  export default function randomColor(options: Options): string;

  /** With count, returns array of strings. */
  export default function randomColor(options: WithCount): string[];
}
