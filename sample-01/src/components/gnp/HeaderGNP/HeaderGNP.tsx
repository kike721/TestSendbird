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
  text-aling: center;
  width: 100%;
  text-align: center;
  padding: 2em;
`;

const ImgLogo = styled.img`
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
`;

const Text = styled.p`
  margin-top: 3em;
`;

const HeaderGNP = ({
  text,
}: { text?: string; }) => {
  return (
    <>
      <ContentHeader>
        <ImgLogo src={logoGNPColor} alt="loco GNP color" />
        {text && <Text></Text>}
      </ContentHeader>
    </>
  )
};

export default HeaderGNP;
