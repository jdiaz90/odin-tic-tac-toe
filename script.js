const boardFactory = () => {

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

const board = boardFactory()
board.fillBoard()
