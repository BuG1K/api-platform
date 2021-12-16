import {
  FunctionComponent, useState, useEffect, useRef, useCallback,
} from 'react';
import { render } from 'react-dom';

import {
  useSelector, selectRecords, useDispatch,
  actionDeleteRecord, actionDeleteAllRecords,
} from '@store';
import ConsoleRecordsStyled from './ConsoleRecordsStyled';
import { DotsIcon, CloseIcon } from '../Icons';
import consoleConstants from './consoleConstants';
import ConsoleDropdown from './ConsoleDropdown';

interface Props {
  executeRecord: (value: string) => void
}

const ConsoleRecords: FunctionComponent<Props> = ({ executeRecord }) => {
  const [focusRecord, setFocusRecord] = useState<{
    id: string
    value: string
    target: HTMLElement
  } | null>(null);
  const refRecords = useRef<HTMLDivElement>(null);
  const records = useSelector(selectRecords);
  const dispatch = useDispatch();

  useEffect(() => {
    const { current: recordsElement } = refRecords;

    if (focusRecord && recordsElement) {
      const closeActions = () => setFocusRecord(null);
      const click = ({ target }: MouseEvent) => {
        let isRecord = false;

        recordsElement.querySelectorAll('div').forEach((element) => {
          if (target === element) {
            isRecord = true;
          }
        });

        if (!isRecord) closeActions();
      };

      window.addEventListener('scroll', closeActions);
      window.addEventListener('resize', closeActions);
      window.addEventListener('click', click);
      recordsElement.addEventListener('scroll', closeActions);

      return () => {
        window.removeEventListener('scroll', closeActions);
        window.removeEventListener('resize', closeActions);
        window.removeEventListener('click', click);
        recordsElement.removeEventListener('scroll', closeActions);
      };
    }

    return undefined;
  }, [focusRecord]);

  const onCopy = useCallback((text: string, element: HTMLElement) => {
    navigator.clipboard.writeText(text).then(() => {
      if (element) {
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

        element.appendChild(alertElement);
        setTimeout(() => alertElement.remove(), 1000);
      }
    });
  }, []);

  return (
    <ConsoleRecordsStyled.Container>
      <ConsoleRecordsStyled.Items ref={refRecords}>
        {records.map(({
          id, error, name, value,
        }) => (
          <ConsoleRecordsStyled.Item
            key={id}
            onClick={({ target }: any) => setFocusRecord({ id, value, target })}
          >
            <ConsoleRecordsStyled.Сircle error={+error} />

            <ConsoleRecordsStyled.Name>{name}</ConsoleRecordsStyled.Name>

            <DotsIcon style={{ marginLeft: 11 }} />
          </ConsoleRecordsStyled.Item>
        ))}
      </ConsoleRecordsStyled.Items>

      <ConsoleDropdown clip={focusRecord?.target}>
        <ConsoleRecordsStyled.Actions>
          <ConsoleRecordsStyled.BoxActions>
            <ConsoleRecordsStyled.Action
              onClick={() => focusRecord && executeRecord(focusRecord.value)}
            >
              {consoleConstants.execute}
            </ConsoleRecordsStyled.Action>

            <ConsoleRecordsStyled.Action
              onClick={() => focusRecord && onCopy(
                focusRecord.value,
                focusRecord.target,
              )}
            >
              {consoleConstants.copy}
            </ConsoleRecordsStyled.Action>
          </ConsoleRecordsStyled.BoxActions>

          <ConsoleRecordsStyled.Action
            onClick={() => focusRecord && dispatch(actionDeleteRecord({
              id: focusRecord.id,
            }))}
            redHover
          >
            {consoleConstants.delete}
          </ConsoleRecordsStyled.Action>
        </ConsoleRecordsStyled.Actions>
      </ConsoleDropdown>

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
