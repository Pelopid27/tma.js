import type { Component } from 'solid-js';

import type { JSXIntrinsicElementAttrs } from '../types/jsx.js';

export const IconArrowRight24: Component<JSXIntrinsicElementAttrs<'svg'>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}><path fill="currentColor" fill-rule="evenodd" d="M13.374 4.265a1 1 0 0 1 1.413.057l6.448 7a1 1 0 0 1 0 1.356l-6.448 7a1 1 0 1 1-1.47-1.355L18.218 13H3.5a1 1 0 1 1 0-2h14.72l-4.904-5.322a1 1 0 0 1 .058-1.413" clip-rule="evenodd"/></svg>
  );
};
