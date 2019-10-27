function getMove(player, board) {
  if(player == 1){
    var rival = 2;
  }
  else{
    var rival = 1;
  }
  var bestMove = minimax(board, 3, player, rival, true);
  console.log(bestMove);
  return bestMove;
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};

function minimax(board, depth, player, rival, maxPlayer){
  var bestMove;
  if(depth == 0){
    return calculateScore(board, player);
  }
  validSpaces = validMoves(board, player, rival);
  console.log(validSpaces);
    if(maxPlayer){
      console.log('max');
      var score = -1000000;
      var tempBoard = board;
      validSpaces.forEach(function(move){
        tempBoard[move[0]][move[1]] = player;
        var value = Math.max(score, minimax(tempBoard, depth-1,player, rival, false));
        if(value > score){
          score = value;
          bestMove = move;
        }
      })
      console.log("max best:" + bestMove);
      return bestMove;
  }
  else{
    var score = 1000000;
      var tempBoard = board;
      validSpaces.forEach(function(move){
        console.log('min');
        tempBoard[move[0]][move[1]] = rival;
        var value = Math.min(score, minimax(tempBoard, depth-1, player, rival, true));
        if(value < score){
          score = value;
          bestMove = move;
        }
      })
      return bestMove;
  }
}
 
function validMoves(board, player, rival){
  var validSpaces = [];
  for(var row = 1; row<board.length; row++) {
    for(var col = 1; col<board.length; col++) {
        if(board[row][col] == player){
            var temp = findValidSpaces(row, col, board, player, rival)
            temp.forEach(function(coordinate){
              if(coordinate != null){
                validSpaces.push(coordinate);
              }
            })
      }
    }
  }
  return validSpaces;
}

function findValidSpaces(row, col, board, player, rival){
  var validSpaces = [];
  for(var r = -1; r <= 1; r++){
    for(var c = -1; c <= 1; c++){
      if(board[row + r][col + c] == rival){
        if(r == -1 && c == 0){
          validSpaces.push(searchUp(row, col, board));
        }
        else if(r == 1 && c == 0){
          validSpaces.push(searchDown(row, col, board));
        }
        else if(r == 0 && c == -1){
          validSpaces.push(searchLeft(row, col, board));
        }
        else if(r == 0 && c == 1){
          validSpaces.push(searchRight(row, col, board));
        }
        else if(r == -1 && c == -1){
          validSpaces.push(leftUpDiag(row, col, board));
        }
        else if(r == 1 && c == -1){
          validSpaces.push(leftDownDiag(row, col, board));
        }
        else if(r == -1 && c == 1){
          validSpaces.push(rightUpDiag(row, col, board));
        }
        else if(r == 1 && c == 1){
          validSpaces.push(rightDownDiag(row, col, board));
        }
      }
    }
  }
  return validSpaces;
}

function searchLeft(row, col, board){
  for(var c = col; c >= 0; c--){
    if(board[row][c] == 0){
      return [row, c];
    }
  }
  return null;
}

function searchRight(row, col, board){
  for(var c = col; c < 8; c++){
    if(board[row][c] == 0){
      return [row, c];
    }
  }
  return null;
}

function searchUp(row, col, board){
  for(var r = row; r >= 0; r--){
    if(board[r][col] == 0){
      return [r, col];
    }
  }
  return null;
}

function searchDown(row, col, board){
  for(var r = row; r < 8; r++){
    if(board[r][col] == 0){
      return [r, col];
    }
  }
  return null;
}

function leftUpDiag(row, col, board){
  var c = col;
  for(var r = row; r >= 0; r--){
    c = c - 1;
    if(c < 0){
      return null;
    }
    if(board[r][c] == 0){
      return [r, c];
    }
  }
  return null;
}

function rightUpDiag(row, col, board){
  var c = col;
  for(var r = row; r >= 0; r--){
    c = c + 1;
    if(c > 7){
      return null;
    }
    if(board[r][c] == 0){
      return [r, c];
    }
  }
  return null;
}

function leftDownDiag(row, col, board){
  var c = col;
  for(var r = row; r < 8; r++){
    c = c - 1;
    if(c < 0){
      return null;
    }
    if(board[r][c] == 0){
      return [r, c];
    }
  }
  return null;
}

function rightDownDiag(row, col, board){
  var c = col;
  for(var r = row; r < 8; r++){
    c = c + 1;
    if(c > 7){
      return null;
    }
    if(board[r][c] == 0){
      return [r, c];
    }
  }
  return null;
}

function calculateScore(board, player){
  var score = 0;
  for(var row = 0; row < board.length; row++){
    for(var col = 0; col < board.length; col++){
      if(board[row][col] == player){
        score++;
        if(row == 0 || col == 0){
          score += 10;
        }
      }
    }
  }
  return score;
}