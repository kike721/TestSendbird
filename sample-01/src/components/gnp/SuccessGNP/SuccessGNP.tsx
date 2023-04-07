import styled from 'styled-components';
import ImgSuccess from '../../../assets/success.png';
import Shape from '../../../assets/Shape.svg';
import HeaderGNP from '../HeaderGNP';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const ContentLogo = styled.div`
  margin: 7em auto;
  text-align: center;
`;

const ImgLogo = styled.img`
  width: 100%;
  max-width: 40px;
  margin: autop;
`;

const Text = styled.p`
  font-size: 24;
  font-weight: 700;
  color: #2E8241;
`;

const ButtonBack = styled.button`
  background: #FFE9DD;
  padding: 1em;
  corder-radius: 20px;
`;

const SuccessGNP = () => {
  return (
    <Content>
      <ContentLogo>
        <ImgLogo src={ImgSuccess} alt="success exitoso imagen" />
        <Text>Póliza impresa</Text>
      </ContentLogo>
      <ButtonBack>
        <img src={Shape} alt="back"></img>
        Regresar al menú
      </ButtonBack>
      <button>Finalizar sesión</button>
      <HeaderGNP />
    </Content>
  )
};

export default SuccessGNP;
