import styled from 'styled-components';
import logoGNPColor from '../../../assets/logo_GNP_color.png';
import OptionsGNP from '../OptionsGNP';
import PrintGNP from '../PrintGNP';

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
`;

const ImgLogo = styled.img`
  width: 100%;
  max-width: 150px;
  margin: 0 auto 3em auto;
`;

const HeaderGNP = ({
  text = '¿En qué te podemos ayudar?'
}: { text?: string; }) => {
  return (
    <>
      <ContentHeader>
        <ImgLogo src={logoGNPColor} alt="loco GNP color" />
        {text}
      </ContentHeader>
      <OptionsGNP />
      <PrintGNP />
    </>
  )
};

export default HeaderGNP;
