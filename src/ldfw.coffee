LDFW =
  Game: require "./game.coffee"
  Screen: require "./screen.coffee"
  Actor: require "./actor.coffee"
  Stage: require "./stage.coffee"
  Node: require "./node.coffee"

  # Graphics
  TextureAtlas: require "./graphics/textureatlas.coffee"
  TextureRegion: require "./graphics/textureregion.coffee"
  Sprite: require "./graphics/sprite.coffee"
  BitmapFont: require "./graphics/bitmapfont.coffee"
  TileMap: require "./graphics/tilemap.coffee"

  # Math
  Vector2: require "./math/vector2.coffee"
  Rectangle: require "./math/rectangle.coffee"

  # Utilities
  Preloader: require "./utilities/preloader.coffee"
  Keyboard: require "./utilities/keyboard.coffee"

extend = (prototypeProperties) ->
  parent = this

  # Create a new class
  child = ->
    parent.apply this, arguments

  # Copy static properties
  for name, prop of parent
    child[name] = prop

  # Inherit from parent while avoiding
  # that the parent's constructor is called
  Surrogate = ->
    this.constructor = child
    return

  Surrogate.prototype = parent.prototype
  child.prototype = new Surrogate

  # Copy prototype properties
  for name, prop of prototypeProperties
    child.prototype[name] = prop

  return child

for mod in ["Game", "Screen", "Actor", "Stage", "Node"]
  LDFW[mod].extend = extend

module.exports = LDFW
