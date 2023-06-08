const SortBtn = document.querySelectorAll(".sort-btn");
const box = document.querySelector("#cards-box");

let movieDatas = [];
// 정렬버튼을 눌렀을 시
let newMoviedats = [];

// 정렬메뉴버튼을 눌렀을때 sortMovies함수에 id값을 매개변수로 넣는다.
SortBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    sortMovies(e.target.id);
  });
});

// 매개변수를 보고 오름차순을 판단
const sortMovies = (sortType) => {
  const box = document.querySelector("#cards-box");
  const hangulRex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const alphaRex = /[a-zA-Z]/
  const numRex = /[0-9]/

  let numArr = []
  let hangulArr = []
  let alpahArr = []
  let results = []
  box.innerHTML = "";
  // console.log("sortMovies = ", movieDatas);

  // 이름정렬을 눌렀을 경우
  if (sortType === "sort-name") {
    // 이름정렬은 한글 -> 영어 -> 숫자 순으로 한다.
    movieDatas.forEach((x) => {
      console.log(x.title[0])
      if(hangulRex.test(x.title[0])) hangulArr.push(x)
      if(alphaRex.test(x.title[0])) alpahArr.push(x)
      if(numRex.test(x.title[0])) numArr.push(x)
    })
    if(hangulArr !== []) {
      hangulArr = hangulArr.sort((a, b) => {
        return a.title[0] < b.title[0] ? -1 : 1
      })

    } else if(alpahArr !== []) {
      alpahArr = alpahArr.sort((a, b) => {
        return a.title[0] < b.title[0] ? -1 : 1
      })
    } else if(numArr !== []) {
      numArr = numArr.sort((a, b) => {
        return a.title[0] < b.title[0] ? -1 : 1
      })
    }
    console.log(results)
    results = hangulArr.sort().concat(alpahArr.sort().concat(numArr.sort()))
    printCard(results);
  } else if (sortType === "sort-highgrade") {
    // 높은평점순을 눌렀을 경우 아래의 평점내림차순함수가 실행
    newMoviedats = movieDatas.sort(highCompare);
    printCard(newMoviedats);
  } else {
    // 낮은평점순을 눌렀을 경우 아래의 평점오름차순힘수가 실행
    newMoviedats = movieDatas.sort(lowCompare);
    printCard(newMoviedats);
  }
};

// 평점오름차순힘수
const lowCompare = (a, b) => {
  if (a.vote_average > b.vote_average) return 1;
  if (a.vote_average < b.vote_average) return -1;
  return 0;
};

// 평점내림차순함수
const highCompare = (a, b) => {
  if (a.vote_average < b.vote_average) return 1;
  if (a.vote_average > b.vote_average) return -1;
  return 0;
};

function handleMovieCardClick(event) {
  const movieId = event.currentTarget.dataset.movieId;
  window.location.href = `/detail.html?id=${movieId}`;
}
// 정렬을 한 데이터를 다시 카드로 출력한다.
const printCard = (data) => {
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
};

// 영화데이터가 불러와졌을 때 해당 모듈에서 임시로 저장한다.
const saveDatas = (datas) => {
  movieDatas = datas;
};

export { sortMovies, saveDatas };
