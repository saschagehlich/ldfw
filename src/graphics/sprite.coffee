Vector2 = require "../math/vector2.coffee"
Node = require "../node.coffee"

module.exports =
class Sprite extends Node
  ###
   * A Sprite represents a drawable image
   * @param  [TextureAtlas] @TextureAtlas
  ###
  @renderOffset: new Vector2(0, 0)
  constructor: (@textureAtlas, @frame) ->
    super

    @rotation = 0

  getWidth: -> @frame.frame.w * @scale.x
  getHeight: -> @frame.frame.h * @scale.y

  getRotation: -> @rotation
  setRotation: (rotation) -> @rotation = rotation

  ###
   * Draws the sprite on the given context
   * @param  [CanvasRenderingContext2D] context
  ###
  draw: (context, drawX, drawY, mirroredX=false, mirroredY=false) ->
    image = @textureAtlas.getAtlasImage()

    # Source rectangle
    sx = @frame.frame.x
    sy = @frame.frame.y
    sw = @frame.frame.w
    sh = @frame.frame.h

    # Destination rectangle
    dw = @frame.frame.w * @scale.x
    dh = @frame.frame.h * @scale.y

    context.save()

    tx = Math.round (drawX || @position.x) + @origin.x + Sprite.renderOffset.x
    ty = Math.round (drawY || @position.y) + @origin.y + Sprite.renderOffset.y

    scaleX = if mirroredX then -1 else 1
    scaleY = if mirroredY then -1 else 1
    translateX = if mirroredX then tx + dw else tx
    translateY = if mirroredY then ty + dh else ty
    context.translate translateX, translateY
    context.scale scaleX, scaleY

    context.rotate Math.PI / 180 * @rotation

    context.drawImage image, sx, sy, sw, sh, -@origin.x, -@origin.y, dw, dh

    context.restore()
