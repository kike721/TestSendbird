import {useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import {useSbCalls} from "../../../lib/sendbird-calls";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import TopBar from 'components/molecules/TopBar';
import Authenticator from "../../../containers/Authenticator";
import Video1 from '../../../videos/video1.mp4';
import Video2 from '../../../videos/video2.mp4';
import CallView from "../../views/CallView";
import DialView from "../../views/DialView";
import styled from "styled-components";
import {media} from "../../../utils";
import Screen from "../../templates/Screen/Screen";
import * as mixins from "../../../styles/mixins";
import Overlay from "../../atoms/Overlay";
import type { CallState } from "lib/sendbird-calls/SbCallsContext/types";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-bottom: 55px; // TabToolbar height
  ${media.main} {
    padding-bottom: 0;
  }
`;

const Contents = styled(Screen)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: calc(100% - 80px - 57px);
  ${media.main} {
    height: calc(100% - 48px - 56px);
  }
`;

interface DirectCallMainProps {
}
const DirectCallMain: React.FC<DirectCallMainProps> = ({ children }) => {
  const [showOptions, setShowOptions] = useState(false);
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
          ref={refPlayer}
          playing={playVideo}
          url={videos[keyVideo as keyof typeof videos]}
          onEnded={handleOnEnded}
        />
        {showOptions &&
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Card>
              <CardActionArea onClick={() => handleOptionSelect('opt1')}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Opción 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Texto opción 1
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
                    Texto opción 2
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
                    Texto opción 3
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        }
        {showButtonCall && 
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Typography gutterBottom variant="h5" component="div">
              Si aún tienes dudas puedes tener una llamada con un asesor.
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