const CHESS_BOARD_EXELS_COUNT = 64;

function getKnightNextSteps(x, y) {
  return [
    document.querySelector(`.excel[x='${x + 1}'][y='${y + 2}']`),
    document.querySelector(`.excel[x='${x + 2}'][y='${y + 1}']`),
    document.querySelector(`.excel[x='${x + 2}'][y='${y - 1}']`),
    document.querySelector(`.excel[x='${x - 1}'][y='${y - 2}']`),
    document.querySelector(`.excel[x='${x - 2}'][y='${y - 1}']`),
    document.querySelector(`.excel[x='${x + 1}'][y='${y - 2}']`),
    document.querySelector(`.excel[x='${x - 2}'][y='${y + 1}']`),
    document.querySelector(`.excel[x='${x - 1}'][y='${y + 2}']`),
  ].filter((el) => el !== null && el !== undefined);
}

function clear() {
  document.querySelectorAll('.excel').forEach((element) => {
    element.classList.remove('active');
    element.classList.remove('current');
  });
}

function getCoordinates(excel) {
  return {
    x: parseInt(excel.getAttribute('x'), 10),
    y: parseInt(excel.getAttribute('y'), 10),
  };
}

function setKnightRandomPosition() {
  const excels = document.querySelectorAll('.excel');
  const rand = Math.round(Math.random() * CHESS_BOARD_EXELS_COUNT-1);
  return excels[rand];
}

function knight() {
  clear();

  this.classList.add('current');

  const { x, y } = getCoordinates(this);
  getKnightNextSteps(x, y).forEach((el) => el.classList.add('active'));
}

function drawField() {
  const field = document.querySelector('.field');

  let x = 1,
    y = 8;
  for (let index = 0; index < CHESS_BOARD_EXELS_COUNT; index++) {
    const excel = document.createElement('div');
    field.appendChild(excel);

    if (x > 8) {
      x = 1;
      y--;
    }

    excel.classList.add('excel');
    excel.setAttribute('x', x);
    excel.setAttribute('y', y);
    x++;

    (index % 2 == 0 && y % 2 == 0) || (index % 2 != 0 && y % 2 != 0)
      ? excel.classList.add('bg-white')
      : excel.classList.add('bg-black');
    excel.onclick = knight;
  }
}

function getNextStep() {
  const { x, y } = getCoordinates(this);

  const nextAvaibleSteps = getKnightNextSteps(x, y).filter(
    (el) => !el.classList.contains('set')
  );

  const countNextSteps = (step) => {
    const { x, y } = getCoordinates(step);

    return getKnightNextSteps(x, y).filter(
      (el) => !el.classList.contains('set')
    ).length;
  };

  const countNextStepsForStep = nextAvaibleSteps.map(countNextSteps);
  const minCountNextSteps = Math.min(...countNextStepsForStep);

  let nextStepIndex = 0;

  countNextStepsForStep.forEach((stepsCount, index) => {
    if (stepsCount === minCountNextSteps) {
      return (nextStepIndex = index);
    }
  });

  return nextAvaibleSteps[nextStepIndex];
}

function clearAll() {
  document.querySelectorAll('.excel').forEach((element) => {
    element.classList.remove('set');
    element.classList.remove('current');
    element.innerHTML = '';
  });
}

function move() {
  clearAll();
  const start = document.querySelector('#start');
  start.setAttribute('disabled', 'true');
  let currentStep = setKnightRandomPosition(),
    step = 1;

  const interval = setInterval(() => {
    if (currentStep !== undefined) {
      clear();
      currentStep.classList.add('current');
      currentStep.classList.add('set');
      currentStep.innerHTML += step;
      step++;
      currentStep = getNextStep.bind(currentStep)();
      return;
    }
    start.removeAttribute('disabled');
    return clearInterval(interval);
  }, 250);
}

drawField();
