const boardFactory = (player1, player2) => {

    const boardHTML = document.querySelector('.container')
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    let turn = player1

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
        if(
            (board[0][0] === player.brush && board[0][1] === player.brush && board[0][2] === player.brush)
            ||(board[1][0] === player.brush && board[1][1] === player.brush && board[1][2] === player.brush)
            ||(board[2][0] === player.brush && board[2][1] === player.brush && board[2][2] === player.brush)

            ||(board[0][0] === player.brush && board[1][0] === player.brush && board[2][0] === player.brush)
            ||(board[0][1] === player.brush && board[1][1] === player.brush && board[2][1] === player.brush)
            ||(board[0][2] === player.brush && board[1][2] === player.brush && board[2][2] === player.brush)

            ||(board[0][0] === player.brush && board[1][1] === player.brush && board[2][2] === player.brush)
            ||(board[0][2] === player.brush && board[1][1] === player.brush && board[2][0] === player.brush)

        ) return true
        else return false
    }

    const checkWinner = (player1, player2) => {
        if(combinations(player1)) return player1 
        else if(combinations(player2)) return player2
        else return null
    }

    const checkDraw = () => {

        let draw = true

        board.forEach((row) => {
            row.forEach((col) => {
                if(col === '') {
                    draw = false
                }
            })
        });
        
        return draw

    }

    const printWinner = (player) => {

        if(checkDraw() === true) {
            alert('Draw!')
            return true
        }

        if(player != null) {
            alert(`${player.name} wins!`)
            return true
        } else return false
    }

    const fillCell = (row, col) => {
        const cell = setCellInfo(document.createElement('td'), row, col)
        if (cell.textContent == '') {
            cell.addEventListener('click', () => {
                brushCell(cell, row, col)
                nextTurn()
                clearBoard()
                fillBoard()
                printWinner(checkWinner(player1, player2))
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
