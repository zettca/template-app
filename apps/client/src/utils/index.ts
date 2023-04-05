export const noop = () => {
  // empty
};

/**
 * Focuses the HTML `element` passed as input on mount.
 * @example
 * ```tsx
 * <Component ref={focusElement} />
 * ```
 */
export const focusElement = <T extends HTMLElement>(element: T | null) =>
  element?.focus();
