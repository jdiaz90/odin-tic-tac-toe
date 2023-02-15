const boardFactory = (player1, player2) => {

    const board = [
        ["", "", ""],
        ["", "x", ""],
        ["", "", "o"],
    ]

    const getCell = (row, col) => document.querySelector(`[data-row="${row}"][data-col="${col}"]`)

    const fillBoard = () => {
        board.forEach((row, indexRow) => {
            row.forEach((col, indexCol) => {
                const cell = getCell(indexRow, indexCol)
                cell.textContent = col
            })
        });
    }

    return { board, fillBoard }

}

const playerFactory = (name, write) => {

    return { name, write }

}

const board = boardFactory(
    playerFactory('Javier', 'X'),
    playerFactory('Lucas', '0'))
board.fillBoard()
