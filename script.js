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
  ];
}

function knight() {
  clear();

  this.classList.add('current');
  const currentX = parseInt(this.getAttribute('x'), 10);
  const currentY = parseInt(this.getAttribute('y'), 10);

  getKnightNextSteps(currentX, currentY)
    .filter((el) => el !== null && el !== undefined)
    .forEach((el) => el.classList.add('active'));
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

function clear() {
  document.querySelectorAll('.excel').forEach((element) => {
    element.classList.remove('active');
    element.classList.remove('current');
  });
}

drawField();
