import { useEffect, useState, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import TopBar from 'components/molecules/TopBar';
import Video1 from '../../../videos/video1.mp4';
import Video2 from '../../../videos/video2.mp4';
import Overlay from "../../atoms/Overlay";
import CallView from "../../views/CallView";
import storage from 'lib/storage';

import { useSbCalls } from 'lib/sendbird-calls';
import { SoundType } from 'sendbird-calls';
import type { AuthOption, DirectCallOption } from 'sendbird-calls';



const TotemPage = () => {
  const sbCalls = useSbCalls();
  const { calls } = sbCalls;
  const APP_ID = process.env.REACT_APP_APP_ID || '';
  const USER_ID = process.env.REACT_APP_USER_ID || '';
  const RECEIVER_ID = process.env.REACT_APP_RECEIVER_ID || '';
  const [showOptions, setShowOptions] = useState(false);
  const [showButtonCall, setShowButtonCall] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [keyVideo, setKeyVideo] = useState('');
  const refPlayer = useRef(null);

  function getCallOption(callOption?: DirectCallOption) {
    return {
      localMediaView: undefined,
      remoteMediaView: undefined,
      videoEnabled: true,
      audioEnabled: true,
      ...callOption,
    };
  }

  const loginCalls = () => {
    const option: AuthOption = { userId: USER_ID };
    sbCalls.init(APP_ID);
    sbCalls.addDirectCallSound(SoundType.DIALING, '/sounds/Dialing.mp3');
    sbCalls.addDirectCallSound(SoundType.RINGING, '/sounds/Ringing.mp3');
    sbCalls.addDirectCallSound(SoundType.RECONNECTING, '/sounds/Reconnecting.mp3');
    sbCalls.addDirectCallSound(SoundType.RECONNECTED, '/sounds/Reconnected.mp3');
    return sbCalls.auth(option)
      .then(user => {
        storage.setItem('sbCalls', { appId: APP_ID, userId: USER_ID });
      })
      .catch(error => {
        console.log('error', error)
      });
  }

  const onCall = useMemo(() => {
    return calls.find(call => call.isOngoing)
}, [calls])

  const dial = () => {
    sbCalls.dial({ userId: RECEIVER_ID, isVideoCall: true, callOption: getCallOption({}) });
  };

  const handleOptionSelect = (opt: string) => {
    setShowOptions(false);
    setKeyVideo(opt);
    setPlayVideo(true);
  }

  const setFullScreen = () => {
    const player = document.getElementsByTagName('video')[0];
    player.requestFullscreen();
  }

  const videos = {
    loop: Video1,
    opt1: Video2,
    opt2: Video1,
    opt3: Video2,
  }

  const Wrapper = styled.div`
    padding-top: 80px;
    width: 100%;
  `;

  const handleOnEnded = () => {
    setShowOptions(keyVideo === 'loop');
    setShowButtonCall(keyVideo !== 'loop');
    setPlayVideo(false);
  }

  useEffect(() => {
    setKeyVideo('loop');
    setPlayVideo(true);
  },[])

  useEffect(() => {
    if (keyVideo.includes('opt') && !showOptions) {
      setFullScreen();
    }
  }, [keyVideo, showOptions])

  useEffect(() => {
    if (showButtonCall) {
      loginCalls();
    }
  }, [showButtonCall])

  return (
    <>
      <TopBar/>
      <Wrapper>
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
            <Button onClick={() => dial()} variant="contained" endIcon={<VideoCameraFrontIcon/>}>
              Llamar
            </Button>
          </Box>
          // <DirectCallMain/>
        }
        {onCall &&
          <Overlay>
            <CallView call={onCall} />
          </Overlay>
        }
      </Wrapper>
    </>
  )
}

export default TotemPage;