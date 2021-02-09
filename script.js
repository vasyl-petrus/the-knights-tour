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
  const rand = Math.round(Math.random() * 63);
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
  for (let index = 0; index < 64; index++) {
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

function getNextStep(current) {
  const { x, y } = getCoordinates(current);

  const nextAvaibleSteps = getKnightNextSteps(x, y).filter(
    (el) => !el.classList.contains('set')
  );

  const CountNextSteps = (step) => {
    const { x, y } = getCoordinates(step);

    return getKnightNextSteps(x, y).filter(
      (el) => !el.classList.contains('set')
    ).length;
  };

  const countNextStepsForStep = nextAvaibleSteps.map(CountNextSteps);
  const minCountNextSteps = Math.min(...countNextStepsForStep);

  let nextStepIndex = 0;

  countNextStepsForStep.forEach((stepsCount, index) => {
    if (stepsCount === minCountNextSteps) {
      return (nextStepIndex = index);
    }
  });

  return nextAvaibleSteps[nextStepIndex];
}

function init(start) {
  knight.bind(start)();
}

drawField();
init(setKnightRandomPosition());
