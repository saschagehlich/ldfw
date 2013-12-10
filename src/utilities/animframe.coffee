module.exports = (->
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          (callback) ->
            window.setTimeout callback, 1000 / 60
)()
