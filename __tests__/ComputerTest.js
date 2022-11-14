const Computer = require('../src/Computer');

describe('Computer 클래스 테스트', () => {
  
  test('서로 다른 숫자를 count개 생성해야 한다.', () => {
    const count = 7;

    //Computer의 createUniqueNumbers메소드를 직접 사용하며 테스트
    //(Computer는 require로 가져왔었다)
    const computer = Computer.createUniqueNumbers(1, 9, count);
    const computerSet = new Set(computer);

    expect(computer).toHaveLength(count); //count만큼 숫자가 생성되는지 확인
    expect(computerSet.size).toBe(count); //set을 통해 중복 확인
    

    //모든 값들이 다 숫자인지 확인
    computer.forEach((item) => {
      expect(Number.isInteger(item)).toBe(true);
    }); 

  });

  test('범위 안의 숫자만 생성해야 한다.', () => {
    const start = 1;
    const end = 8;
    const computer = Computer.createUniqueNumbers(start, end, 5);

    computer.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(start) &&
      expect(number).toBeLessThanOrEqual(end);
    });
  });
  test('시작 숫자가 끝 숫자보다 크면 예외를 발생해야 한다.', () => {
    const start = 1;
    const end = start - 1;

    expect(() => Computer.createUniqueNumbers(start, end, 0)).toThrow();
  });
  test('count가 0보다 작으면 예외를 발생해야 한다.', () => {
    const count = -1;

    expect(() => Computer.createUniqueNumbers(1, 9, count)).toThrow();
  });
  test('count가 start, end 범위보다 크면 예외를 발생해야 한다.', () => {
    const count = 100;
    const start = 1;
    const end = 9;

    expect(() => Computer.createUniqueNumbers(start, end, count)).toThrow();
  });
});