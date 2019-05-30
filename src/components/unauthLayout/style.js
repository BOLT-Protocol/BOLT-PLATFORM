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
    position: relative;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	background-image: url("/static/images/${props => (props.type === 'signup' ? 'login_bg_signup.jpg' : 'login_bg_signin.jpg')}");
    
    &::after {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .48);
        content: '';
    }
    img {
        width: 200px;
        z-index: 1;
    }

    > p {
        position: absolute;
        bottom: 27px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
`;

export const SCmain = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SCcopyright = styled.p`
    color: #fff;
    font-size: 0.625rem;
`;
