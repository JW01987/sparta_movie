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
const printCard = (data) => {
  console.log(data);
  box.innerHTML = ""; //위에서 저장해둔 box 비우기
  data.forEach((a) => {
    console.log(a);
    //받은 데이터중 results의 요소를 하나하나 열어보기
    let title = a.title; //열어본 요소에서 title값 가져오기
    let overview = a.overview;
    let poster_path = a.poster_path;
    let vote_average = a.vote_average;
    let id = a.id;

    let temp_html = `<div class="col" onclick="goToMovieDetail('${id}')">
                      <div class="card">
                            <img src="https://image.tmdb.org/t/p/w500/${poster_path}"
                                class="card-img-top">
                            <div class="card-body">
                                <p class="card-title">${title}</h5>
                                <p class="card-text">${overview}</p>
                                <p>Rate: ${vote_average}</p>
                            </div>
                        </div>
                    </div>`;

    box.innerHTML += temp_html; //box에 temp_html을 넣기
  });
};

document.addEventListener("DOMContentLoaded", () => {
  //html의 컨텐츠들이 전부 로딩 된 후 실행
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
    options //fetch url로 보내기 options와 함께
  )
    .then((response) => response.json()) //받은데이터를 json으로 파싱
    .then((res) => printCard(res.results))
    .catch((err) => console.error(err)); //위의 과정에서 에러가 나면 이쪽으로
});

input.addEventListener("change", (e) => {
  //검색 받는 곳에서 change 이벤트가 일어나면(엔터) 발동하는 함수
  let search = e.target.value; //e는 해당 이벤트가 일어나는 곳을 말함 //e.target.value는 해당 input태그에 들어온 값을 말한다 == 사용자가 검색한 것
  if (search == "" || search == " ") location.reload(); //만약 사용자가 아무것도 없이 엔터를 누르면 창을 새로고침한다
  let find = search.replace(" ", "%20"); //쿼리스트링으로 보내야하는데 띄어쓰기를 읽을 수 없어서 쿼리스트링에서 띄어쓰기인 %20을 띄어쓰기 대신 넣는다 //replace(바꾸고싶은 값,바뀔 값)

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${find}&include_adult=false&language=ko-KR&page=1`, //백틱을 사용해서 안에 검색어를 넣어준다
    options
  )
    .then((response) => response.json())
    .then((res) => printCard(res.results))
    .catch((err) => console.error(err));
});

function goToMovieDetail(movieId) {
  // 선택한 영화의 이름을 상세 페이지로 전달하고, 상세 페이지로 이동한다.
  window.location.href = `/detail.html?id=${movieId}`;
}
