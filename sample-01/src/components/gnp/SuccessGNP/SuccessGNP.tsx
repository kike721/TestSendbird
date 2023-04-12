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
  border-radius: 24px;
  color: #FF6E1F;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 250px;
  padding: 1.5em;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: all 0.5s;

  & img {
    width: 25px;
    margin: 0 1em;
  }

  &:hover {
    filter: brightness(95%);
  }
`;

const ButtonSession = styled.button`
  align-items: center;
  background: #fff;
  border-radius: 24px;
  border-radius: 24px;
  border: solid 2px #FF6E1F;
  color: #FF6E1F;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 250px;
  padding: 1.5em;
  text-align: center;
  transition: all 0.5s;
  width: 100%;

  &:hover {
    filter: brightness(95%);
  }
`;

const SuccessGNP = ({
  onClickBackMenu,
  onClickEndSession
}: {
  onClickBackMenu: () => void;
  onClickEndSession: () => void;
}) => {
  return (
    <Content>
      <ContentLogo>
        <ImgLogo src={ImgSuccess} alt="success exitoso imagen" />
        <Text>Póliza impresa</Text>
      </ContentLogo>
      <div>
        <ButtonBack onClick={onClickBackMenu}>
          <img src={Shape} alt="back"></img>
          Regresar al menú
        </ButtonBack>
        <ButtonSession onClick={onClickEndSession}>
          Finalizar sesión
        </ButtonSession>
      </div>
      <HeaderGNP />
    </Content>
  )
};

export default SuccessGNP;
