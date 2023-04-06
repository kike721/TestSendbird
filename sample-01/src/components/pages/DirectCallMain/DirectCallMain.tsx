import { Box, Typography } from '@mui/material';
import type { CallState } from "lib/sendbird-calls/SbCallsContext/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Authenticator from "../../../containers/Authenticator";
import { useSbCalls } from "../../../lib/sendbird-calls";
import * as mixins from "../../../styles/mixins";
import { media } from "../../../utils";
import Overlay from "../../atoms/Overlay";
import Screen from "../../templates/Screen/Screen";
import CallView from "../../views/CallView";
import DialView from "../../views/DialView";
import HeaderGNP from 'components/gnp/HeaderGNP';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.main} {
    padding-bottom: 0;
  }
`;

const BoxOptions = styled.div`
  display: flex;
  justifyContent: space-betweens;
  position: absolute;
`;

const Contents = styled(Screen)`
  ${mixins.flexCenter};
  flex-direction: colum;
  height: calc(100% - 150px);
  ${media.main} {
    height: calc(100% - 150px);
  }
`;

interface DirectCallMainProps {
}
const DirectCallMain: React.FC<DirectCallMainProps> = ({ children }) => {
  const [showOptions, setShowOptions] = useState(true);
  const [showButtonCall, setShowButtonCall] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [keyVideo, setKeyVideo] = useState('');
  const refPlayer = useRef(null);
  const { isAuthenticated, calls, clearCalls } = useSbCalls();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const { path, url } = useRouteMatch();

  const restartStates = () => {
    setShowOptions(false);
    setKeyVideo('loop');
    setShowButtonCall(false);
    setPlayVideo(true);
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
      <Contents>
        <HeaderGNP />
        {showButtonCall && 
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Typography gutterBottom variant="h5" component="div">
              ¿Necesitas  ayuda adicional para llenar el cuestionario o tiene preguntas sobre tu póliza?
            </Typography>
            <DialView />
          </Box>
        }
        {onCall &&
          <Overlay>
            <CallView call={onCall} />
          </Overlay>
        }
      </Contents>
    </Wrapper>
  );
};

export default DirectCallMain;