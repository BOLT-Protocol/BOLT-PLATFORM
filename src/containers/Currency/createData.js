import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import InputField from '../../components/inputField';
import { fontWhite, fontGray, bgDark } from '../../widgets/styleGuid';
import { WGmainButton } from '../../widgets/button';

const SCbasic = styled.div`
    padding: 50px;
    display: flex;
    justify-content: space-between;
    flex: 1;

    > div {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        margin-left: 4rem;
        align-items: center;
    }

    ul {
        flex: 1;

        li {
            display: flex;

            span {
                flex: 1;
                text-align: right;
                margin-right: .875rem;
                font-size: .875rem;
                padding-top: .3rem;
            }

            > div {
                flex: 6;
                display: flex;
            }
        }
    }
`;

const SCshowOption = styled.div`
    display: flex;
    color: ${fontWhite};
    margin-top: 38px;
    align-items: center;

    input {
        background-color: ${fontGray};
        margin-right: 0.5rem;
        height: 1rem;
        width: 1rem;
    }
`;

const SCupload = styled.label`
    display: flex;
    flex-direction: column;
    color: ${fontGray};
    font-size: 0.75rem;
    width: 150px;
    height: 150px;
    background-color: ${bgDark};
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    ${props => props.image ? `background-image: url(${props.image});` : ''}
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    
    h4 {
        color: ${fontWhite};
        font-size: 0.75rem;
        margin: 1.5rem 0 0 0;
    }

    img {
        margin: 1.25rem 0;
        width: 22.7px;
        height: 14.7px;
    }
    
    input {
        display: none;
    }

    p {
        text-align: center;
    }
`;

const CreateData = ({ handleInput, inputs, handleImage, image, handlePublish, publish }) => (
    <SCbasic>
        <ul>
            {Object.keys(inputs).map(key => {
                const inputProps = {
                    ...inputs[key],
                    name: key,
                    inputValue: inputs[key].value,
                    setInput: handleInput
                };

                return (
                    <li key={key}>
                        <span>{inputs[key].title}</span>

                        {key === 'address' ? (
                            <div>
                                <InputField {...inputProps} />
                                <WGmainButton style={{ width: 'initial', height: '25.5px', minWidth: '102px' }}>相容性檢視</WGmainButton>
                            </div>
                        ) : (<InputField {...inputProps} />)}
                    </li>
                );
            })}
        </ul>

        <div>
            <SCupload image={image}>

                <input type="file" onChange={handleImage} accept="image/*" />

                {!image && (
                    <>
                        <h4>上傳 Logo</h4>

                        <img src="/static/images/ic-cloud-upload.svg" alt="upload" />

                        <p>
                            最大尺寸 1 mb<br />
                            檔案類型限 jpg, png, gif
                        </p>
                    </>
                )}

            </SCupload>

            <SCshowOption>
                <input type="checkbox" onChange={handlePublish} checked={publish} />

                是否顯示於平台首頁
            </SCshowOption>

        </div>

    </SCbasic>
);

CreateData.propTypes = {
    handleInput: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    handleImage: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    handlePublish: PropTypes.func.isRequired,
    publish: PropTypes.bool.isRequired
};

export default CreateData;