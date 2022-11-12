// modules
const { Console } = require('@woowacourse/mission-utils');
const InputError = require('./InputError');
const ValidationError = require('./ValidationError');
const Computer = require('./Computer');
const Judge = require('./Judge');

// constants
const { GAME_SETTING, RESULT } = require('./utils/constants');
const { MIN_NUMBER, MAX_NUMBER, NUMBER_COUNT } = GAME_SETTING;
const { STRIKE } = RESULT;


//전체적인 로직인 playGame()메소드를 App의 play()안에 적는다
//그리고 playGame() 안에서 이제 전체적인 로직이 들어있는데
//이 전체적인 로직을 클래스별로 , 메소드별로 쪼개서 사용한다
//클래스로 사용할땐 당연히 그 클래스의 메소드를 사용하는 것고 (static으로 사용해서 new없이 바로 사용)
//메소드는 당연히 this.메소드명()으로 사용

//여기서 고무적인 것은 기능을 분리함에 있어서 
//메소드 뿐만 아니라 다른 클래스도 사용했다는 것이다



class App {
  play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    this.playGame();
  }

  playGame() {
    const computer = Computer.createUniqueNumbers(MIN_NUMBER, MAX_NUMBER, NUMBER_COUNT);
    //computer는 컴퓨터가 생각한 숫자야구 정답 3자리의 숫자를 가지고 있다

    this.guess(computer);
  }


  guess(computer) {
    Console.readLine('숫자를 입력해주세요 : ', (input) => {


      //사용자가 숫자를 입력하게 되면 그 숫자에 대한 예외처리
      try {
        this.validateUserGuess(input);
      } catch (err) {
        //validateUserGuess에서 예외가 발생하면 아래 로직 실행
        if (err instanceof ValidationError) {
          const message = `${MIN_NUMBER}부터 ${MAX_NUMBER}까지 서로 다른 ${NUMBER_COUNT}자리 숫자를 입력해주세요.`;
          throw new InputError(message, err);
        } else {
          throw err;
        }
      }



      //사용자가 입력한 값을 숫자로 변경
      const player = Array.from(input, Number);

      //컴퓨터가 만든 답과 , 사용자가 입력한 값을 넘겨줌
      //Judge는 스트라이크 , 볼을 판별하는 로직이다
      const result = Judge.getResult(computer, player);
      Console.print(result);

      if (result !== `${NUMBER_COUNT}${STRIKE}`) {
        //다 맞춘게 아니라면 guess메소드(사용자 숫자 입력 및 예외처리)다시 진행
        this.guess(computer);
      } else {
        //다 맞췄다면 게임종료 메세지 , 다시 할건지 물어봄
        Console.print(`${NUMBER_COUNT}개의 숫자를 모두 맞히셨습니다! 게임 종료`);
        this.askPlayAgain();
      }
    });
  }

  validateUserGuess(input) {

    //사용자가 입력한 값을 숫자로 변경
    const inputNumbers = Array.from(input, Number);
    
    //set에다가 담아줌
    const inputNumberSet = new Set(inputNumbers);

    //예외처리
    if (input.length !== NUMBER_COUNT) {
      throw new ValidationError('3자리만 입력하세요.');
    }
    if (inputNumbers.some((number) => !Number.isInteger(number))) {
      throw new ValidationError('숫자만 입력하세요.');
    }
    if (inputNumbers.some((number) => number < MIN_NUMBER || number > MAX_NUMBER)) {
      throw new ValidationError(`${MIN_NUMBER}부터 ${MAX_NUMBER}까지의 숫자만 입력하세요.`);
    }
    if (inputNumberSet.size !== NUMBER_COUNT) {
      throw new ValidationError('서로 다른 숫자만 입력하세요.');
    }
  }

  askPlayAgain() {
    Console.print('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.');
    Console.readLine('', (input) => {
      switch (input) {
        case '1':
          return this.playGame();
        case '2':
          return Console.close();
        default:
          throw new InputError('게임을 종료합니다.');
      }
    });
  }
}

module.exports = App;