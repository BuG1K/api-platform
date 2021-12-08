import {
  FunctionComponent, useEffect, useState, ChangeEventHandler,
} from 'react';

import ConsoleInquiryStyled from './ConsoleInquiryStyled';
import consoleConstants from './consoleConstants';
import { DotsIcon } from '../Icons';

interface Answer {
  value: string
  error: boolean
}

interface Props {
  request: Answer
  onChangeRequestValue: ChangeEventHandler<HTMLTextAreaElement>
  loading: boolean
  response: Answer
}

const ConsoleInquiry: FunctionComponent<Props> = ({
  request, onChangeRequestValue, loading, response,
}) => {
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
        <ConsoleInquiryStyled.Title error={+request.error}>
          {consoleConstants.request}
        </ConsoleInquiryStyled.Title>
        <ConsoleInquiryStyled.Textarea
          hooked={+hooked}
          error={+request.error}
          value={request.value}
          onChange={onChangeRequestValue}
          disabled={loading}
        />
      </ConsoleInquiryStyled.Side>

      <ConsoleInquiryStyled.Rope onMouseDown={() => setHooked(true)}>
        <DotsIcon />
      </ConsoleInquiryStyled.Rope>

      <ConsoleInquiryStyled.Side>
        <ConsoleInquiryStyled.Title error={+response.error}>
          {consoleConstants.response}
        </ConsoleInquiryStyled.Title>
        <ConsoleInquiryStyled.Textarea
          hooked={+hooked}
          error={+response.error}
          value={response.value}
          onChange={(event) => event.preventDefault()}
        />
      </ConsoleInquiryStyled.Side>
    </ConsoleInquiryStyled.Container>
  );
};

export default ConsoleInquiry;
