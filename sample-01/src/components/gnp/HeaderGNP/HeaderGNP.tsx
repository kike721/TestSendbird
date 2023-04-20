import styled from 'styled-components';
import logoGNPColor from '../../../assets/logo_GNP_color.png';

const ContentHeader = styled.div`
  background: #F4F7FF;
  color: #1C4481;
  display: flex;
  flex-direction: column;
  font-size: 24;
  font-weight: 700;
  justify-content: center;
  padding: 2em;
  padding: 5em 2em;
  text-align: center;
  text-aling: center;
  width: 100%;
`;

const ImgLogo = styled.img`
  margin: 0 auto;
  max-width: 370px;
  width: 100%;
`;

const Text = styled.p`
  font-size: 3em;
  margin-top: 2em;
`;

const HeaderGNP = ({
  text,
}: { text?: string; }) => {
  return (
    <>
      <ContentHeader>
        <ImgLogo src={logoGNPColor} alt="loco GNP color" />
        {text && <Text>{text}</Text>}
      </ContentHeader>
    </>
  )
};

export default HeaderGNP;
