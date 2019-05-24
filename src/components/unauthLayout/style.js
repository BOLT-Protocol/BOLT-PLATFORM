import styled from 'styled-components';

export const SClayout = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;

    > div {
        flex: 1;
    }

    > main {
        flex: 0.8;
    }
`;

export const SCimage = styled.div`
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url("/static/images/${props => (props.type === 'signup' ? 'login_bg_signup.jpg' : 'login_bg_signin.jpg')}");
`;

export const SCmain = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
`;
