import { FunctionComponent } from 'react';

import { IconButton } from '@styles';
import ConsoleFooterStyled from './ConsoleFooterStyled';
import consoleConstants from './consoleConstants';
import { Button } from '../Form';
import { AlignRightIcon } from '../Icons';

interface Props {
  onFetch: VoidFunction
  loading: boolean
  onFormat: VoidFunction
}

const ConsoleFooter: FunctionComponent<Props> = ({
  onFetch, loading, onFormat,
}) => (
  <ConsoleFooterStyled.Container>
    <Button onClick={onFetch} loading={loading}>
      {consoleConstants.send}
    </Button>

    <a href={consoleConstants.linkGitHubHref}>
      {consoleConstants.linkGitHubText}
    </a>

    <IconButton onClick={onFormat} type="button">
      <AlignRightIcon />
      <span style={{ marginLeft: 8 }}>{consoleConstants.format}</span>
    </IconButton>
  </ConsoleFooterStyled.Container>
);

export default ConsoleFooter;
