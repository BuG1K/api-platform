import { useEffect, useState, forwardRef } from 'react';

import ConsoleInquiryStyled from './ConsoleInquiryStyled';
import consoleConstants from './consoleConstants';
import { DotsIcon } from '../Icons';

interface Props {
  loading: boolean
  requestError: boolean
  responseValue: string
  responseError: boolean
  onChangeRequestValue: VoidFunction
}

const ConsoleInquiry = forwardRef<HTMLTextAreaElement, Props>(({
  loading, requestError, responseValue, responseError, onChangeRequestValue,
}, ref) => {
  const [rope, setRope] = useState(0);
  const [hooked, setHooked] = useState(false);

  useEffect(() => {
    const resize = () => {
      setRope(0);
      setHooked(false);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (hooked) {
      const center = document.documentElement.clientWidth / 2;

      const mousemove = ({ clientX }: MouseEvent) => {
        const newRope = center - clientX;

        if (newRope < center / 2 && newRope * -1 < center / 2) {
          setRope(newRope);
        }
      };
      const mouseup = () => setHooked(false);

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      };
    }

    return undefined;
  }, [hooked]);

  return (
    <ConsoleInquiryStyled.Container
      style={{ gridTemplateColumns: `calc(50% - 5px - ${rope}px) 10px auto` }}
    >
      <ConsoleInquiryStyled.Side>
        <ConsoleInquiryStyled.Title error={+requestError}>
          {consoleConstants.request}
        </ConsoleInquiryStyled.Title>
        <ConsoleInquiryStyled.Textarea
          ref={ref}
          onChange={onChangeRequestValue}
          hooked={+hooked}
          error={+requestError}
          disabled={loading}
        />
      </ConsoleInquiryStyled.Side>

      <ConsoleInquiryStyled.Rope onMouseDown={() => setHooked(true)}>
        <DotsIcon />
      </ConsoleInquiryStyled.Rope>

      <ConsoleInquiryStyled.Side>
        <ConsoleInquiryStyled.Title error={+responseError}>
          {consoleConstants.response}
        </ConsoleInquiryStyled.Title>
        <ConsoleInquiryStyled.Textarea
          hooked={+hooked}
          error={+responseError}
          value={responseValue}
          onChange={(event) => event.preventDefault()}
        />
      </ConsoleInquiryStyled.Side>
    </ConsoleInquiryStyled.Container>
  );
});

export default ConsoleInquiry;
