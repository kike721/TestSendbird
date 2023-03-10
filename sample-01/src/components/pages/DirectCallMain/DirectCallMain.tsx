import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import TopBar from 'components/molecules/TopBar';
import type { CallState } from "lib/sendbird-calls/SbCallsContext/types";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Authenticator from "../../../containers/Authenticator";
import { useSbCalls } from "../../../lib/sendbird-calls";
import * as mixins from "../../../styles/mixins";
import { media } from "../../../utils";
import Video1 from '../../../videos/video1.mp4';
import Video2 from '../../../videos/video2.mp4';
import Overlay from "../../atoms/Overlay";
import Screen from "../../templates/Screen/Screen";
import CallView from "../../views/CallView";
import DialView from "../../views/DialView";

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

  // const setFullScreen = () => {
  //   const player = document.getElementsByTagName('video')[0];
  //   player.requestFullscreen();
  // }

  const videos = {
    loop: Video1,
    opt1: Video2,
    opt2: Video1,
    opt3: Video2,
  }

  const handleOnEnded = () => {
    setShowOptions(keyVideo === 'loop');
    setShowButtonCall(keyVideo !== 'loop');
    setPlayVideo(false);
  }

  const handleOptionSelect = (opt: string) => {
    setShowOptions(false);
    setKeyVideo(opt);
    setPlayVideo(true);
  }

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

  // useEffect(() => {
  //   if (keyVideo.includes('opt') && !showOptions) {
  //     setFullScreen();
  //   }
  // }, [keyVideo, showOptions])

  const onCall = useMemo(() => {
    return calls.find(call => call.isOngoing)
  }, [calls])

  const header = location.pathname === `${url}/login`
    ? null
    : [
      <TopBar key='topbar'/>,
      <Authenticator key="authenticator"/>,
    ];

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
        <ReactPlayer
          width="100%"
          height="100%"
          ref={refPlayer}
          playing={playVideo}
          url={videos[keyVideo as keyof typeof videos]}
          onEnded={handleOnEnded}
        />
        {showOptions &&
          <BoxOptions>
            <Card>
              <CardActionArea onClick={() => handleOptionSelect('opt1')}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Opción 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    POLIZA GASTOS MAYORES
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card>
              <CardActionArea onClick={() => handleOptionSelect('opt2')}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Opción 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    POLIZA ACCIDENTES PERSONALES
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card>
              <CardActionArea onClick={() => handleOptionSelect('opt3')}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Opción 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    POLIZA SEGURO DE SALUD
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </BoxOptions>
        }
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