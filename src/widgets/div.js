import styled from 'styled-components';

export const WGloginField = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    width: 50%;
    min-width: 380px;
    min-height: 50%;

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    form {
        margin-top: 40px;
    }
`;

export const WGbuttonField = styled.div`
    min-height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 100%;
`;
