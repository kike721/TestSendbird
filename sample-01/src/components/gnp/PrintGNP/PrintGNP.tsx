import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PolicyType } from 'types';
import { getPolicies } from '../../../api';
import Shape from '../../../assets/Shape.svg';

const Content = styled.div`
  height: 100%;
  margin: auto;
  max-width: 1080px;
  padding: 2em;
  width: 100%;
`;

const WrapOptions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 24;
  justify-content: space-between;
`;

const Text = styled.p`
  color: #1C4481;
  font-size: 2.25em;
  font-weight: 700;
`;

const StyleOption = styled.div`
  background: #fff;
  border-radius: 24px;
  border: solid 2px #FF6E1F;
  color: #FF6E1F;
  cursor: pointer;
  display: flex;
  font-size: 2.25em;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  margin: 1em 5px;
  max-width: 45%;
  padding: 2em;
  ransition: all 0.5s;
  text-align: center;
  width: 100%;

  &:hover {
    filter: brightness(95%);
  }
`;

const ButtonBack = styled.button`
  background: #FFE9DD;
  border-radius: 24px;
  color: #FF6E1F;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 2.25em;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 690px;
  padding: 1.5em;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: all 0.5s;

  & img {
    width: 100%;
    max-width: 60px;
    margin: 0 1em;
  }

  &:hover {
    filter: brightness(95%);
  }
`;

const PrintGNP = ({
  text = '¿En qué te podemos ayudar?',
  onClickOption,
  onClickBackMenu,
}: { text?: string; onClickOption: (id: string) => void; onClickBackMenu: () => void }) => {
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  useEffect(() => {
    getPolicies().then(response => {
      if (response.data) {
        setPolicies(response.data);
      } else {
        console.log(response.error);
      }
    }).catch(error => {
      // setPolicies(error);
      console.log(error);
    })
  }, []);

  return (
    <Content>
      <ButtonBack onClick={onClickBackMenu}>
        <img src={Shape} alt="back"></img>
        Regresar al menú
      </ButtonBack>
      <Text>Selecciona la póliza que deseas imprimir:</Text>
      <WrapOptions>
        {policies.map(policy =>
          <StyleOption onClick={() => onClickOption(policy.policy_id.toString())}>
            {policy.name}
          </StyleOption>
        )}
      </WrapOptions>
    </Content>
  )
};

export default PrintGNP;
