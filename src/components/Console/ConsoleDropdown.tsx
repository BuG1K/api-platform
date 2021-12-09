import { FunctionComponent, useRef, CSSProperties } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  clip: HTMLElement | undefined
}

const dropdownElement = document.createElement('div');
document.body.appendChild(dropdownElement);

const ConsoleDropdown: FunctionComponent<Props> = ({
  clip, children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const style: CSSProperties = { position: 'absolute', display: 'none' };

  if (clip) {
    const { x, y, height } = clip.getBoundingClientRect();

    if (x < 0) {
      style.left = 0;
    } else {
      style.left = x;
    }

    const { current: containerElement } = containerRef;

    if (containerElement) {
      const { clientHeight } = containerElement;
      const top = y + height + 1;

      if (top + clientHeight > document.documentElement.clientHeight) {
        style.top = y - clientHeight;
      } else {
        style.top = top;
      }
    }

    style.display = 'block';
  }

  return createPortal(
    (
      <div ref={containerRef} style={style}>
        {children}
      </div>
    ), dropdownElement,
  );
};

export default ConsoleDropdown;
