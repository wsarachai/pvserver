import styled from "styled-components";

export const CurrentPlantDiv = styled.div`
    position: absolute;
    left: 0;
    top: 30px;
    transform: rotate(${props => `${props.angle}deg`});
`