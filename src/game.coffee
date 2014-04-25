requestAnimFrame = require "./utilities/animframe"

module.exports =
class Game
  constructor: (@wrapper, @debug = false) ->
    @canvas  = @wrapper.find("canvas").get(0)
    @setSize @wrapper.width(), @wrapper.height()

    @context = @canvas.getContext "2d"
    @running = false

    if @debug
      @setupStats()

  clearDisplay: ->
    @context.clearRect 0, 0, @canvas.width, @canvas.height

  ###
   * Sets the canvas size
  ###
  setSize: (width, height) ->
    @canvas.width  = width
    @canvas.height = height

  getWidth: -> @canvas.width
  getHeight: -> @canvas.height

  getWrapper: -> @wrapper

  ###
   * Stats the game's run loop
  ###
  run: ->
    @running = true
    @lastTick = new Date()
    requestAnimFrame @tick

  ###
   * Stops / pauses the game's run loop
  ###
  stop: ->
    @running = false

  ###
   * @public
  ###
  update: (delta) ->
    return

  ###
   * Our main game loop
   * @private
  ###
  tick: =>
    delta = (Date.now() - @lastTick) / 1000
    @lastTick = Date.now()

    @update delta

    # If we have a screen, make it tick!
    @screen?.update delta
    @clearDisplay()
    @screen?.draw @context

    if @running
      requestAnimFrame @tick
