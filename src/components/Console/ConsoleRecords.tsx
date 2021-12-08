import {
  FunctionComponent, useState, useRef, useEffect,
} from 'react';
import { render } from 'react-dom';

import {
  useSelector, selectRecords, useDispatch,
  actionDeleteRecord, actionDeleteAllRecords,
} from '@store';
import ConsoleRecordsStyled from './ConsoleRecordsStyled';
import { DotsIcon, CloseIcon } from '../Icons';
import consoleConstants from './consoleConstants';

interface Props {
  onFetchRecord: (body: string) => void
}

const ConsoleRecords: FunctionComponent<Props> = ({ onFetchRecord }) => {
  const [focusRecord, setFocusRecord] = useState<null | string>(null);
  const ref = useRef<HTMLDivElement>();
  const records = useSelector(selectRecords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (focusRecord) {
      const closeActions = () => setFocusRecord(null);

      window.addEventListener('scroll', closeActions);
      window.addEventListener('resize', closeActions);
      window.addEventListener('click', closeActions);

      return () => {
        window.removeEventListener('scroll', closeActions);
        window.removeEventListener('resize', closeActions);
        window.removeEventListener('click', closeActions);
      };
    }

    return undefined;
  }, [focusRecord]);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      const { current: recordElement } = ref;

      if (recordElement) {
        let alertElement = document.createElement('div');

        render(
          (
            <ConsoleRecordsStyled.Copy time="1s">
              Скопировано
            </ConsoleRecordsStyled.Copy>
          ),
          alertElement,
        );
        alertElement = alertElement.firstChild as HTMLDivElement;

        recordElement.appendChild(alertElement);
        setTimeout(() => alertElement.remove(), 1000);
      }
    });
  };

  return (
    <ConsoleRecordsStyled.Container>
      <ConsoleRecordsStyled.Items>
        {records.map(({
          id, error, name, body,
        }) => (
          <ConsoleRecordsStyled.ItemContainer
            key={id}
            ref={(element) => {
              if (focusRecord === id && element) {
                ref.current = element;
              }
            }}
          >
            <ConsoleRecordsStyled.Item onClick={() => setFocusRecord(id)}>
              <ConsoleRecordsStyled.Сircle error={+error} />

              <span style={{ marginLeft: 5 }}>{name}</span>

              <DotsIcon style={{ marginLeft: 11 }} />
            </ConsoleRecordsStyled.Item>

            {focusRecord === id && (
              <ConsoleRecordsStyled.Actions>
                <ConsoleRecordsStyled.BoxActions>
                  <ConsoleRecordsStyled.Action
                    onClick={() => onFetchRecord(body)}
                  >
                    {consoleConstants.execute}
                  </ConsoleRecordsStyled.Action>

                  <ConsoleRecordsStyled.Action
                    onClick={() => onCopy(body)}
                  >
                    {consoleConstants.copy}
                  </ConsoleRecordsStyled.Action>
                </ConsoleRecordsStyled.BoxActions>

                <ConsoleRecordsStyled.Action
                  onClick={() => dispatch(actionDeleteRecord({ id }))}
                  redHover
                >
                  {consoleConstants.delete}
                </ConsoleRecordsStyled.Action>
              </ConsoleRecordsStyled.Actions>
            )}
          </ConsoleRecordsStyled.ItemContainer>
        ))}
      </ConsoleRecordsStyled.Items>

      <ConsoleRecordsStyled.ButtonClear
        onClick={() => dispatch(actionDeleteAllRecords())}
        type="button"
      >
        <CloseIcon />
      </ConsoleRecordsStyled.ButtonClear>
    </ConsoleRecordsStyled.Container>
  );
};

export default ConsoleRecords;
