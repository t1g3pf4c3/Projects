
let cell_constructor = (x_pos, y_pos, figure_in, color, cell_function) => {
  let cell = {
    x: x_pos,
    y: y_pos,
    figure: figure_in,
    cell_graphics: `<div class='cell ${color}'>${figure_in}</div>`
  }
  return cell;
}

function createField() {
  let field = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
        row.push(`<div id='cell_${i}_${j}' class='cell white'></div>`)
      }
      else row.push(`<div id='cell_${i}_${j}' class='cell black'></div>`)
      let cell = document.querySelector('div');
      cell.addEventListener('click', handler)
      row.push(cell);
    }
    field.push(row);
  }
  return field;
}

handler = (a) => {
  console.log(a.target);
}

let sus = () => {
  console.log("sus");
}

let figures = ["♜", " ♞", " ♝", " ♛", " ♚", " ♝", " ♞", "♟"]
let chess_board = document.getElementById("chess-board");

let null_field = createField();

let draw_field = (board, field) => {
  // console.log(field[1, 1])
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.innerHTML += field[i][j];
    }
  }
}


draw_field(chess_board, null_field);
