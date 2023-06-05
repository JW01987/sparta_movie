const SortBtn = document.querySelectorAll('.sort-btn');
const box = document.querySelector("#cards-box");

let movieDatas = []
// 정렬버튼을 눌렀을 시
let newMoviedats = []


// 정렬메뉴버튼을 눌렀을때 sortMovies함수에 id값을 매개변수로 넣는다.
SortBtn.forEach(item => {
  item.addEventListener('click', e => {
    sortMovies(e.target.id)
  })
})


// 매개변수를 보고 오름차순을 판단
const sortMovies = (srotType) => {
  const box = document.querySelector("#cards-box");
  const patternHangul = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
  const patternAl = /[a-zA-z]/;
  const patternNum = /[0-9]/;
  
  box.innerHTML = "";
  console.log('sortMovies = ', movieDatas);

  // 이름정렬을 눌렀을 경우
  if(srotType === 'sort-name') {
    
    // 이름정렬은 한글 -> 영어 -> 숫자 순으로 한다.
    newMoviedats = movieDatas.sort((a, b) => a.title.localeCompare(b.title))
    printCard(newMoviedats);
  } else if(srotType === 'sort-highgrade') {
    // 높은평점순을 눌렀을 경우 아래의 평점내림차순함수가 실행
    console.log('높은 평점순')
    newMoviedats = movieDatas.sort((highCompare))
    printCard(newMoviedats);
  } else {
    // 낮은평점순을 눌렀을 경우 아래의 평점오름차순힘수가 실행
    console.log('낮은 평점순')
    newMoviedats = movieDatas.sort((lowCompare))
    printCard(newMoviedats);
  }
  console.log(newMoviedats)
}

// 평점오름차순힘수
const lowCompare = (a, b) => {
  if(a.vote_average > b.vote_average) return 1;
  if(a.vote_average < b.vote_average) return -1;
  return 0;
}

// 평점내림차순함수
const highCompare = (a, b) => {
  if(a.vote_average < b.vote_average) return 1;
  if(a.vote_average > b.vote_average) return -1;
  return 0;
}


// 정렬을 한 데이터를 다시 카드로 출력한다.
const printCard = (data) => {
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
}

// 영화데이터가 불러와졌을 때 해당 모듈에서 임시로 저장한다.
const saveDatas = (datas) => {
  movieDatas = datas
}

export {
  sortMovies,
  saveDatas
}