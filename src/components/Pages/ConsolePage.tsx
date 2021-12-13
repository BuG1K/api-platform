import {
  FunctionComponent, useState, useCallback, memo, useRef,
} from 'react';
import api from '@helpers';

import { useDispatch, actionAddRecord } from '@store';
import ConsolePageStyled from './ConsolePageStyled';
import {
  ConsoleHeader, ConsoleRecords, ConsoleInquiry, ConsoleFooter,
} from '../Console';

const MemoizedConsoleHeader = memo(ConsoleHeader);
const MemoizedConsoleRecords = memo(ConsoleRecords);
const MemoizedConsoleInquiry = memo(ConsoleInquiry);
const MemoizedConsoleFooter = memo(ConsoleFooter);

const ConsolePage: FunctionComponent = () => {
  const refRequest = useRef<HTMLTextAreaElement>(null);
  const [requestError, setRequestError] = useState(false);
  const [responsValue, setResponsValue] = useState('');
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getBody = useCallback((value: string) => {
    let body: {
      action: string
      [key: string]: any
    } | undefined;

    try {
      body = JSON.parse(value);

      if (!body?.action) {
        body = undefined;
        throw Error('There is no key "action"');
      }

      return body;
    } catch {
      return body;
    }
  }, []);

  const getJson = (
    obj: { [key: string]: any },
  ) => JSON.stringify(obj, null, 2);

  const onFetch = useCallback((
    body: { [key: string]: any },
  ) => new Promise((resolve, reject) => {
    setLoading(true);
    setResponsValue('');

    api.sendsay.request(body).then((response: any) => {
      setResponsValue(getJson(response));
      resolve(response);
    }).catch((error: any) => {
      setResponsValue(getJson(error));
      setResponseError(true);
      reject(error);
    }).finally(() => setLoading(false));
  }), []);

  const onChangeRequestValue = useCallback(() => {
    if (requestError) setRequestError(false);
    if (responseError) setResponseError(false);
  }, [requestError, responseError]);

  const onExecuteRecord = useCallback((value: string) => {
    const { current: textAreaElement } = refRequest;
    const body = getBody(value);
    const isValidValue = body ? getJson(body) === value : false;

    if (body && textAreaElement && isValidValue) {
      const record = { name: body.action, value, error: false };

      textAreaElement.value = getJson(body);
      onFetch(body).catch(() => {
        record.error = true;
      }).finally(() => dispatch(actionAddRecord(record)));
    } else {
      setRequestError(true);
    }
  }, []);

  const onSubmit = useCallback(() => {
    const { current: textAreaElement } = refRequest;

    if (textAreaElement) {
      const { value } = textAreaElement;
      const body = getBody(value);
      const isValidValue = body ? getJson(body) === value : false;

      if (body && isValidValue) {
        const record = { name: body.action, value, error: false };

        textAreaElement.value = getJson(body);
        onFetch(body).catch(() => {
          record.error = true;
        }).finally(() => dispatch(actionAddRecord(record)));
      } else {
        setRequestError(true);
      }
    }
  }, []);

  const onFormatRequestValue = useCallback(() => {
    const { current: textAreaElement } = refRequest;

    if (textAreaElement) {
      const { value } = textAreaElement;
      const body = getBody(value);

      if (body) {
        textAreaElement.value = getJson(body);
      } else {
        setRequestError(true);
      }
    }
  }, []);

  return (
    <ConsolePageStyled.Container>
      <MemoizedConsoleHeader />
      <MemoizedConsoleRecords executeRecord={onExecuteRecord} />
      <MemoizedConsoleInquiry
        ref={refRequest}
        onChangeRequestValue={onChangeRequestValue}
        requestError={requestError}
        responseValue={responsValue}
        responseError={responseError}
        loading={loading}
      />
      <MemoizedConsoleFooter
        submit={onSubmit}
        onFormat={onFormatRequestValue}
        loading={loading}
      />
    </ConsolePageStyled.Container>
  );
};

export default ConsolePage;
