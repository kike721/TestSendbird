import styled from 'styled-components';
import type { DirectCallOption } from 'sendbird-calls';
import { useSbCalls } from 'lib/sendbird-calls';
import telephone from '../../../assets/telephone.png';
import print from '../../../assets/print.png';

const WrapOptions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 24;
  height: 100%;
  justify-content: center;
  margin: auto;
  max-width: 1080px;
  padding: 2em;
`;

const StyleOption = styled.div`
  -webkit-box-pack: center;
  background: rgb(255, 233, 221);
  border-radius: 24px;
  color: rgb(255, 110, 31);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 2.25em;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 2em;
  margin-top: 2em;
  max-width: 85%;
  padding: 1em;
  text-align: center;
  transition: all 0.5s ease 0s;
  width: 100%;

  &:hover {
    filter: brightness(95%);
  }
`;

const ImgStyle = styled.img`
  margin: 0.4em auto;
  max-width: 84px;
  width: 100%;
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

const OptionsGNP = ({
  onClickPrint,
}: { onClickPrint?: () => void; }) => {
  const sbCall = useSbCalls() ;
  const dial = (isVideoCall: boolean) => {
    sbCall.dial({ userId: 'receiver', isVideoCall, callOption: getCallOption({}) });
  };

  return (
    <WrapOptions>
      <StyleOption onClick={() => dial(true)} >
        <ImgStyle src={telephone} alt="call telephone" />
        Marcar a un agente
      </StyleOption>
      <StyleOption onClick={onClickPrint}>
        <ImgStyle src={print} alt="call telephone" />
        Imprimir pólizas
      </StyleOption>
    </WrapOptions>
  )
};

export default OptionsGNP;
