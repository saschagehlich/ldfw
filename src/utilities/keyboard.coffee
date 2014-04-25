EventEmitter = require "./eventemitter"

###
 * The Keyboard class emits "keydown" and "keyup" events and
 * can be asked whether a specific key is currently pressed
 * or not
###
module.exports =
class Keyboard extends EventEmitter
  Keys:
    LEFT: 37
    UP: 38
    RIGHT: 39
    DOWN: 40

    '0': 48
    '1': 49
    '2': 50
    '3': 51
    '4': 52
    '5': 53
    '6': 54
    '7': 55
    '8': 56
    '9': 57
    A: 65
    B: 66
    C: 67
    D: 68
    E: 69
    F: 70
    G: 71
    H: 72
    I: 73
    J: 74
    K: 75
    L: 76
    M: 77
    N: 78
    O: 79
    P: 80
    Q: 81
    R: 82
    S: 83
    T: 84
    U: 85
    V: 86
    W: 87
    X: 88
    Y: 89
    Z: 90
    NUMPAD0: 96
    NUMPAD1: 97
    NUMPAD2: 98
    NUMPAD3: 99
    NUMPAD4: 100
    NUMPAD5: 101
    NUMPAD6: 102
    NUMPAD7: 103
    NUMPAD8: 104
    NUMPAD9: 105
    ASTERISK: 106
    PLUS: 107
    MINUS: 109
    DOT: 110
    SLASH: 111
    F1: 112
    F2: 113
    F3: 114
    F4: 115
    F5: 116
    F6: 117
    F7: 118
    F8: 119
    F9: 120
    F10: 121
    F11: 122
    F12: 123

    SHIFT: 16
    SPACE: 32
    ENTER: 13
    ESC: 27

  constructor: ->
    @keyStates = []
    for key, keyCode of @Keys
      @keyStates[keyCode] = false

    $(window).keydown @_onKeyDown
    $(window).keyup @_onKeyUp

  ###
   * Is called whenever a key has been pressed
   * @param  {Event} e
   * @private
  ###
  _onKeyDown: (e) =>
    # Prevent the screen from moving when
    # a key like up, down, right, left or space
    # has been pressed
    if e.keyCode in [@Keys.UP, @Keys.RIGHT, @Keys.DOWN, @Keys.LEFT, @Keys.SPACE]
      e.preventDefault()

    # Publish a keydown event
    @emit "keydown", e

    # If we know this keycode, update
    # the key state
    keyCode = e.keyCode
    if @keyStates[keyCode]?
      @keyStates[keyCode] = true

  ###
   * Is called whenever a key has been released
   * @param  {Event} e
   * @private
  ###
  _onKeyUp: (e) =>
    # If we know this keycode, update
    # the key state
    keyCode = e.keyCode
    if @keyStates[keyCode]?
      @keyStates[keyCode] = false

  ###
   * Can be called to check whether a the given
   * keyCode is currently pressed or not
   * @param  {Number} keyCode
   * @return {Boolean}
   * @public
   *
   * @example
   *   var keyboard = new LDFW.Keyboard();
   *   if (keyboard.pressed(keyboard.R)) {
   *     alert("Stop pressing R for gods sake!");
   *   }
  ###
  pressed: (keyCode) ->
    @keyStates[keyCode] || false

  ###
   * Convenience method to ask whether a key that
   * indicates moving up / jumping (UP / W / SPACE)
   * is currently being pressed
   * @return {Boolean}
  ###
  upPressed: ->
    return @keyStates[@Keys.UP] || @keyStates[@Keys.W] || @keyStates[@Keys.SPACE]

  ###
   * Convenience method to ask whether a key that
   * indicates moving down (DOWN / S)
   * is currently being pressed
   * @return {Boolean}
  ###
  leftPressed: ->
    return @keyStates[@Keys.DOWN] || @keyStates[@Keys.S]

  ###
   * Convenience method to ask whether a key that
   * indicates moving left (LEFT / A)
   * is currently being pressed
   * @return {Boolean}
  ###
  leftPressed: ->
    return @keyStates[@Keys.LEFT] || @keyStates[@Keys.A]

  ###
   * Convenience method to ask whether a key that
   * indicates moving right (RIGHT / D)
   * is currently being pressed
   * @return {Boolean}
  ###
  rightPressed: ->
    return @keyStates[@Keys.RIGHT] || @keyStates[@Keys.D]
