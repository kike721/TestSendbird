import styled from 'styled-components';

const Content = styled.div`
  padding: 2em;
`;

const WrapOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  font-size: 24;
  justify-content: space-between;
`;

const Text = styled.p`
  color: #1C4481;
  font-size: 24;
  font-weight: 700;
`;

const StyleOption = styled.div`
  background: #fff;
  border-radius: 24px;
  border: solid 2px #FF6E1F;
  color: #FF6E1F;
  display: flex;
  font-size: 24;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  padding: 2em;
  text-align: center;
  width: 100%;
  max-width: 140px;
  margin: 1em 5px;
`;

const PrintGNP = ({
  text = '¿En qué te podemos ayudar?',
  onClickOption,
}: { text?: string; onClickOption: (id: string) => void }) => {
  return (
    <Content>
      <Text>Selecciona la póliza que deseas imprimir:</Text>
      <WrapOptions>
        <StyleOption onClick={() => onClickOption('1')}>
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
    </Content>
  )
};

export default PrintGNP;
