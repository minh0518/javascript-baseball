const { Random } = require('@woowacourse/mission-utils');
//MissionUtils만 가져오지 않고 Random 모듈 자체를 받아와서
//사용할 때  MissionUtils.Random.pickNumberInRange로 사용하지 않고
//Random.pickNumberInRange형태로 사용 
//우테코 readme의 예시를 보니 애초에 이렇게 사용하길 원한 것 같다

const ValidationError = require('./ValidationError');

class Computer {
  static createUniqueNumbers(start, end, count) {

    //Random.pickNumberInRange에 사용될 start, end, count의 예외처리
    Computer.#validateUniqueNumbers(start, end, count);

    const numberSet = new Set();

    //3개를 다 받을때까지 Random.pickNumberInRange를 사용
    //(테스트 환경에서 구현로직이 있으므로 그렇게 사용하기 위해 
    //한번에 3개를 받는게 아니라 pickNumberInRange를 3번호출)
    while (numberSet.size !== count) {
      const number = Random.pickNumberInRange(start, end);
      numberSet.add(number);
      //numberSet은 컴퓨터가 생각한 3자리의 정답을 가지고 있다
    }

    //다들 set으로부터 나온 값을 사용할 때 배열 안에서 전개연산자를
    //사용한 값을 넘겨준다
    return [...numberSet];
  }

  static #validateUniqueNumbers(start, end, count) {
    if (
      !Number.isInteger(start) ||
      !Number.isInteger(end) ||
      !Number.isInteger(count)
    ) {
      throw new ValidationError('인수는 정수여야 합니다.');
    }

    if (start > end) {
      throw new ValidationError('start가 end보다 커서는 안됩니다.');
    }

    if (count < 0) {
      throw new ValidationError('count는 0보다 작으면 안됩니다.');
    }

    if (count > end - start + 1) {
      throw new ValidationError(
        `count: ${count}가 input 범위 (end - start + 1): ${end - start + 1}보다 커서는 안됩니다.`
      );
    }
  }
}

module.exports = Computer;