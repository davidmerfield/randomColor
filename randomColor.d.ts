// Type definitions for randomColor 0.4.1
// Project: https://github.com/davidmerfield/randomColor
// Definitions by: Mathias Feitzinger <https://github.com/feitzi>, Brady Liles <https://github.com/BradyLiles>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface RandomColorOptions {
  hue?:
    | number
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'monochrome'
    | 'random';
  luminosity?: 'bright' | 'light' | 'dark' | 'random';
  count?: number;
  seed?: number | string;
  format?: 'hsvArray' | 'hslArray' | 'hsl' | 'hsla' | 'rgbArray' | 'rgb' | 'rgba' | 'hex';
}

export function randomColor(options?: RandomColorOptions): string;
