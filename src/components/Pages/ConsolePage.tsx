import { FunctionComponent, useState, ChangeEventHandler } from 'react';
import api from '@helpers';

import {
  actionAddRecord, useSelector, selectRecords, useDispatch,
} from '@store';
import ConsolePageStyled from './ConsolePageStyled';
import {
  ConsoleHeader, ConsoleRecords, ConsoleInquiry, ConsoleFooter,
} from '../Console';

const ConsolePage: FunctionComponent = () => {
  const [request, setRequest] = useState({ value: '', error: false });
  const [response, setResponse] = useState({ value: '', error: false });
  const [loading, setLoading] = useState(false);
  const records = useSelector(selectRecords);
  const dispatch = useDispatch();

  const onFetch = (requestValue: string) => {
    let validRequest: { [key: string]: string } | null = null;

    try {
      validRequest = JSON.parse(requestValue);
      if (!validRequest?.action) {
        validRequest = null;
        throw Error('There is no key "action"');
      }
    } catch {
      setRequest({ ...request, error: true });
    }

    if (validRequest) {
      const record = {
        name: validRequest.action,
        body: requestValue,
        error: false,
      };

      setLoading(true);

      api.sendsay.request(validRequest)
        .then((res: any) => setResponse({
          ...response,
          value: JSON.stringify(res, null, 2),
        })).catch(() => {
          setResponse({ value: '', error: true });
          record.error = true;
        }).finally(() => {
          const isFind = records.find(({ body }) =>
            body.replace(/\s/g, '') === record.body.replace(/\s/g, ''));

          if (!isFind) dispatch(actionAddRecord(record));
          setLoading(false);
        });
    }
  };

  const onFetchRecord = (value: string) => {
    setRequest({ value, error: false });
    onFetch(value);
  };

  const onChangeRequestValue: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setRequest({ value: target.value, error: false });
    if (response.error) setResponse({ ...response, error: false });
  };

  const onFormat = () => {
    try {
      const newValue = JSON.stringify(JSON.parse(request.value), null, 2);

      setRequest({ ...request, value: newValue });
    } catch {
      setRequest({ ...request, error: true });
    }
  };

  return (
    <ConsolePageStyled.Container>
      <ConsoleHeader />
      <ConsoleRecords onFetchRecord={onFetchRecord} />
      <ConsoleInquiry
        request={request}
        response={response}
        onChangeRequestValue={onChangeRequestValue}
        loading={loading}
      />
      <ConsoleFooter
        onFetch={() => onFetch(request.value)}
        onFormat={onFormat}
        loading={loading}
      />
    </ConsolePageStyled.Container>
  );
};

export default ConsolePage;
