import { saveDatas } from "./sortFunc.js";
import { movieTitleCheck } from "./validationCheck.js";
const box = document.querySelector("#cards-box"); //card-box 아이디를 찾아서 box에 저장
const input = document.querySelector(".search"); //사용자의 검색어를 받는 곳
const options = {
  method: "GET", //restAPI규칙에 따른 메소드
  headers: {
    accept: "application/json", //json방식으로 호출
    //api키 값
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1ZTlkMmE3Y2ZkZmViNzM1MDEzYjZlNmQ3NzhiMyIsInN1YiI6IjY0NzU3NGU5YmJjYWUwMDExOGJmNmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NX73Ve8n9Sej2np-7mP-addEhM0R1Uo3k9hsfgl8PX8",
  },
};

function handleMovieCardClick(event) {
  const movieId = event.currentTarget.dataset.movieId;
  window.location.href = `/sparta_movie/detail.html?id=${movieId}`;
}

function printCard(data) {
  saveDatas(data);
  box.innerHTML = "";
  if (data.length === 0) {
    let temp_html = `
      <div class="title-none">
        검색 결과가 없습니다
      </div>
    `;
    box.innerHTML += temp_html;
  }
  data.forEach((a) => {
    let title = a.title;
    let overview = a.overview;
    let poster_path = a.poster_path;
    let vote_average = a.vote_average;
    let id = a.id;

    let cardElement = document.createElement("div");
    cardElement.classList.add("col");
    cardElement.classList.add("movie-card");
    cardElement.dataset.movieId = id;
    cardElement.addEventListener("click", handleMovieCardClick);
    let temp_html = `
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top">
        <div class="card-body">
          <p class="card-title">${title}</p>
          <p class="card-text">${overview}</p>
          <p>Rate: ${vote_average}</p>
        </div>
      </div>
    `;

    cardElement.innerHTML = temp_html;
    box.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  //html의 컨텐츠들이 전부 로딩 된 후 실행
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options //fetch url로 보내기 options와 함께
  )
    .then((response) => response.json()) //받은데이터를 json으로 파싱
    .then((res) => printCard(res.results))
    .catch((err) => console.error(err)); //위의 과정에서 에러가 나면 이쪽으로
});

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    //눌린 키가 enter키일경우
    if (movieTitleCheck(input.value)) {
      //성공할 경우 해당 영화를 출력
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=ko-KR&page=1`, //백틱을 사용해서 안에 검색어를 넣어준다
        options
      )
        .then((response) => response.json())
        .then((res) => printCard(res.results))
        .catch((err) => console.error(err));
    } else location.reload(); //실패할 경우 movieTitleCheck함수에서 alert창으로 경고한 뒤 첫화면 reload
  }
});
