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
  justify-content: center;
  padding: 2em;
`;

const StyleOption = styled.div`
  background: #FFE9DD;
  border-radius: 24px;
  color: #FF6E1F;
  display: flex;
  flex-direction: column;
  font-size: 24;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 300px;
  padding: 2em;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    filter: brightness(95%);
  }
`;

const ImgStyle = styled.img`
  width: 100%;
  max-width: 40px;
  margin: 0 auto 1em auto;
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
    sbCall.dial({ userId: 'test_dev_agent', isVideoCall, callOption: getCallOption({}) });
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
