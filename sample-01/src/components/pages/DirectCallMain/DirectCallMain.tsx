import { Box, Typography } from '@mui/material';
import type { CallState } from "lib/sendbird-calls/SbCallsContext/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Authenticator from "../../../containers/Authenticator";
import { useSbCalls } from "../../../lib/sendbird-calls";
import { media } from "../../../utils";
import Overlay from "../../atoms/Overlay";
import CallView from "../../views/CallView";
import HeaderGNP from 'components/gnp/HeaderGNP';
import PrintGNP from 'components/gnp/PrintGNP';
import OptionsGNP from 'components/gnp/OptionsGNP';
import SuccessGNP from 'components/gnp/SuccessGNP';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ${media.main} {
    padding-bottom: 0;
  }
`;
interface DirectCallMainProps {
}
const DirectCallMain: React.FC<DirectCallMainProps> = ({ children }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [keyVideo, setKeyVideo] = useState('');
  const refPlayer = useRef(null);
  const { isAuthenticated, calls, clearCalls } = useSbCalls();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const { path, url } = useRouteMatch();

  const [showPrint, setShowPrint] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);

  const restartStates = () => {
    setKeyVideo('loop');
    setPlayVideo(true);
  }

  const handleOptions = () => {
    console.log('entre')
    setShowPrint(true);
  }

  useEffect(() => {
    setKeyVideo('loop');
    setPlayVideo(true);
  },[])

  useEffect(() => {
    if (location.pathname === `${url}/login`) {
      if (isAuthenticated) {
        history.replace('/main/dial');
      }
    }
  }, [isAuthenticated, location.pathname]);

  const onCall = useMemo(() => {
    return calls.find(call => call.isOngoing)
  }, [calls])

  const header = location.pathname === `${url}/login`
    ? null
    :
      <Authenticator key="authenticator"/>;

  useEffect(() => {
    if (onCall) {
      const { callState } = onCall;
      console.log(callState, 'Estado de la llamada')
      if (callState === 'ended' as CallState) {
        restartStates();
        clearCalls();
      }
    }
  }, [onCall])

  return (
    <Wrapper>
      {!!calls.length && <CallView call={calls[calls.length - 1]}/>}
      {header}
      {!showPrint &&
        <>
          <HeaderGNP text='¿En qué te podemos ayudar?' />
          <OptionsGNP onClickPrint={() => handleOptions}/>
        </>
      }
      {false &&
        <>
          <HeaderGNP text='¿En qué te podemos ayudar?' />
          <PrintGNP />
        </>
      }
      {showSuccess && showPrint && <SuccessGNP />}
      {onCall &&
        <Overlay>
          <CallView call={onCall} />
        </Overlay>
      }
    </Wrapper>
  );
};

export default DirectCallMain;