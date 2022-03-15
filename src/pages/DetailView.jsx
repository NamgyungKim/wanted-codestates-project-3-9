import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { toggleLikeButton } from '../redux/actions';
import Grade from '../components/Grade';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { copy } from '../util';

const DetailView = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data);
  const location = useLocation();
  const path = location.pathname.split('/');
  const pageId = path[path.length - 1];

  const clickLikeBtn = id => {
    dispatch(toggleLikeButton(id));
  };

  const getStarfromRate = reviewRate => {
    let initClicked = [false, false, false, false, false];
    for (let i = 0; i < reviewRate; i++) {
      initClicked[i] = true;
    }
    return initClicked;
  };

  const { id, productNm, productImg, reviewRate, likeCnt, review, isClicked } =
    data.find(item => item.id === pageId);

  return (
    <Wrapper>
      <Header />
      <ContentsContainer key={id}>
        <img src={`${productImg}`} />
        <InfoContainer>
          <FlexContainer>
            <div>
              <Like onClick={() => clickLikeBtn(id)}>
                <i>
                  {isClicked ? (
                    <AiFillHeart color="red" size={18} />
                  ) : (
                    <AiOutlineHeart size={18} />
                  )}
                </i>
                <span>{likeCnt}</span>
              </Like>
              <i>
                <Grade clicked={getStarfromRate(reviewRate)} size={15} />
              </i>
            </div>
            <AiOutlineShareAlt size={20} onClick={copy} />
          </FlexContainer>
          <h2>{productNm}</h2>
          <p>{review}</p>
        </InfoContainer>
        <Comment userId={id} />
      </ContentsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  margin-right: auto;
  margin-left: auto;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 40px 16px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  i div {
    display: block;
    margin: 20px 0;
  }
  h2 {
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 20px;
  }
  p {
    line-height: 20px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Like = styled.div`
  i svg {
    margin-bottom: -2px;
    margin-right: 5px;
  }
`;

export default DetailView;
