import React, { useState } from 'react';
import styled from 'styled-components';
import Grade from '../components/Grade';
import ReviewTitle from '../components/ReviewTitle';
import ImageRegister from '../components/ImageRegister';
import { postData } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*
  
  {
    id: '1',
    productNm: '블랙 핸드백',
    productImg: [
      'https://i.balaan.io/review/c836c897ce27f22497d14d8e9f461ece.webp',
    ],
    createDt: 1645401600,
    review: '무난하게 데일리로 활용중입니다.',
    reviewRate: 3,
    likeCnt: 244,
    comments: [],
  },
  */
  const [data, setData] = useState({
    clicked: [false, false, false, false, false],
    likeCnt: 0,
    comments: [],
  });
  const changeTitle = ({ target }) =>
    setData({ ...data, ...{ productNm: target.value } });
  const changeContent = ({ target }) =>
    setData({ ...data, ...{ review: target.value } });
  const changePhoto = image => setData({ ...data, ...{ productImg: [image] } });

  const handleStarClick = index => {
    let clickStates = [...data.clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setData({ ...data, ...{ clicked: clickStates } });
  };

  const registerReview = () => {
    let clickStates = data.clicked.filter(isSelected => isSelected).length;
    const newData = { ...data };
    delete newData.clicked;

    const isValid = newData => {
      return newData.productNm && newData.review && newData.productImg;
    };
    if (isValid(newData)) {
      dispatch(
        postData({
          ...newData,
          ...{ createDt: new Date().valueOf() },
          ...{ reviewRate: clickStates },
          ...{ id: Math.ceil(Math.random() * 10000000).toString() },
        }),
      );
      navigate('/');
    } else {
      alert('유효한 값들을 입력해주세요');
    }

    // Todo : dispatch로 상태 추가하고 navigate로 첫화면으로 옮기기
  };

  return (
    <ReviewContainer>
      <ReviewTitle titleName={'제목'} />
      <TitleInput
        type="text"
        placeholder="리뷰 제목을 입력해주세요"
        onChange={changeTitle}
        value={data?.productNm || ''}
      ></TitleInput>
      <ReviewTitle titleName={'내용'} />
      <ContentArea
        type="text"
        placeholder="리뷰 내용을 입력해주세요"
        onChange={changeContent}
        value={data?.review || ''}
      ></ContentArea>
      <ImageRegister changePhoto={changePhoto} />
      <ReviewTitle title={'평점'} />
      <GradeWrap>
        <Grade
          clicked={data.clicked}
          clickGrade={index => handleStarClick(index)}
          onClickCheck={true}
          hoverAbled={true}
        />
      </GradeWrap>
      <SubmitContainer>
        <SubmitBtn onClick={registerReview}>리뷰 등록하기</SubmitBtn>
      </SubmitContainer>
    </ReviewContainer>
  );
};

const GradeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0px;
`;

const ReviewContainer = styled.div`
  margin: auto;
  width: 500px;
  height: 1000px;
`;

const TitleInput = styled.input`
  width: 480px;
  padding: 10px;
  margin-bottom: 10px;
`;
const ContentArea = styled.textarea`
  width: 480px;
  height: 200px;
  padding: 10px;
  resize: none;
  margin-bottom: 10px;
`;
const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmitBtn = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  line-height: 60px;
  width: 400px;
  height: 60px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;
export default Review;
