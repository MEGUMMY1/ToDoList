import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'NanumSquareNeo-Variable';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

  body {
    font-family: 'NanumSquareNeo-Variable';
  }

  #root {
    height: 100vh;
    overflow: hidden; 
  }
`;

const Container = styled.div`
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Time = styled.p`
  color: #fff;
  font-size: 100px;
  font-weight: bold;
  text-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 3vw;
  margin-bottom: 0;
  
  @media (max-width: 700px) {
    font-size: 70px;
    margin-top: 2vw;
  }
`;

const Today = styled.p`
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.2);
  margin-top: 0;
  margin-bottom: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 700px) {
    font-size: 45px;
    margin-top: 2vw;
  }
`;

const TodoListContainer = styled.div`
  width: 90%;
  max-width: 470px;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 30px;
  overflow-y: auto;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoItemContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 90%; 
  max-width: 470px;
  margin-top: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const TodoText = styled.span`
  flex-grow: 1;
  font-size: 16px;

  ${({ isChecked }) =>
    isChecked &&
    `
    font-style: italic; /* 기울기 추가 */
    text-decoration: line-through; /* 선 추가 */
  `}
`;

const DeleteButton = styled.button`
  color: red;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0; 
`;

const DeleteIcon = styled.img`
  width: 20px; 
  height: 20px;
`;

const AddTodoContainer = styled.div`
  width: 90%;
  max-width: 470px;
  height: 45px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddTodoInput = styled.input`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  flex-grow: 1;
  padding: 10px;
  width: 100%;
  border-style: none;
`;

const Footer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FooterText = styled.p`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`


const getRandomImage = () => {
  const images = [
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',    
    '/img/10.jpg',
    '/img/11.jpg',
    '/img/12.jpg',
    '/img/13.jpg',
    '/img/14.jpg',
    '/img/15.jpg',
    '/img/16.jpg',
    '/img/17.jpg',
    '/img/18.jpg',
    '/img/19.jpg',    
    '/img/20.jpg',
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 12시간제로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로 표시

  // 분이 10보다 작으면 앞에 0을 붙임
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${ampm} ${hours}:${minutes}`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TodoApp = () => {
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // To-Do를 추가하고 로컬 저장소를 업데이트
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { text: newTask, isChecked: false }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask('');
    }
  };

  // To-Do를 삭제하고 로컬 저장소를 업데이트
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  useEffect(() => {
    setBackgroundImage(getRandomImage());

    // 페이지가 로드될 때 로컬 저장소에서 이전에 저장한 To-Do 목록을 불러옴
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
      setCurrentDate(formatDate(new Date()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 각 Todo 항목에 대한 체크박스 상태를 업데이트
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  return (
    <>
    <GlobalStyle/>    
      <Container backgroundImage={backgroundImage}>
        <Time>{currentTime}</Time>
        <Today>{currentDate}</Today>
        <TodoListContainer>
          <AddTodoContainer>
            <AddTodoInput
              type="text"
              placeholder="Add To do"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </AddTodoContainer>

          {tasks.map((task, index) => (
            <TodoItemContainer key={index}>
              <Checkbox
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={task.isChecked}
              />
              <TodoText isChecked={task.isChecked}>{task.text}</TodoText>
              <DeleteButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png" alt="Delete" />
              </DeleteButton>
            </TodoItemContainer>
          ))}
          
        </TodoListContainer>
        <Footer>
          <FooterText>@ M E G U M M Y 1</FooterText>
        </Footer>
      </Container>
    </>
  );
};

export default TodoApp;
