import styled from 'styled-components';

const WrapOptions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24;
  justify-content: center;
  padding: 2em;

  & p {
    color: #1C4481;
    font-size: 24;
    font-weight: 700;
  }
`;

const StyleOption = styled.div`
  background: #fff;
  border-radius: 24px;
  border: solid 2px #FF6E1F;
  color: #FF6E1F;
  display: flex;
  flex-direction: column;
  font-size: 24;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  padding: 2em;
  text-align: center;
  width: 100%;
`;

const PrintGNP = ({
  text = '¿En qué te podemos ayudar?'
}: { text?: string; }) => {
  return (
    <WrapOptions>
      <p>Selecciona la póliza que deseas imprimir:</p>
      <StyleOption>
        Poliza 1
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
      <StyleOption>
        Poliza 2
      </StyleOption>
    </WrapOptions>
  )
};

export default PrintGNP;
