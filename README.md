# 🎬sparta_movie

https://jw01987.github.io/sparta_movie/

로컬에서 페이지를 열고 싶다면
app.js 18번째 줄, sortFunc.js의 80번째 주석을 참고하시기 바랍니다.

# 필수구현

## 1. 영화정보 카드 리스트 UI 구현

- MDB에서 받아온 데이터를 브라우저 화면에 카드 형태의 데이터로 보여줍니다.

```jsx
const box = document.querySelector("#cards-box"); //card-box 아이디를 찾아서 box에 저장
document.addEventListener("DOMContentLoaded", () => {
  //이 함수 안의 내용이 모든 html요소가(DOM) 로딩 된 다음에 호출됨
  //이미지 파일이나 스타일시트 등의 기타 자원은 기다리지 않는다.
});
```

- 카드에는 title(제목), overview(내용 요약), poster_path(포스터 이미지 경로), vote_average(평점) 이렇게 4가지 정보가 필수로 들어갑니다
- 카드 클릭 시에는 클릭한 영화 id 를 나타내는 alert 창을 띄웁니다.

```js
let temp_html = `<div class="col" onClick=alert("id:${id}")> //onClick이벤트를 넣음
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
```

## 2. 영화 검색 UI 구헌

- API로 받아온 전체 영화들 중 영화 제목에 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이도록 합니다.

```jsx
  let search = e.target.value; //e는 해당 이벤트가 일어나는 곳을 말함 //e.target.value는 해당 input태그에 들어온 값을 말한다 == 사용자가 검색한 것
  if (search == "" || search == " ") location.reload(); //만약 사용자가 아무것도 없이 엔터를 누르면 창을 새로고침한다
  let find = search.replace(" ", "%20"); //url로 보내야하는데 띄어쓰기를 읽을 수 없어서 띄어쓰기인 %20을 띄어쓰기 대신 넣는다 //replace(바꾸고싶은 값,바뀔 값)
...

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${find}&include_adult=false&language=ko-KR&page=1`, //백틱을 사용해서 안에 검색어를 넣어준다
    options
  )
```

---

# 선택

## 1. 키보드 enter키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행시키기

```jsx
const input = document.querySelector(".search"); //사용자의 검색어를 받는 곳
input.addEventListener("change", (e) => {
  //검색 받는 곳에서 change 이벤트가 일어나면(엔터) 발동하는 함수
});
```

## 2. 대소문자 관계없이 검색 가능하게 하기

현재 코드에서는 search api를 사용해서 대소문자 구분을 하지 않지만  
하지만 전에 사용한 코드에서는 `.toLowerCase()`와 `.includes()`를 사용해서 모두 소문자로 만든 후 검색했다

전에 사용했던 코드

```jsx
if (title.toLowerCase().includes(search.toLowerCase())) {
  //title의 소문자 버전이 search의 소문자가 포함되어있다면 true를 반환함
}
```

---

`.toLowerCase()`

```jsx
let str = "JavaScript String";
console.log(str.toLowerCase()); //javascript string
```

`.includes()`

```jsx
let str = "JavaScript String";
console.log(str.includes("Script")); //true
```
