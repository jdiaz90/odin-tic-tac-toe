const boardFactory = (player1, player2) => {

    const boardHTML = document.querySelector('.container')
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    let turn = player1

    const nextTurn = () => {
        if(turn === player1) turn = player2
        else turn = player1
    }

    const setCellInfo = (cell, row, col) => {
        cell.setAttribute('data-row', row)
        cell.setAttribute('data-col', col)
        cell.classList.add('cell')
        cell.textContent = board[row][col]
        return cell
    }

    const brushCell = (cell, row, col) => {
        cell.textContent = turn.brush
        board[row][col] = turn.brush
        return cell
    }

    const fillCell = (row, col) => {
        const cell = setCellInfo(document.createElement('td'), row, col)
        if (cell.textContent == '') {
            cell.addEventListener('click', () => {
                brushCell(cell, row, col)
                nextTurn()
                clearBoard()
                fillBoard()
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

const playerFactory = (name, brush) => {

    return { name, brush }

}

const board = boardFactory(
    playerFactory('Javier', 'X'),
    playerFactory('Lucas', '0'))
board.clearBoard()
board.fillBoard()
