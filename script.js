const playerFactory = (name, brush) => {

    let points = 0

    const addWin = () => points++

    return { name, brush, points, addWin }

}

const player1 = playerFactory('', 'X')
const player2 = playerFactory('', '0')

const nameModule = (() => {

    const checkNames = () => {
        if (inputPlayer1.value != '' && inputPlayer2.value != '') {
            player1.name = inputPlayer1.value 
            player2.name = inputPlayer2.value 
            divPlayer1Name.textContent = player1.name
            divPlayer2Name.textContent = player2.name
            return true
        }
        else return false
    }

    return { checkNames }

})(player1, player2);

const boardModule = ((player1, player2) => {

    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    let turn = player1
    let winner = false

    const nextTurn = () => {
        if (turn === player1) turn = player2
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

    const combinations = (player) => {
        if (
            (board[0][0] === player.brush && board[0][1] === player.brush && board[0][2] === player.brush)
            || (board[1][0] === player.brush && board[1][1] === player.brush && board[1][2] === player.brush)
            || (board[2][0] === player.brush && board[2][1] === player.brush && board[2][2] === player.brush)

            || (board[0][0] === player.brush && board[1][0] === player.brush && board[2][0] === player.brush)
            || (board[0][1] === player.brush && board[1][1] === player.brush && board[2][1] === player.brush)
            || (board[0][2] === player.brush && board[1][2] === player.brush && board[2][2] === player.brush)

            || (board[0][0] === player.brush && board[1][1] === player.brush && board[2][2] === player.brush)
            || (board[0][2] === player.brush && board[1][1] === player.brush && board[2][0] === player.brush)

        ) return true
        else return false
    }

    const checkWinner = (player1, player2) => {
        if (combinations(player1)) {
            player1.addWin()
            divPlayer1Points.textContent = player1.points
            return player1
        } else if (combinations(player2)) { 
            player2.addWin()
            divPlayer2Points.textContent = player2.points
            return player2 
        } else {
            return null
        }
    }

    const checkDraw = () => {

        let draw = true

        board.forEach((row) => {
            row.forEach((col) => {
                if (col === '') {
                    draw = false
                }
            })
        });

        return draw

    }

    const printWinner = (player) => {

        if (player != null) {
            divWinner.textContent = `${player.name} wins!`
            return true
        } 

        if (checkDraw()) {
            divWinner.textContent = 'Draw!'
            return true
        } else return false
    }

    const fillCell = (row, col) => {
        const cell = setCellInfo(document.createElement('td'), row, col)
        boardHTML.appendChild(cell)
        if (cell.textContent == '' && !winner) {
            cell.addEventListener('click', () => {
                brushCell(cell, row, col)
                winner = printWinner(checkWinner(player1, player2))
                nextTurn()
                clearBoardHTML()
                fillBoard()
            })
        }
    }

    const clearBoard = () => {
        board.forEach((row, indexRow) => {
            row.forEach((col, indexCol) => {
                board[indexRow][indexCol] = ''
            })
        });
    }

    const clearBoardHTML = () => {
        while (boardHTML.firstChild) boardHTML.removeChild(boardHTML.firstChild)
    }

    const fillBoard = () => {
        board.forEach((row, indexRow) => {
            row.forEach((col, indexCol) => {
                fillCell(indexRow, indexCol)
            })
        });
    }

    const newRound = () => {
        winner = false
        clearBoard()
        clearBoardHTML()
        fillBoard()
        turn = player1
    }

    return { board, fillBoard, clearBoardHTML, clearBoard, newRound }

})(player1, player2);

const modal = document.querySelector('#modal')
const inputPlayer1 = document.querySelector('#player1')
const inputPlayer2 = document.querySelector('#player2')
const buttonPlay = document.querySelector('#buttonPlay')
const boardHTML = document.querySelector('.container')
const divPlayer1Name = document.querySelector('.player1.name')
const divPlayer2Name = document.querySelector('.player2.name')
const divWinner = document.querySelector('.winner')
const divPlayer1Points = document.querySelector('.player1.points')
const divPlayer2Points = document.querySelector('.player2.points')
const buttonPlayAgain = document.querySelector('.buttons > button:first-child')

boardModule.clearBoardHTML()
boardModule.fillBoard()

window.addEventListener('load', () => {
    window.modal.showModal()
})

buttonPlay.addEventListener('click', () => {
    if (nameModule.checkNames()) {
        window.modal.close()
    } else {
        alert('We need the name of all the players.')
    }
})

buttonPlayAgain.addEventListener('click', () => {
    boardModule.newRound()
})
