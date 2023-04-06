import { useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as mixins from 'styles/mixins';
import ReactPlayer from 'react-player';
import Video from '../../../videos/gnp1.mp4';
import logoGNPWhite from '../../../assets/logo_GNP_blanco.png';
import selection from '../../../assets/selection.png';

const Wrapper = styled.div`
  ${mixins.fullScreen};
  padding: 33px;
  position: relative;

  &::after {
    background-color: #000;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.3;
    position: absolute;
    right: 0;
    top: 0;
  }

  & video {
    width: auto !important;
  }
`;

const ContentClick = styled.div`
  align-items: center;
  bottom: 0;
  color: var(--white);
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-weight: 700;
  justify-content: center;
  left: 0;
  padding: 1em;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  z-index: 10;

  & span {
    font-size: 18px;
    margin-top: 10px;
  }
`;

const ImgLogo = styled.img`
  width: 100%;
  max-width: 150px;
  margin: 0 auto 5em auto;
`;

const ImgSelect = styled.img`
  width: 100%;
  max-width: 80px;
  margin: 1em auto 0.5em auto;
`;

const VideoGNP = () => {
  const [playVideo,] = useState(true);
  const history = useHistory();

  const handleSection = () => {
    history.push(`/direct-call/full-screen`);
  }

  return (
    <Wrapper>
      <ReactPlayer
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          minWidth: '100%',
          minHeight: '100%',
        }}
        playing={playVideo}
        url={Video}
        loop={true}
      />
      <ContentClick>
        <ImgLogo src={logoGNPWhite} alt="loco GNP color" />
        <p>Te damos la bienvenida al kiosko de servicio</p>
        <ImgSelect src={selection} alt="click selected" onClick={handleSection}/>
        <span>Toca para iniciar</span>
      </ContentClick>
    </Wrapper>
  );
}

export default VideoGNP;
