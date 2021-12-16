import {
  FunctionComponent, useState, useEffect, useCallback,
} from 'react';
import fscreen from 'fscreen';

import {
  useSelector, selectUser, useDispatch, actionLogout,
} from '@store';
import logoImage from '@images/logo.svg';
import { IconButton } from '@styles';
import ConsoleHeaderStyled from './ConsoleHeaderStyled';
import consoleConstants from './consoleConstants';
import { LogoutIcon, FullExitIcon, FullIcon } from '../Icons';

const ConsoleHeader: FunctionComponent = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const { login, sublogin } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fscreen.fullscreenEnabled) {
      const handleFullscreenChange = () =>
        setFullScreen(fscreen.fullscreenElement !== null);

      fscreen.addEventListener(
        'fullscreenchange',
        handleFullscreenChange,
        false,
      );

      return () => {
        fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
      };
    }

    return undefined;
  });

  const toggleFullscreen = useCallback(() => {
    if (fullScreen) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(document.documentElement);
    }
  }, [fullScreen]);

  return (
    <ConsoleHeaderStyled.Container>
      <ConsoleHeaderStyled.Side>
        <img src={logoImage} alt="logo" />
        <ConsoleHeaderStyled.Title>
          {consoleConstants.title}
        </ConsoleHeaderStyled.Title>
      </ConsoleHeaderStyled.Side>

      <ConsoleHeaderStyled.Side>
        <ConsoleHeaderStyled.Login>
          <span>{login}</span>
          {sublogin && (
            <>
              <ConsoleHeaderStyled.Dividing>:</ConsoleHeaderStyled.Dividing>
              <span>{sublogin}</span>
            </>
          )}
        </ConsoleHeaderStyled.Login>

        <IconButton
          style={{ marginLeft: 26 }}
          onClick={() => dispatch(actionLogout())}
          type="button"
        >
          <span>{consoleConstants.exit}</span>
          <LogoutIcon style={{ marginLeft: 11 }} />
        </IconButton>

        <IconButton
          style={{ marginLeft: 26 }}
          type="button"
          onClick={toggleFullscreen}
        >
          {fullScreen ? <FullExitIcon /> : <FullIcon />}
        </IconButton>
      </ConsoleHeaderStyled.Side>
    </ConsoleHeaderStyled.Container>
  );
};

export default ConsoleHeader;
