import React from 'react';
import styled from 'styled-components';

const SCcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;

  > img {
      width: 350px;
      height: 190px;
  }

  > p {
      color: #ff007f;
      font-size: 1.5rem;
      width: 350px;
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      align-items: center;

      img {
          width: 50px;
          height: 56px;
      }
  }
`;

export default function () {
    return (
        <SCcontainer>
            <img src="/static/images/working.png" alt="Working" />

            <p>
                <img src="/static/images/cones.svg" alt="Cones" />

                <span>
                    趕工中
                </span>

                <img src="/static/images/cones.svg" alt="Cones" />
            </p>
        </SCcontainer>
    );
}