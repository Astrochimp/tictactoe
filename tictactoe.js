(function () {
  var resetboard = document.getElementById('resetboard')
  var blocks = document.getElementsByTagName('li')
  var messageoverlay = document.getElementById('message-overlay')
  var messagetext = document.getElementById('message-text')
  var blocklist = Array.prototype.slice.call(blocks)
  var player = 'O'
  var boarditems = ['', '', '', '', '', '', '', '', '']
  var wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [1, 4, 7], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  var gameover = false
  var xwins = 0
  var ywins = 0

  var messageUpdate = function (msg) {
    if (msg) {
      messagetext.style.display = ''
      messageoverlay.style.display = ''
      messagetext.innerHTML = msg
    } else {
      messagetext.style.display = 'none'
      messageoverlay.style.display = 'none'
      messagetext.innerHTML = ''
    }
  }

  var updateWins = function () {
    document.getElementById('xwins').innerHTML = xwins
    document.getElementById('ywins').innerHTML = ywins
  }

  var checkWin = function (player, message) {
    var boardindex = []
    var xo = boarditems.indexOf(player)
    while (xo !== -1) {
      boardindex.push(xo)
      xo = boarditems.indexOf(player, xo + 1)
    }

    var isWin = false

    wins.forEach(function (wincheck) {
      var matchcount = 0
      wincheck.forEach(function (item) {
        if (boardindex.includes(item)) {
          matchcount++
        }
      })

      if (matchcount === 3) {
        isWin = true
      }
    })

    return isWin
  }

  var checkPlayer = function (item) {
    if (!gameover) {
      player = ((player === 'X') ? 'O' : 'X')
      boarditems[item] = player
      if (checkWin(player)) {
        messageUpdate(player + ' WINS!')

        if (player === 'X') {
          xwins++
        } else {
          ywins++
        }
        updateWins()
        gameover = true
      } else if (boarditems.indexOf('') === -1) {
        messageUpdate('Cat\'s Eye')
        gameover = true
      }
      return player
    }
  }

  resetboard.addEventListener('click', function () {
    blocklist.forEach(function (xo) {
      xo.innerHTML = ''
      boarditems = ['', '', '', '', '', '', '', '', '']
      messageUpdate()
      gameover = false
    })
  })

  blocklist.forEach(function (xo, i) {
    xo.addEventListener('click', function () {
      this.innerHTML = checkPlayer(i)
    })
  })

  messageUpdate()
  updateWins()
}())
