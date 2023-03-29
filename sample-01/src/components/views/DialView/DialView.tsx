import styled from 'styled-components';
import type { DirectCallOption } from 'sendbird-calls';

import { AudioDialButton, VideoDialButton } from 'components/atoms/CallButtons';
import { useTextInput } from 'components/atoms/Input';
import { useSbCalls } from 'lib/sendbird-calls';
import * as fonts from 'styles/fonts';
import * as mixins from 'styles/mixins';
import { mediaMaxPhone } from 'utils';

const Wrapper = styled.div`
  padding: 56px 24px;
`;

const TitleContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  box-sizing: border-box;
  border: none;
`;

const ControlsContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  box-sizing: border-box;
  border: none;
  margin-top: 100px;
  position: relative;
  z-index: 10;
`;

const TitleControls = styled.div`
  color:white;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
`;
const Title = styled.div`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 16px;
`;

const HeaderTitle = styled.div`
  color: white;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
`;

const Logo = styled.img`
`;

const CallButton = styled.button`
  align-items: center;
  background: #13283e;
  border: none;
  display: flex;
  flex-direction: column;
  height: 152px;
  width: 156px;
  ${mediaMaxPhone.mobile} {
    height: 130px;
    width: 120px;
  }
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-top: 54px;
  justify-content: space-between;
  width: 100%;
`;

const IconButton = styled.img`
  margin: 36px 54px;
`;

const TextButton = styled.div`
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;
const Description = styled.div`
  ${fonts.normal};
  ${fonts.heavy};
  color: rgb(138, 146, 186);
  height: 40px;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: -0.1px;
`;

const LogoBackground = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ButtonsGroup = styled.div`
  ${mixins.flexCenter};
  margin-top: 16px;
`;

function getCallOption(callOption?: DirectCallOption) {
  return {
    localMediaView: undefined,
    remoteMediaView: undefined,
    videoEnabled: true,
    audioEnabled: true,
    ...callOption,
  };
}


interface DialViewProps {}
const DialView: React.FC<DialViewProps> = props => {
  const sbCall = useSbCalls();
  const AGENT_ID = process.env.REACT_APP_RECEIVER_ID || '';
  const dial = (isVideoCall: boolean) => {
    sbCall.dial({ userId: 'Agente_Motorola', isVideoCall, callOption: getCallOption({}) });
  };

  const handleOnClickCallButton = () => {
    dial(true)
  }

  const handleOnClickWhatsappButton = () => {
    window.open('https://wa.me/14421555140?text=Prueba%20motorola');
  }

  return (
    <Wrapper>
      <TitleContainer>
        <HeaderTitle>Bienvenido al</HeaderTitle>
        <Title>Centro de Experiencia Remota</Title>
        <Logo src='/assets/logo.png'></Logo>
      </TitleContainer>
      <ControlsContainer>
        <TitleControls>¿Cómo Prefieres recibir la asesoría?</TitleControls>
        <ButtonsContainer>
          <CallButton onClick={handleOnClickCallButton}>
            <IconButton src="/assets/icon-video.png"/>
            <TextButton>Videollamada</TextButton>
          </CallButton>
          <CallButton onClick={handleOnClickWhatsappButton}>
            <IconButton src="/assets/icon-whatsapp.png"/>
            <TextButton>Whatsapp</TextButton>
          </CallButton>
        </ButtonsContainer>
      </ControlsContainer>
      <LogoBackground src="/assets/logo_footer.png"/>
    </Wrapper>
  );
};

export default DialView;
