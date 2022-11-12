//기본적으로 JS에 있는 에러객체 중에서 ValidationError는 없다
//그니까 이분은 ValidationError라는 에러객체를 직접 만들어서 사용하는 것이다

//모든 곳에서 사용될만한 완벽한 ValidationError가 아니라
//이 숫자야구 로직에서 사용되는 예외처리에서 입력값이 잘못됐을때 
//단지 좀 더 에러의 종류를 명시해주기 위해  Error객체를 상속받아서 
//ValidationError라는 이름으로 에러를 사용하는 것이다


class ValidationError extends Error { 
  //ValidationError클래스는 가장 기본Error클래스를 상속받아서 사용한다
  //만약 ValidationError를 사용하고자 하는 에러가 발생하면
  //이 ValidationError객체를 throw한다


  constructor(message) {
    super(message);
  }
  //throw new ValidationError('3자리만 입력하세요.');
  //이런 식으로 사용하는데 여기서 사용된 에러 메세지는 Error객체의 메세지사용을
  //그대로 사용하는 것이다

  //그니까 throw new Error('3자리만 입력하세요.'); 에서 사용되는 메세지와 동일하며
  //단지 좀 더 에러의 종류를 명시해주기 위해 ValidationError를 사용하는 것이다
}

module.exports = ValidationError;