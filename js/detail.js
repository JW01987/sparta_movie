const box = document.querySelector("#detail-box"); //card-box 아이디를 찾아서 box에 저장
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1ZTlkMmE3Y2ZkZmViNzM1MDEzYjZlNmQ3NzhiMyIsInN1YiI6IjY0NzU3NGU5YmJjYWUwMDExOGJmNmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NX73Ve8n9Sej2np-7mP-addEhM0R1Uo3k9hsfgl8PX8",
  },
};

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
  console.log(data);
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
};
