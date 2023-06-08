import {
  ReviewIdCheck,
  ReviewPasswordCheck,
  ReviewText,
  ReviewUpdateNameCheck,
} from "./validationCheck.js";

const box = document.querySelector("#detail-box"); //card-box 아이디를 찾아서 box에 저장
const urlParams = new URLSearchParams(window.location.search);
const modal = document.querySelector(".modal");
const submit = document.querySelector("#submit");
const name = document.querySelector("#name");
const psw = document.querySelector("#psw");
const comment = document.querySelector("#comment");
const movieId = urlParams.get("id");
const modal2 = document.querySelector("#modal2");
const name2 = document.querySelector("#name2");
const psw2 = document.querySelector("#psw2");
const comment2 = document.querySelector("#comment2");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1ZTlkMmE3Y2ZkZmViNzM1MDEzYjZlNmQ3NzhiMyIsInN1YiI6IjY0NzU3NGU5YmJjYWUwMDExOGJmNmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NX73Ve8n9Sej2np-7mP-addEhM0R1Uo3k9hsfgl8PX8",
  },
};

//모달 창 열기
document.querySelector(".modal-open").addEventListener("click", () => {
  modal.classList.add("show-modal");
});
//모달 창 닫기
document.querySelector("#close").addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
//댓글 등록
submit.addEventListener("click", () => {
  if (
    ReviewIdCheck(name.value) &&
    ReviewPasswordCheck(psw.value, name.value) &&
    ReviewText(comment.value)
  ) {
    const commentId = Date.now().toString(); // 고유한 ID 생성
    const newComment = {
      id: commentId,
      name: name.value,
      password: psw.value,
      text: comment.value,
      movie: movieId,
    };

    // 저장된 댓글 가져오기
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(newComment);

    // localStorage에 저장
    localStorage.setItem("comments", JSON.stringify(comments));

    alert("댓글이 등록되었습니다.");
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //html의 컨텐츠들이 전부 로딩 된 후 실행
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options //fetch url로 보내기 options와 함께
  )
    .then((response) => response.json()) //받은데이터를 json으로 파싱
    .then((res) => printCard(res))
    .catch((err) => console.error(err)); //위의 과정에서 에러가 나면 이쪽으로
});

const printCard = (data) => {
  box.innerHTML = ""; //위에서 저장해둔 box 비우기
  let title = data.title;
  let overview = data.overview;
  let poster_path = data.poster_path;
  let vote_average = data.vote_average;
  let id = data.id;

  let temp_html = ` <div class="detail-card">
                          <img src="https://image.tmdb.org/t/p/w500/${poster_path}">
                          <div class="detail-card-body">
                              <p class="detail-title">${title}</h5>
                              <p class="detail-text">${overview}</p>
                              <p>Rate: ${vote_average}</p>
                          </div>
                      </div>`;

  box.innerHTML += temp_html; //box에 temp_html을 넣기

  //로컬스토리지에서 값 가져오기
};
const commentbox = document.querySelector(".comment-box");
let comments = localStorage.getItem("comments");
if (comments) {
  comments = JSON.parse(comments);
  comments.forEach((commentData) => {
    const { id, name, text, movie } = commentData;
    if (movieId == movie) {
      const commentHTML = `
      <div class="comment" data-comment-id="${id}" >
        <p class="comment-name">이름: ${name}</p>
        <p class="comment-text">리뷰: ${text}</p>
        <button class="edit-btn">수정</button>
        <button class="del-btn">삭제</button>
      </div>
    `;
      commentbox.innerHTML += commentHTML;
    }
  });
}

//오픈판업함수 입니다. 길이와 넓이를 정하고 중앙에 뜨게끔 만들었습니다
function openPopup() {
  const width = 500;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  window.open(
    "/popup.html",
    "PopupWin",
    `width=${width},height=${height},left=${left},top=${top}`
  );
}

//삭제부분에 이어서 붙였습니다. 클릭을 하면 먼저 해당 id를 찾은 뒤
//팝업창이 뜨게끔 만들었습니다.

const commentBox = document.querySelector(".comment-box");
document.addEventListener("DOMContentLoaded", () => {
  commentBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("del-btn")) {
      const commentElement = event.target.closest(".comment");
      const commentId = commentElement.dataset.commentId;
      const commentPassword = prompt("비밀번호를 입력하세요."); // 비밀번호 입력 받기

      // 비밀번호 확인
      if (
        commentPassword !== null &&
        ReviewPasswordCheck(commentPassword, commentId)
      ) {
        commentElement.remove();
        openPopup();
        // 로컬 저장소에서 삭제
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        localStorage.setItem("comments", JSON.stringify(updatedComments));
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  });
});

//코멘트 수정 - test
commentBox.addEventListener("click", (event) => {
  //수정 버튼 클릭
  if (event.target.classList.contains("edit-btn")) {
    modal2.classList.add("show-modal");
    document.querySelector("#close2").addEventListener("click", () => {
      modal2.classList.remove("show-modal");
    });

    let updatePwd = "";
    let index = 0;
    const commentElement = event.target.closest(".comment");
    const commentId = commentElement.dataset.commentId;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedComments = comments.filter(
      (comment) => comment.id === commentId
    );
    name2.value = updatedComments[0].name;
    comment2.value = updatedComments[0].text;
    updatePwd = updatedComments[0].password;

    for (let i = 0; i < comments.length; i++) {
      if (
        movieId == comments[i].movie &&
        comments[i].id == updatedComments[0].id
      ) {
        index = i;
        break;
      }
    }

    document.querySelector("#save").addEventListener("click", () => {
      if (
        ReviewUpdateNameCheck(name2.value, index) &&
        ReviewPasswordCheck(psw2.value, name2.value) &&
        ReviewText(comment2.value)
      ) {
        if (updatePwd == psw2.value) {
          comments[index].name = name2.value;
          comments[index].text = comment2.value;
          localStorage.setItem("comments", JSON.stringify(comments));
          alert("저장완료!");
          window.location.reload();
        } else {
          alert("비밀번호가 다릅니다!");
        }
      }
    });
  }
});
