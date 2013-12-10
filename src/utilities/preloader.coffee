EventEmitter = require "./eventemitter"
$ = require "jquery"

class Preloader extends EventEmitter
  constructor: (@app, @itemFilenames) ->
    @items = {}

  ###
   * Starts the loading process
  ###
  load: ->
    loadedItems = 0
    totalItems = @itemFilenames.length

    for file in @itemFilenames
      @loadItem file, (err, item) =>
        if err?
          return @emit "error", err

        @items[item.filename] = item.item

        loadedItems++
        if loadedItems is totalItems
          @emit "done"

  ###
   * Returns the item for the given filename
  ###
  get: (filename) ->
    unless @items[filename]?
      throw new Error("The file #{filename} has not been preloaded!")

    return @items[filename]

  ###
   * Initiates the loading process for the given filename
   * @param  [String] filename
   * @param  [Function] callback
   * @private
  ###
  loadItem: (filename, callback) =>
    extension = filename.split(".").pop()

    loadingMethod = @["load" + extension.toUpperCase()]
    unless loadingMethod?
      throw new Error("No loading method for " + filename)

    loadingMethod filename, callback

  ###
   * Loads a JSON file via AJAX
   * @param  [String] filename
   * @param  [Function] callback
   * @private
  ###
  loadJSON: (filename, callback) ->
    $.getJSON filename, (data) ->
      callback null, {
        filename: filename
        item: data
      }

  ###
   * Loads a FNT file via AJAX
   * @param  [String]   filename
   * @param  [Function] callback
  ###
  loadFNT: (filename, callback) ->
    $.get filename, (data) ->
      callback null, {
        filename: filename,
        item: data
      }

  ###
   * Loads an image item
   * @param  [String] filename
   * @param  [Function] callback
   * @private
  ###
  loadImage: (filename, callback) ->
    image = new Image()
    image.onload = ->
      callback null, {
        filename: filename
        item: image
      }
    image.src = filename

  loadPNG:  => @loadImage.apply(this, arguments)
  loadJPG:  => @loadImage.apply(this, arguments)
  loadJPEG: => @loadImage.apply(this, arguments)

module.exports = Preloader
