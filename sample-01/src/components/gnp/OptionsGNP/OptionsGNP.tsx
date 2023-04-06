import styled from 'styled-components';
import telephone from '../../../assets/telephone.png';
import print from '../../../assets/print.png';

const WrapOptions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24;
  justify-content: center;
  padding: 2em;
`;

const StyleOption = styled.div`
  background: #FFE9DD;
  color: #FF6E1F;
  display: flex;
  flex-direction: column;
  font-size: 24;
  font-weight: 700;
  justify-content: center;
  padding: 2em;
  text-align: center;
  width: 100%;
  border-radius: 24px;
  margin-bottom: 1em;
`;

const ImgStyle = styled.img`
  width: 100%;
  max-width: 40px;
  margin: 0 auto 1em auto;
`;


const OptionsGNP = ({
  text = '¿En qué te podemos ayudar?'
}: { text?: string; }) => {
  return (
    <WrapOptions>
      <StyleOption>
        <ImgStyle src={telephone} alt="call telephone" />
        Marcar a un agente
      </StyleOption>
      <StyleOption>
        <ImgStyle src={print} alt="call telephone" />
        Imprimir pólizas
      </StyleOption>
    </WrapOptions>
  )
};

export default OptionsGNP;
