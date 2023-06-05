export function movieTitleCheck(find) {
  let scriptTag = /[^가-힣|^a-z|^A-Z|^0-9]/;
  let space = /\s/;
  let check = 0;

  if (find.length == 0) {
    alert("제목을 입력해주세요");
  } else if (space.test(find) == true) {
    alert("공백은 사용할 수 없습니다.");
  } else if (scriptTag.test(find) == true) {
    alert("스크립트태그는 들어갈 수 없습니다.");
  } else if (find.length > 20) {
    alert("20자 이내로 작성해주세요");
  } else {
    check = 1;
  }
  return check;
}

export function ReviewIdCheck(reviewId) {
  let scriptTag = /[^가-힣|^a-z|^A-Z|^0-9]/;
  let space = /\s/;
  let check = 0;

  if (reviewId.length == 0) {
    alert("아이디를 입력해주세요");
  } else if (space.test(reviewId) == true) {
    alert("공백은 사용할 수 없습니다.");
  } else if (scriptTag.test(reviewId) == true) {
    alert("아이디에는 스크립트태그를 사용할 수 없습니다.");
  } else if (reviewId.length > 12) {
    alert("아이디는 12자리 이하여야 합니다.");
  } else if (reviewId.length < 3) {
    alert("아이디는 3자리 이상이어야 합니다.");
  } else {
    check = 1;
  }
  return check;
}

export function ReviewPasswordCheck(reviewPassword, reviewId) {
  let scriptTagKo = /[가-힣]/;
  let space = /\s/;
  let check = 0;

  if (reviewPassword.length == 0) {
    alert("비밀번호를 입력해주세요.");
  } else if (space.test(reviewPassword) == true) {
    alert("공백은 사용할 수 없습니다.");
  } else if (reviewId == reviewPassword) {
    alert("비밀번호와 아이디는 같을 수 없습니다.");
  } else if (scriptTagKo.test(reviewPassword) == true) {
    alert("비밀번호는 한글로 작성할 수 없습니다.");
  } else if (reviewPassword.length < 3) {
    alert("비밀번호는 3자리 이상이어야 합니다.");
  } else if (reviewPassword.length > 20) {
    alert("비밀번호는 20자리 이하여야 합니다.");
  } else {
    check = 1;
  }
  return check;
}

export function ReviewText(reviewText) {
  let check = 0;

  if (reviewText.length == 0) {
    alert("리뷰를 달아주세요.");
  } else if (reviewText.length > 100) {
    alert("리뷰는 100자리 이하여야 합니다.");
  } else if (reviewText.length < 3) {
    alert("리뷰는 3자리 이상이어야 합니다.");
  } else {
    check = 1;
  }

  return check;
}
