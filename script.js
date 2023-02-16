const boardFactory = (player1, player2) => {

    const boardHTML = document.querySelector('.container')
    const board = [
        ["", "", ""],
        ["", "X", ""],
        ["", "", "O"],
    ]

    const fillCell = (row, col) => {
        const cell = document.createElement('td')
        cell.classList.add('cell')
        cell.setAttribute('data-row', row)
        cell.setAttribute('data-col', col)
        cell.textContent = board[row][col]
        if (cell.textContent == '') {
            cell.addEventListener('click', () => {
                cell.textContent = 'X'
            })
        } 
        boardHTML.appendChild(cell)
    }

    const clearBoard = () => {

        while (boardHTML.firstChild) boardHTML.removeChild(boardHTML.firstChild)
    }

    const fillBoard = () => {
        board.forEach((row, indexRow) => {
            row.forEach((col, indexCol) => {
                fillCell(indexRow, indexCol)
            })
        });
    }

    return { board, fillBoard, clearBoard }

}

const playerFactory = (name, write) => {

    return { name, write }

}

const board = boardFactory(
    playerFactory('Javier', 'X'),
    playerFactory('Lucas', '0'))
board.clearBoard()
board.fillBoard()
