let scriptTag = /[~!@#\$%\^&\*\(\)_\+\-={}\[\];:<>,\.\/\?\"\'\/\|\\]/; // 특수문자들
let space = /\s/; //공백값

//영화 검색 유효성 검사
export function movieTitleCheck(find) {
  let check = 0;

  if (find.length == 0) {
    //값이 없는 경우
    alert("제목을 입력해주세요");
  } else if (space.test(find) == true) {
    //공백이 있는 경우
    alert("공백은 사용할 수 없습니다.");
  } else if (scriptTag.test(find) == true) {
    //특수문자가 포함된 경우
    alert("특수문자는 들어갈 수 없습니다.");
  } else if (find.length > 20) {
    // 20자 초과한 경우
    alert("20자 이내로 작성해주세요");
  } else {
    check = 1;
  }
  return check;
}

//리뷰 이름 유효성 검사
export function ReviewIdCheck(reviewId) {
  let check = 0;

  if (reviewId.length == 0) {
    //값이 없는 경우
    alert("아이디를 입력해주세요");
  } else if (space.test(reviewId) == true) {
    //공백이 있는 경우
    alert("공백은 사용할 수 없습니다.");
  } else if (scriptTag.test(reviewId) == true) {
    // 특수문자가 포함된 경우
    alert("아이디에는 특수문자를 사용할 수 없습니다.");
  } else if (reviewId.length > 12) {
    //이름 크기가 12자를 초과한 경우
    alert("아이디는 12자리 이하여야 합니다.");
  } else if (reviewId.length < 3) {
    //이름 크기가 3자 미만인 경우
    alert("아이디는 3자리 이상이어야 합니다.");
  } else {
    check = 1;
  }
  return check;
}

//리뷰 비밀번호 유효성 검사
export function ReviewPasswordCheck(reviewPassword, reviewId) {
  let scriptTagKo = /[가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/; //한글들
  let check = 0;

  if (reviewPassword.length == 0) {
    //값이 없는 경우
    alert("비밀번호를 입력해주세요.");
  } else if (space.test(reviewPassword) == true) {
    //공백이 있는 경우
    alert("공백은 사용할 수 없습니다.");
  } else if (reviewId == reviewPassword) {
    //아이디와 비밀번호가 같을 경우
    alert("비밀번호와 아이디는 같을 수 없습니다.");
  } else if (scriptTagKo.test(reviewPassword) == true) {
    //비밀번호가 한글이 있는경우
    alert("비밀번호는 한글로 작성할 수 없습니다.");
  } else if (reviewPassword.length < 3) {
    //비밀번호가 3자 미만인 경우
    alert("비밀번호는 3자리 이상이어야 합니다.");
  } else if (reviewPassword.length > 20) {
    // 비밀번호가 20자 초과한 경우
    alert("비밀번호는 20자리 이하여야 합니다.");
  } else {
    check = 1;
  }
  return check;
}

//리뷰 텍스트 유효성 검사
export function ReviewText(reviewText) {
  let check = 0;

  if (reviewText.length == 0) {
    //글이 하나도 없는경우
    alert("리뷰를 달아주세요.");
  } else if (reviewText.length > 100) {
    //글이 100자 초과한 경우
    alert("리뷰는 100자리 이하여야 합니다.");
  } else if (reviewText.length < 3) {
    //글이 3자 미만인 경우
    alert("리뷰는 3자리 이상이어야 합니다.");
  } else {
    check = 1;
  }

  return check;
}
