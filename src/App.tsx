import React, { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  // TodoList 타입 지정
  type Todo = {
    id: number;
    title: string;
    content: string;
    isDone: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([
    // { id: 0, title: '', content: '', isDone: false }
  ]);

  // 제목, 내용을 받을 useState() 선언
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // 추가하기 버튼을 누르면 title, content 정보를 받아옴
  const addButtonHandler = () => {
    const newTodos = {
      id: todos.length + 1,
      title,
      content,
      isDone: false,
    };
    // 기존의 배열에 추가된 정보를 저장함
    setTodos([...todos, newTodos]);

    // input 태그는 다시 공란으로 바꾸기
    setTitle("");
    setContent("");
  };

  // TodoList 완료 여부를 isDone true, false 값으로 필터링하기
  const workingTodoList = todos.filter((todo) => todo.isDone === false);
  const doneTodosList = todos.filter((todo) => todo.isDone === true);

  // 삭제하기 버튼 기능 구현
  const removeListHandler = (id: number) => {
    // 삭제 여부 확인 alert
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "grey",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      // 삭제 버튼 클릭 시, 선택한 TodoList 삭제
      if (result.isConfirmed) {
        const newTodos = todos.filter((todo) => {
          return todo.id !== id;
        });
        setTodos(newTodos);

        // 삭제 alert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "삭제되었습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  // 완료 버튼 기능 구현
  // isDone의 값을 true로 변경하여 TodoList Done 리스트에 넣기
  const toggleListHandler = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className="page">
      <div className="box">
        {/* 머릿글 */}
        <div className="header">
          <span className="left">My Todo List</span>
          <span className="right">React</span>
        </div>

        {/* input태그 구현 */}
        <div className="inputBox">
          제목 : &nbsp;
          <input value={title} onChange={titleChangeHandler} />
          &nbsp;&nbsp;&nbsp; 내용 : &nbsp;
          <input
            className="left"
            value={content}
            onChange={contentChangeHandler}
          />
          <button className="addBtn" onClick={addButtonHandler}>
            추가하기
          </button>
        </div>

        {/* 진행중인 Todo List 보여주는 컴포넌트 구현 */}
        <div>
          <br />

          {/* 미완료한 TodoList 보여주기 */}
          <h2>Working 😂</h2>
          <br />
          <div className="content-style">
            {workingTodoList.length === 0 ? (
              <> 작성한 TodoList가 없습니다...🤔</>
            ) : (
              workingTodoList.map(function (todo) {
                return (
                  <div key={todo.id} className="component-stlye">
                    <h3>{todo.title}</h3>
                    <h5>{todo.content}</h5>
                    <div className="contentBtn">
                      <button
                        className="deleteBtn"
                        onClick={() => removeListHandler(todo.id)}
                      >
                        삭제
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="doneBtn"
                        onClick={() => toggleListHandler(todo.id)}
                      >
                        완료
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 완료한 TodoList 보여주기 */}
          <h2>Done 🤩</h2>
          <br />
          <div className="content-style">
            {doneTodosList.length === 0 ? (
              <> 완료한 TodoList가 없습니다...😭</>
            ) : (
              doneTodosList.map(function (todo) {
                return (
                  <div key={todo.id} className="component-stlye">
                    <h3>{todo.title}</h3>
                    <h5>{todo.content}</h5>
                    <div className="contentBtn">
                      <button
                        className="deleteBtn"
                        onClick={() => removeListHandler(todo.id)}
                      >
                        삭제
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="doneBtn"
                        onClick={() => toggleListHandler(todo.id)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
