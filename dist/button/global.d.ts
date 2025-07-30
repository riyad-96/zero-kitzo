declare module 'zero-kitzo/kitzoBtn' {
  export as namespace kitzoBtn;

  export function zeroTooltip(
    element: string | Element | NodeListOf<Element> | HTMLCollection,
    config?: {
      tooltip?: string;
      direction?: 'top' | 'right' | 'bottom' | 'left';
      arrow?: 'on' | 'off';
      offset?: number;
      customClass?: string;
      style?: Partial<CSSStyleDeclaration>;
    }
  ): void;

  export function zeroRipple(
    element: string | Element | NodeListOf<Element> | HTMLCollection,
    config?: {
      opacity?: number;
      duration?: number;
      color?: string;
      size?: number | null;
    }
  ): void;

  export function zeroCopy(element: string | Element | NodeListOf<Element>, docs: string): void;
}

declare global {
  interface Window {
    kitzoBtn: typeof import('zero-kitzo/kitzoBtn');
  }
}
