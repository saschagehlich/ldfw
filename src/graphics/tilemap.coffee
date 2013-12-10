define (require, exports, module) ->
  Vector2 = require "../math/vector2.coffee"
  Node    = require "../node.coffee"
  Actor    = require "../actor.coffee"

  class TileMap
    ###
     * A TileMap represents a level or map that is composed by tiles.
     * This class accepts jsons as exported by 'Tiled'
     * @param  {game} @game
     * @param  {tilesJson} @tilesJson
     * @param  {image} @image
    ###
    constructor: (@game, tilesJson, @image) ->
      # extract JSON infos
      @tileWidth = tilesJson['tileheight']
      @tileHeight = tilesJson['tilewidth']
      @tileSpacing = tilesJson['tilesets'][0]['spacing']

      @layers = []

      for layer in tilesJson['layers']
        newLayer = layer['data']
        newLayer.width = layer['width']
        newLayer.height = layer['height']
        newLayer.scrollX = 0
        newLayer.scrollY = 0
        @layers.push(newLayer)

      # calculate missing infos
      @numTilesOnTileSetX =  (@image.width - @tileSpacing) / (@tileWidth + @tileSpacing)

    ###
     * Sets the scrollX position for all layers
     * @param {number} scrollX
    ###
    setScrollX: (scrollX) ->
      for layer in @layers
        layer.scrollX = scrollX

    ###
     * Sets the scrollY position for all layers
     * @param {number} scrollY
    ###
    setScrollY: (scrollY) ->
      for layer in @layers
        layer.scrollY = scrollY

    ###
     * Sets the scrollX position for a specific layer
     * @param {number} layerIndex
     * @param {number} scrollX
    ###
    setScrollX: (layerIndex, scrollX) -> @layers[layerIndex].scrollX = scrollX

    ###
     * Sets the scrollY position for a specific layer
     * @param {number} layerIndex
     * @param {number} scrollY
    ###
    setScrollY: (layerIndex, scrollY) -> @layers[layerIndex].scrollY = scrollY

    ###
     * Gets the scrollX position for a specific layer
     * @param {number} layerIndex
    ###
    getScrollX: (layerIndex) -> @layers[layerIndex].scrollX

    ###
     * Gets the scrollY position for a specific layer
     * @param {number} layerIndex
    ###
    getScrollY: (layerIndex) -> @layers[layerIndex].scrollY

    ###
     * Draws the TileMap on the given context
     * @param  [CanvasRenderingContext2D] context
    ###
    draw: (context) ->
      for layer in @layers
        visibleTilesX = Math.ceil( @game.getWidth() / @tileWidth )
        visibleTilesY = Math.ceil( @game.getHeight() / @tileHeight )
        # Source rectangle
        sw = @tileWidth
        sh = @tileHeight

        # Destination rectangle
        dw = @tileWidth
        dh = @tileHeight

        indexOffsetX = Math.floor(layer.scrollX / @tileWidth)
        indexOffsetY = Math.floor(layer.scrollY / @tileHeight)
        softOffsetX = layer.scrollX % @tileWidth
        softOffsetY = layer.scrollY % @tileHeight

        if @image?
          for y in [0..visibleTilesY]
            for x in [0..visibleTilesX]
              index =  x + indexOffsetX + (y + indexOffsetY) * layer.width

              tileNumber = layer[index] - 1

              sx = @tileSpacing + (@tileWidth + @tileSpacing) * (tileNumber % @numTilesOnTileSetX)
              sy = @tileSpacing + (@tileHeight + @tileSpacing) * Math.floor(tileNumber / @numTilesOnTileSetX)

              context.drawImage @image, sx, sy, sw, sh, x * dw - softOffsetX, y * dh - softOffsetY, dw, dh

  module.exports = TileMap
