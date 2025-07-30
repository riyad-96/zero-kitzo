export function zeroTooltip(
  element: string | Element | NodeListOf<Element> | HTMLCollection,
  config?: {
    /**
     * The tooltip text to display (default: "Tool tip")
     */
    tooltip?: string;

    /**
     * Direction where tooltip appears: 'top', 'right', 'bottom', or 'left' (default: 'bottom')
     */
    direction?: 'top' | 'right' | 'bottom' | 'left';

    /**
     * Show an arrow pointing to the target ('on' or 'off', default: 'off')
     */
    arrow?: 'on' | 'off';

    /**
     * Distance in pixels between the tooltip and the target element (default: 10)
     */
    offset?: number;

    /**
     * Optional custom class to add to the tooltip (for styling)
     */
    customClass?: string;

    /**
     * Inline styles to apply (excluding top, left, right, bottom, position, zIndex, opacity, transform, translate, scale, rotate, perspective)
     */
    style?: Partial<CSSStyleDeclaration>;
  }
): void;

export function zeroRipple(
  element: string | Element | NodeListOf<Element> | HTMLCollection,
  config?: {
    /**
     * Ripple opacity (0 to 1). Default: 0.5
     */
    opacity?: number;
    /**
     * Animation duration in seconds ('s'). Default: 1
     */
    duration?: number;
    /**
     * Ripple color (CSS color). Default: 'white'
     */
    color?: string;
    /**
     * Ripple size in pixels ('px'). If null, auto-scales based on button size. Default: null
     */
    size?: number | null;
  }
): void;

export function zeroCopy(element: string | Element | NodeListOf<Element>, docs: string): void;