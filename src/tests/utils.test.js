import {
  initializeIntervalLengths,
  checkIfShortInputValid ,
  checkIfLongInputValid, 
  tick,
  validateNumber,
  getMinutesAndSeconds,
  checkIfTimeValid,
  createElement,
} from '../utils/utils';

describe('test intervals', () => {
  beforeEach(() => {
    localStorage.removeItem('shortBreakLength');
    localStorage.removeItem('longBreakLength');
  });

  test('default pomodoro intervals', () => {
    initializeIntervalLengths();

    expect(window.localStorage.getItem('shortBreakLength')).toBe('300'); // 5 minutes
    expect(window.localStorage.getItem('longBreakLength')).toBe('900'); // 15 minutes
  });

  test('custum intervals', () => {
    window.localStorage.setItem('shortBreakLength', 120); // 2 minutes
    window.localStorage.setItem('longBreakLength', 1800); // 30 minutes

    initializeIntervalLengths();

    expect(window.localStorage.getItem('shortBreakLength')).toBe('120'); // 2 minutes
    expect(window.localStorage.getItem('longBreakLength')).toBe('1800'); // 30 minutes
  });
});

describe('valid time and number', () => {
  test('validate number', () => {
    expect(validateNumber(5)).toBe(5);
    expect(validateNumber(1555)).toBe(1555);
    expect(validateNumber(35)).toBe(35);
    expect(validateNumber('5')).toBe(5);
    expect(validateNumber(0)).toBe(0);
    expect(validateNumber('p')).toBe(null);
    expect(validateNumber(-1)).toBe(-1);
    expect(validateNumber('#')).toBe(null);
  });

  test('check if valid time', () => {
    expect(checkIfTimeValid(5)).toBe(true);
    expect(checkIfTimeValid(1500)).toBe(true);
    expect(checkIfTimeValid(59)).toBe(true);
    expect(checkIfTimeValid(569)).toBe(true);
    expect(checkIfTimeValid('5')).toBe(true);
    expect(checkIfTimeValid(-5)).toBe(false);
    expect(checkIfTimeValid(-1)).toBe(false);
    expect(checkIfTimeValid('p')).toBe(false);
    expect(checkIfTimeValid('#')).toBe(false);
  });

  test('test for correct time string', () => {
    expect(getMinutesAndSeconds(0)).toBe('00:00');
    expect(getMinutesAndSeconds(25)).toBe('00:25');
    expect(getMinutesAndSeconds(60)).toBe('01:00');
    expect(getMinutesAndSeconds(1000)).toBe('16:40');
    expect(getMinutesAndSeconds(7)).toBe('00:07');
    expect(getMinutesAndSeconds(1499)).toBe('24:59');
  });

  test('check if long interval is valid', () => {
    expect(checkIfLongInputValid(15)).toBe(true);
    expect(checkIfLongInputValid(30)).toBe(true);
    expect(checkIfLongInputValid(17)).toBe(true);
    expect(checkIfLongInputValid(25)).toBe(true);
    expect(checkIfLongInputValid(14)).toBe(false);
    expect(checkIfLongInputValid(31)).toBe(false);
    expect(checkIfLongInputValid(100)).toBe(false);
    expect(checkIfLongInputValid(1)).toBe(false);
  });

  test('check if short interval is valid', () => {
    expect(checkIfShortInputValid(3)).toBe(true);
    expect(checkIfShortInputValid(4)).toBe(true);
    expect(checkIfShortInputValid(5)).toBe(true);
    expect(checkIfShortInputValid(0)).toBe(false);
    expect(checkIfShortInputValid(1)).toBe(false);
    expect(checkIfShortInputValid(2)).toBe(false);
    expect(checkIfShortInputValid(6)).toBe(false);
    expect(checkIfShortInputValid(7)).toBe(false);
  });
});

describe('test ticking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('call tick multiple times', () => {
    for (let i = 1; i < 11; i++) {
      tick(i);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        i * 1000,
      );
    }
    expect(setTimeout).toHaveBeenCalledTimes(10);
  });

  // TODO: add more tests for tick using await/.then()
});

describe('test createElement', () => {
  test('create paragraph Element', () => {
    const pElement = createElement('p');
    pElement.innerHTML = 'Pomodoro timer';
    pElement.style.color = 'black';

    expect(pElement.innerHTML).toBe('Pomodoro timer');
    expect(pElement.style.color).toBe('black');
  });

  test('create div element', () => {
    const divElement = createElement('div');

    divElement.style.width = '50px';
    divElement.style.height = '50px';
    divElement.style.background = 'red';
    divElement.style.color = 'green';
    divElement.innerHTML = 'Pomodoro timer';

    expect(divElement.innerHTML).toBe('Pomodoro timer');
    expect(divElement.style.height).toBe('50px');
    expect(divElement.style.width).toBe('50px');
    expect(divElement.style.background).toBe('red');
    expect(divElement.style.color).toBe('green');
  });

  test('create button element', () => {
    const startBtnElement = createElement('Button');
    startBtnElement.innerHTML = 'Start';
    document.body.appendChild(startBtnElement);

    expect(startBtnElement.innerHTML).toBe('Start');

    const endBtnElement = createElement('Button');
    endBtnElement.innerHTML = 'End';
    document.body.appendChild(endBtnElement);

    expect(endBtnElement.innerHTML).toBe('End');
    expect(document.hasChildNodes()).toBe(true);
  });
});