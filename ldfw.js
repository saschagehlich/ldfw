
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define('game',['require','exports','module'],function(require, exports, module) {
    var Game;
    Game = (function() {
      function Game(wrapper, debug) {
        this.wrapper = wrapper;
        this.debug = debug != null ? debug : false;
        this.tick = __bind(this.tick, this);
        this.canvas = this.wrapper.find("canvas").get(0);
        this.setSize(this.wrapper.width(), this.wrapper.height());
        this.context = this.canvas.getContext("2d");
        this.running = false;
        if (this.debug) {
          this.setupStats();
        }
      }

      Game.prototype.clearScreen = function() {
        return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      };

      /*
       * Sets the canvas size
      */


      Game.prototype.setSize = function(width, height) {
        this.canvas.width = width;
        return this.canvas.height = height;
      };

      Game.prototype.getWidth = function() {
        return this.canvas.width;
      };

      Game.prototype.getHeight = function() {
        return this.canvas.height;
      };

      Game.prototype.getWrapper = function() {
        return this.wrapper;
      };

      /*
       * Sets up mrdoob's stats library
      */


      Game.prototype.setupStats = function() {
        var dom;
        this.fpsStats = new Stats();
        this.fpsStats.setMode(0);
        dom = $(this.fpsStats.domElement);
        dom.css({
          position: "absolute",
          left: -dom.width(),
          top: 0
        });
        this.wrapper.append(this.fpsStats.domElement);
        this.fpsMsStats = new Stats();
        this.fpsMsStats.setMode(1);
        dom = $(this.fpsMsStats.domElement);
        dom.css({
          position: "absolute",
          left: -dom.width(),
          top: 50
        });
        this.wrapper.append(this.fpsMsStats.domElement);
        this.tickStats = new Stats();
        this.tickStats.setMode(1);
        dom = $(this.tickStats.domElement);
        dom.css({
          position: "absolute",
          left: -dom.width(),
          top: 100
        });
        return this.wrapper.append(this.tickStats.domElement);
      };

      /*
       * Stats the game's run loop
      */


      Game.prototype.run = function() {
        this.running = true;
        this.lastTick = new Date();
        return requestAnimFrame(this.tick);
      };

      /*
       * Stops / pauses the game's run loop
      */


      Game.prototype.stop = function() {
        return this.running = false;
      };

      /*
       * Our main game loop
      */


      Game.prototype.tick = function() {
        var delta, _ref, _ref1;
        delta = (Date.now() - this.lastTick) / 1000;
        this.lastTick = Date.now();
        if (this.debug) {
          this.tickStats.begin();
        }
        if ((_ref = this.screen) != null) {
          _ref.update(delta);
        }
        if (this.debug) {
          this.tickStats.end();
        }
        if (this.debug) {
          this.fpsStats.begin();
        }
        if (this.debug) {
          this.fpsMsStats.begin();
        }
        this.clearScreen();
        if ((_ref1 = this.screen) != null) {
          _ref1.draw(this.context);
        }
        if (this.debug) {
          this.fpsStats.end();
        }
        if (this.debug) {
          this.fpsMsStats.end();
        }
        if (this.running) {
          return requestAnimFrame(this.tick);
        }
      };

      return Game;

    })();
    return module.exports = Game;
  });

}).call(this);

(function() {
  define('screen',['require','exports','module'],function(require, exports, module) {
    var Screen;
    Screen = (function() {
      /*
       * @param  [Game] game
      */

      function Screen(game) {
        this.game = game;
        return;
      }

      /*
       * Called at the beginning of every tick, update properties and do
       * calculations in here
       * @param  [Number] delta
      */


      Screen.prototype.update = function(delta) {};

      /*
       * Called after update, draw stuff here
       * @param  [CanvasRenderingContext2D] context
      */


      Screen.prototype.draw = function(context) {};

      return Screen;

    })();
    return module.exports = Screen;
  });

}).call(this);

(function() {
  define('math/vector2',['require','exports','module'],function(require, exports, module) {
    var Vector2;
    Vector2 = (function() {
      function Vector2(x, y) {
        this.x = x != null ? x : 0;
        this.y = y != null ? y : 0;
        return;
      }

      /*
       * Sets the new position of the Vector2
       * @param [Number] x
       * @param [Number] y
      */


      Vector2.prototype.set = function(x, y) {
        var otherV2;
        if (x instanceof Vector2) {
          otherV2 = x;
          this.x = otherV2.x;
          this.y = otherV2.y;
        } else {
          this.x = x;
          this.y = y;
        }
        return this;
      };

      /*
       * Returns a clone of this Vector
       * @return {Vector2}
      */


      Vector2.prototype.clone = function() {
        return new Vector2(this.x, this.y);
      };

      /*
       * Floors the values of this Vector
      */


      Vector2.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      };

      /*
       * Rounds the values of this Vector
      */


      Vector2.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      };

      /*
       * Substracts the given values from this Vector
       * @param [Number] x
       * @param [Number] y
      */


      Vector2.prototype.substract = function(x, y) {
        var v2;
        if (x instanceof Vector2) {
          v2 = x;
          x = v2.getX();
          y = v2.getY();
        } else if ((x != null) && (y == null)) {
          y = x;
        }
        this.x = this.x - x;
        this.y = this.y - y;
        return this;
      };

      /*
       * Adds the given values to this Vector
       * @param [Number] x
       * @param [Number] y
      */


      Vector2.prototype.add = function(x, y) {
        var v2;
        if (x instanceof Vector2) {
          v2 = x;
          x = v2.getX();
          y = v2.getY();
        } else if ((x != null) && (y == null)) {
          y = x;
        }
        this.x = this.x + x;
        this.y = this.y + y;
        return this;
      };

      /*
       * Divides this Vector by the given values
       * @param [Number] x
       * @param [Number] y
      */


      Vector2.prototype.divideBy = function(x, y) {
        var v2;
        if (x instanceof Vector2) {
          v2 = x;
          x = v2.getX();
          y = v2.getY();
        } else if ((x != null) && (y == null)) {
          y = x;
        }
        this.x = this.x / x;
        this.y = this.y / y;
        return this;
      };

      /*
       * Multiplies this Vector with the given values
       * @param [Number] x
       * @param [Number] y
      */


      Vector2.prototype.multiply = function(x, y) {
        var v2;
        if (x instanceof Vector2) {
          v2 = x;
          x = v2.getX();
          y = v2.getY();
        } else if ((x != null) && (y == null)) {
          y = x;
        }
        this.x = this.x * x;
        this.y = this.y * y;
        return this;
      };

      /*
       * Returns the x value
       * @return [Number]
      */


      Vector2.prototype.getX = function() {
        return this.x;
      };

      /*
       * Returns the y value
       * @return [Number]
      */


      Vector2.prototype.getY = function() {
        return this.y;
      };

      /*
       * Sets the x value
       * @param [Number] x
      */


      Vector2.prototype.setX = function(x) {
        return this.x = x;
      };

      /*
       * Sets the y value
       * @param [Number] y
      */


      Vector2.prototype.setY = function(y) {
        return this.y = y;
      };

      return Vector2;

    })();
    return module.exports = Vector2;
  });

}).call(this);

(function() {
  define('math/rectangle',['require','exports','module','./vector2'],function(require, exports, module) {
    var Rectangle, Vector2;
    Vector2 = require("./vector2");
    Rectangle = (function() {
      function Rectangle(x, y, width, height) {
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        this.width = width != null ? width : 0;
        this.height = height != null ? height : 0;
        this.position = new Vector2(x, y);
      }

      /*
       * Sets the position
      */


      Rectangle.prototype.setPosition = function() {
        return this.position.set.call(this, arguments);
      };

      /*
       * Sets the size values
       * @param [Number] width
       * @param [Number] height
      */


      Rectangle.prototype.setSize = function(width, height) {
        this.width = width;
        return this.height = height;
      };

      Rectangle.prototype.getWidth = function() {
        return this.width;
      };

      Rectangle.prototype.getHeight = function() {
        return this.height;
      };

      return Rectangle;

    })();
    return module.exports = Rectangle;
  });

}).call(this);

(function() {
  define('node',['require','exports','module','./math/vector2','./math/rectangle'],function(require, exports, module) {
    var Node, Rectangle, Vector2;
    Vector2 = require("./math/vector2");
    Rectangle = require("./math/rectangle");
    Node = (function() {
      function Node(game) {
        this.game = game;
        this.origin = new Vector2();
        this.position = new Vector2();
        this.scale = new Vector2(1, 1);
        this.rect = new Rectangle();
      }

      /*
        Position
      */


      Node.prototype.getPosition = function() {
        return this.position;
      };

      Node.prototype.setPosition = function(x, y) {
        return this.position.set(x, y);
      };

      Node.prototype.getX = function() {
        return this.position.getX();
      };

      Node.prototype.setX = function(x) {
        return this.position.setX(x);
      };

      Node.prototype.getY = function() {
        return this.position.getY();
      };

      Node.prototype.setY = function(y) {
        return this.position.setY(y);
      };

      /*
        Scale
      */


      Node.prototype.getScale = function() {
        return this.scale;
      };

      Node.prototype.setScale = function(x, y) {
        return this.scale.set(x, y);
      };

      Node.prototype.getScaleX = function() {
        return this.scale.getX();
      };

      Node.prototype.setScaleX = function(x) {
        return this.scale.setX(x);
      };

      Node.prototype.getScaleY = function() {
        return this.scale.getY();
      };

      Node.prototype.setScaleY = function(y) {
        return this.scale.setY(y);
      };

      /*
        Origin
      */


      Node.prototype.getOrigin = function() {
        return this.origin;
      };

      Node.prototype.setOrigin = function(x, y) {
        return this.origin.set(x, y);
      };

      Node.prototype.getOriginX = function() {
        return this.scale.getX();
      };

      Node.prototype.setOriginX = function(x) {
        return this.origin.setX(x);
      };

      Node.prototype.getOriginY = function() {
        return this.origin.getY();
      };

      Node.prototype.setOriginY = function(y) {
        return this.origin.setY(y);
      };

      /*
        Size
      */


      Node.prototype.getSize = function() {
        return this.rect.getSize();
      };

      Node.prototype.setSize = function(width, height) {
        return this.rect.setSize(width, height);
      };

      Node.prototype.getWidth = function() {
        return this.rect.getWidth();
      };

      Node.prototype.getHeight = function() {
        return this.rect.getHeight();
      };

      return Node;

    })();
    return module.exports = Node;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('actor',['require','exports','module','./node'],function(require, exports, module) {
    var Actor, Node;
    Node = require("./node");
    Actor = (function(_super) {
      __extends(Actor, _super);

      /*
       * @param  [Game] game
      */


      function Actor(game) {
        this.game = game;
        Actor.__super__.constructor.apply(this, arguments);
      }

      /*
       * Called at the beginning of every tick, update properties and do
       * calculations in here
       * @param  [Number] delta
      */


      Actor.prototype.update = function(delta) {};

      /*
       * Called after update, draw stuff here
       * @param  [CanvasRenderingContext2D] context
      */


      Actor.prototype.draw = function(context) {};

      return Actor;

    })(Node);
    return module.exports = Actor;
  });

}).call(this);

(function() {
  define('stage',['require','exports','module'],function(require, exports, module) {
    var Stage;
    Stage = (function() {
      /*
       * @param  [Game] game
      */

      function Stage(game) {
        this.game = game;
        this.actors = [];
      }

      /*
       * Adds a new actor to the list
       * @param [Actor] actor
      */


      Stage.prototype.addActor = function(actor) {
        return this.actors.push(actor);
      };

      /*
       * Removes an actor from the list
       * @param  [Actor] actor
      */


      Stage.prototype.removeActor = function(actor) {
        var index;
        index = this.actors.indexOf(actor);
        if (index >= 0) {
          return this.actors.splice(index, 1);
        }
      };

      /*
       * Called at the beginning of every tick, update properties and do
       * calculations in here
       * @param  [Number] delta
      */


      Stage.prototype.update = function(delta) {
        var actor, _i, _len, _ref, _results;
        _ref = this.actors;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          actor = _ref[_i];
          _results.push(actor.update(delta));
        }
        return _results;
      };

      /*
       * Called after update, draw stuff here
       * @param  [CanvasRenderingContext2D] context
      */


      Stage.prototype.draw = function(context) {
        var actor, _i, _len, _ref, _results;
        _ref = this.actors;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          actor = _ref[_i];
          _results.push(actor.draw(context));
        }
        return _results;
      };

      return Stage;

    })();
    return module.exports = Stage;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('graphics/sprite',['require','exports','module','../math/vector2','../node'],function(require, exports, module) {
    var Node, Sprite, Vector2;
    Vector2 = require("../math/vector2");
    Node = require("../node");
    Sprite = (function(_super) {
      __extends(Sprite, _super);

      /*
       * A Sprite represents a drawable image
       * @param  [TextureAtlas] @TextureAtlas
      */


      Sprite.renderOffset = new Vector2(0, 0);

      function Sprite(textureAtlas, frame) {
        this.textureAtlas = textureAtlas;
        this.frame = frame;
        Sprite.__super__.constructor.apply(this, arguments);
        this.rotation = 0;
      }

      Sprite.prototype.getWidth = function() {
        return this.frame.frame.w * this.scale.x;
      };

      Sprite.prototype.getHeight = function() {
        return this.frame.frame.h * this.scale.y;
      };

      Sprite.prototype.getRotation = function() {
        return this.rotation;
      };

      Sprite.prototype.setRotation = function(rotation) {
        return this.rotation = rotation;
      };

      /*
       * Draws the sprite on the given context
       * @param  [CanvasRenderingContext2D] context
      */


      Sprite.prototype.draw = function(context, drawX, drawY, mirrored) {
        var dh, dw, image, sh, sw, sx, sy, tx, ty;
        if (mirrored == null) {
          mirrored = false;
        }
        image = this.textureAtlas.getAtlasImage();
        sx = this.frame.frame.x;
        sy = this.frame.frame.y;
        sw = this.frame.frame.w;
        sh = this.frame.frame.h;
        dw = this.frame.frame.w * this.scale.x;
        dh = this.frame.frame.h * this.scale.y;
        context.save();
        tx = Math.round((drawX || this.position.x) + this.origin.x + Sprite.renderOffset.x);
        ty = Math.round((drawY || this.position.y) + this.origin.y + Sprite.renderOffset.y);
        if (mirrored) {
          context.translate(tx + dw, ty);
          context.scale(-1, 1);
        } else {
          context.translate(tx, ty);
        }
        context.rotate(Math.PI / 180 * this.rotation);
        context.drawImage(image, sx, sy, sw, sh, -this.origin.x, -this.origin.y, dw, dh);
        return context.restore();
      };

      return Sprite;

    })(Node);
    return module.exports = Sprite;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('graphics/animsprite',['require','exports','module','../math/vector2','./sprite'],function(require, exports, module) {
    var AnimSprite, Sprite, Vector2;
    Vector2 = require("../math/vector2");
    Sprite = require("./sprite");
    AnimSprite = (function(_super) {
      __extends(AnimSprite, _super);

      function AnimSprite(textureAtlas, frame, spriteCount, animationInterval) {
        this.textureAtlas = textureAtlas;
        this.frame = frame;
        this.spriteCount = spriteCount;
        this.animationInterval = animationInterval;
        AnimSprite.__super__.constructor.apply(this, arguments);
        this.rotation = 0;
        this.sumDelta = 0;
        this.spriteIndex = 0;
      }

      AnimSprite.prototype.getWidth = function() {
        return this.frame.frame.w * this.scale.x;
      };

      AnimSprite.prototype.getHeight = function() {
        return this.frame.frame.h * this.scale.y;
      };

      AnimSprite.prototype.getRotation = function() {
        return this.rotation;
      };

      AnimSprite.prototype.setRotation = function(rotation) {
        return this.rotation = rotation;
      };

      AnimSprite.prototype.update = function(delta) {
        if (this.sumDelta >= this.animationInterval) {
          this.spriteIndex++;
          if (this.spriteIndex > this.spriteCount - 1) {
            this.spriteIndex = 0;
          }
          this.sumDelta -= this.animationInterval;
        }
        return this.sumDelta += delta;
      };

      /*
       * Draws the sprite on the given context
       * @param  [CanvasRenderingContext2D] context
      */


      AnimSprite.prototype.draw = function(context, drawX, drawY, mirrored) {
        var dh, dw, image, sh, sw, sx, sy, tx, ty, widthPerSprite;
        if (mirrored == null) {
          mirrored = false;
        }
        image = this.textureAtlas.getAtlasImage();
        widthPerSprite = Math.floor(this.frame.frame.w / this.spriteCount);
        sx = this.frame.frame.x;
        sy = this.frame.frame.y;
        sw = widthPerSprite;
        sh = this.frame.frame.h;
        sx += widthPerSprite * this.spriteIndex;
        dw = widthPerSprite * this.scale.x;
        dh = this.frame.frame.h * this.scale.y;
        context.save();
        tx = (drawX | this.position.x) + this.origin.x + Sprite.renderOffset.x;
        ty = (drawY | this.position.y) + this.origin.y + Sprite.renderOffset.y;
        if (mirrored) {
          context.translate(tx + dw, ty);
          context.scale(-1, 1);
        } else {
          context.translate(tx, ty);
        }
        context.rotate(Math.PI / 180 * this.rotation);
        context.drawImage(image, sx, sy, sw, sh, -this.origin.x, -this.origin.y, dw, dh);
        return context.restore();
      };

      return AnimSprite;

    })(Sprite);
    return module.exports = AnimSprite;
  });

}).call(this);

(function() {
  define('graphics/textureregion',['require','exports','module','../math/vector2'],function(require, exports, module) {
    var TextureRegion, Vector2;
    Vector2 = require("../math/vector2");
    TextureRegion = (function() {
      function TextureRegion(atlas, frame) {
        this.atlas = atlas;
        this.frame = frame;
        this.image = this.atlas.getAtlasImage();
      }

      /*
       * Draws the given rectangle of the region to the given location
       * @param  {CanvasRenderingContext2d} context
       * @param  {Number} sx
       * @param  {Number} sy
       * @param  {Number} sw
       * @param  {Number} sh
       * @param  {Number} dx
       * @param  {Number} dy
      */


      TextureRegion.prototype.draw = function(context, sx, sy, sw, sh, dx, dy) {
        var dh, dw, finalsx, finalsy;
        finalsx = this.frame.frame.x + sx;
        finalsy = this.frame.frame.y + sy;
        sw = Math.min(sw, (this.frame.spriteSourceSize.w + this.frame.frame.x) - (this.frame.frame.x + sx));
        sh = Math.min(sh, (this.frame.spriteSourceSize.h + this.frame.frame.y) - (this.frame.frame.y + sy));
        dw = sw;
        dh = sh;
        if (sw === 0 || sh === 0) {
          return;
        }
        return context.drawImage(this.image, finalsx, finalsy, sw, sh, dx, dy, dw, dh);
      };

      return TextureRegion;

    })();
    return module.exports = TextureRegion;
  });

}).call(this);

(function() {
  define('graphics/textureatlas',['require','exports','module','./sprite','./animsprite','./textureregion'],function(require, exports, module) {
    var AnimSprite, Sprite, TextureAtlas, TextureRegion;
    Sprite = require("./sprite");
    AnimSprite = require("./animsprite");
    TextureRegion = require("./textureregion");
    TextureAtlas = (function() {
      function TextureAtlas(frames, image) {
        this.frames = frames;
        this.image = image;
        return;
      }

      /*
       * Creates a new Sprite object from the given filename
       * @param  [String] filename
       * @return [Sprite]
      */


      TextureAtlas.prototype.createSprite = function(filename) {
        var sprite;
        if (this.frames[filename] == null) {
          throw new Error("The sprite " + filename + " could not be found.");
        }
        sprite = new Sprite(this, this.frames[filename]);
        return sprite;
      };

      /*
       * Creates a new AnimSprite object from the given filename
       * @param  [String] filename
       * @param  [Number] spriteCount
       * @return [AnimSprite]
      */


      TextureAtlas.prototype.createAnimSprite = function(filename, spriteCount, animationInterval) {
        var sprite;
        if (this.frames[filename] == null) {
          throw new Error("The sprite " + filename + " could not be found.");
        }
        sprite = new AnimSprite(this, this.frames[filename], spriteCount, animationInterval);
        return sprite;
      };

      /*
       * Creates a new TextureRegion object from the given filename
       * @param  [String] filename
       * @return [TextureRegion]
      */


      TextureAtlas.prototype.findRegion = function(filename) {
        var region;
        if (this.frames[filename] == null) {
          throw new Error("The region " + filename + " could not be found.");
        }
        region = new TextureRegion(this, this.frames[filename]);
        return region;
      };

      TextureAtlas.prototype.getAtlasImage = function() {
        return this.image;
      };

      return TextureAtlas;

    })();
    return module.exports = TextureAtlas;
  });

}).call(this);

(function() {
  define('graphics/bitmapfont',['require','exports','module','../math/rectangle'],function(require, exports, module) {
    var BitmapFont, Rectangle;
    Rectangle = require("../math/rectangle");
    BitmapFont = (function() {
      function BitmapFont(fontFile, textureRegion) {
        this.fontFile = fontFile;
        this.textureRegion = textureRegion;
        this.chars = {};
        this.parseFontFile();
      }

      /*
       * Parses the font file and stores the character information
       * in the chars instance variable
      */


      BitmapFont.prototype.parseFontFile = function() {
        var char, key, line, parameter, split, val, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;
        _ref = this.fontFile.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          split = line.split(" ");
          if (split[0] === "char") {
            char = {};
            _ref1 = split.slice(1, -1);
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              parameter = _ref1[_j];
              _ref2 = parameter.split("="), key = _ref2[0], val = _ref2[1];
              char[key] = parseInt(val);
            }
            _results.push(this.chars[char.id] = char);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      BitmapFont.prototype.getBounds = function(text) {
        var char, charCode, character, height, i, width, _i, _ref;
        width = 0;
        height = 0;
        for (i = _i = 0, _ref = text.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          character = text.substr(i, 1);
          charCode = character.charCodeAt(0);
          if (this.chars[charCode] == null) {
            continue;
          }
          char = this.chars[charCode];
          width += char.xadvance;
          height = char.height;
        }
        return new Rectangle(0, 0, width, height);
      };

      /*
       * Draws the text on the given canvas
       * @param  {CanvasRenderingContext2D} context
       * @param  {String} text
       * @param  {Number} x
       * @param  {Number} y
      */


      BitmapFont.prototype.drawText = function(context, text, x, y) {
        var char, charCode, character, i, xOffset, _i, _ref, _results;
        xOffset = 0;
        _results = [];
        for (i = _i = 0, _ref = text.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          character = text.substr(i, 1);
          charCode = character.charCodeAt(0);
          if (this.chars[charCode] == null) {
            continue;
          }
          char = this.chars[charCode];
          this.textureRegion.draw(context, char.x, char.y, char.width, char.height, x + xOffset + char.xoffset || 0, y + char.yoffset || 0);
          _results.push(xOffset += char.xadvance);
        }
        return _results;
      };

      return BitmapFont;

    })();
    return module.exports = BitmapFont;
  });

}).call(this);

(function() {
  define('graphics/tilemap',['require','exports','module','../math/vector2','../node','../actor'],function(require, exports, module) {
    var Actor, Node, TileMap, Vector2;
    Vector2 = require("../math/vector2");
    Node = require("../node");
    Actor = require("../actor");
    TileMap = (function() {
      /*
       * A TileMap represents a level or map that is composed by tiles.
       * This class accepts jsons as exported by 'Tiled'
       * @param  {game} @game
       * @param  {tilesJson} @tilesJson
       * @param  {image} @image
      */

      function TileMap(game, tilesJson, image) {
        var layer, newLayer, _i, _len, _ref;
        this.game = game;
        this.image = image;
        this.tileWidth = tilesJson['tileheight'];
        this.tileHeight = tilesJson['tilewidth'];
        this.tileSpacing = tilesJson['tilesets'][0]['spacing'];
        this.layers = [];
        _ref = tilesJson['layers'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          newLayer = layer['data'];
          newLayer.width = layer['width'];
          newLayer.height = layer['height'];
          newLayer.scrollX = 0;
          newLayer.scrollY = 0;
          this.layers.push(newLayer);
        }
        this.numTilesOnTileSetX = (this.image.width - this.tileSpacing) / (this.tileWidth + this.tileSpacing);
      }

      /*
       * Sets the scrollX position for all layers
       * @param {number} scrollX
      */


      TileMap.prototype.setScrollX = function(scrollX) {
        var layer, _i, _len, _ref, _results;
        _ref = this.layers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          _results.push(layer.scrollX = scrollX);
        }
        return _results;
      };

      /*
       * Sets the scrollY position for all layers
       * @param {number} scrollY
      */


      TileMap.prototype.setScrollY = function(scrollY) {
        var layer, _i, _len, _ref, _results;
        _ref = this.layers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          _results.push(layer.scrollY = scrollY);
        }
        return _results;
      };

      /*
       * Sets the scrollX position for a specific layer
       * @param {number} layerIndex
       * @param {number} scrollX
      */


      TileMap.prototype.setScrollX = function(layerIndex, scrollX) {
        return this.layers[layerIndex].scrollX = scrollX;
      };

      /*
       * Sets the scrollY position for a specific layer
       * @param {number} layerIndex
       * @param {number} scrollY
      */


      TileMap.prototype.setScrollY = function(layerIndex, scrollY) {
        return this.layers[layerIndex].scrollY = scrollY;
      };

      /*
       * Gets the scrollX position for a specific layer
       * @param {number} layerIndex
      */


      TileMap.prototype.getScrollX = function(layerIndex) {
        return this.layers[layerIndex].scrollX;
      };

      /*
       * Gets the scrollY position for a specific layer
       * @param {number} layerIndex
      */


      TileMap.prototype.getScrollY = function(layerIndex) {
        return this.layers[layerIndex].scrollY;
      };

      /*
       * Draws the TileMap on the given context
       * @param  [CanvasRenderingContext2D] context
      */


      TileMap.prototype.draw = function(context) {
        var dh, dw, index, indexOffsetX, indexOffsetY, layer, sh, softOffsetX, softOffsetY, sw, sx, sy, tileNumber, visibleTilesX, visibleTilesY, x, y, _i, _len, _ref, _results;
        _ref = this.layers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          visibleTilesX = Math.ceil(this.game.getWidth() / this.tileWidth);
          visibleTilesY = Math.ceil(this.game.getHeight() / this.tileHeight);
          sw = this.tileWidth;
          sh = this.tileHeight;
          dw = this.tileWidth;
          dh = this.tileHeight;
          indexOffsetX = Math.floor(layer.scrollX / this.tileWidth);
          indexOffsetY = Math.floor(layer.scrollY / this.tileHeight);
          softOffsetX = layer.scrollX % this.tileWidth;
          softOffsetY = layer.scrollY % this.tileHeight;
          if (this.image != null) {
            _results.push((function() {
              var _j, _results1;
              _results1 = [];
              for (y = _j = 0; 0 <= visibleTilesY ? _j <= visibleTilesY : _j >= visibleTilesY; y = 0 <= visibleTilesY ? ++_j : --_j) {
                _results1.push((function() {
                  var _k, _results2;
                  _results2 = [];
                  for (x = _k = 0; 0 <= visibleTilesX ? _k <= visibleTilesX : _k >= visibleTilesX; x = 0 <= visibleTilesX ? ++_k : --_k) {
                    index = x + indexOffsetX + (y + indexOffsetY) * layer.width;
                    tileNumber = layer[index] - 1;
                    sx = this.tileSpacing + (this.tileWidth + this.tileSpacing) * (tileNumber % this.numTilesOnTileSetX);
                    sy = this.tileSpacing + (this.tileHeight + this.tileSpacing) * Math.floor(tileNumber / this.numTilesOnTileSetX);
                    _results2.push(context.drawImage(this.image, sx, sy, sw, sh, x * dw - softOffsetX, y * dh - softOffsetY, dw, dh));
                  }
                  return _results2;
                }).call(this));
              }
              return _results1;
            }).call(this));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return TileMap;

    })();
    return module.exports = TileMap;
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('utilities/preloader',['require','exports','module','eventemitter','async'],function(require, exports, module) {
    var EventEmitter, Preloader, async;
    EventEmitter = require("eventemitter");
    async = require("async");
    Preloader = (function(_super) {
      __extends(Preloader, _super);

      function Preloader(app, itemFilenames) {
        this.app = app;
        this.itemFilenames = itemFilenames;
        this.loadJPEG = __bind(this.loadJPEG, this);
        this.loadJPG = __bind(this.loadJPG, this);
        this.loadPNG = __bind(this.loadPNG, this);
        this.loadItem = __bind(this.loadItem, this);
        this.items = {};
      }

      /*
       * Starts the loading process
      */


      Preloader.prototype.load = function() {
        var _this = this;
        return async.map(this.itemFilenames, this.loadItem, function(err, items) {
          var item, _i, _len;
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            _this.items[item.filename] = item.item;
          }
          return _this.emit("done");
        });
      };

      /*
       * Returns the item for the given filename
      */


      Preloader.prototype.get = function(filename) {
        if (this.items[filename] == null) {
          throw new Error("The file " + filename + " has not been preloaded!");
        }
        return this.items[filename];
      };

      /*
       * Initiates the loading process for the given filename
       * @param  [String] filename
       * @param  [Function] callback
       * @private
      */


      Preloader.prototype.loadItem = function(filename, callback) {
        var extension, loadingMethod;
        extension = filename.split(".").pop();
        loadingMethod = this["load" + extension.toUpperCase()];
        if (loadingMethod == null) {
          throw new Error("No loading method for " + filename);
        }
        return loadingMethod(filename, callback);
      };

      /*
       * Loads a JSON file via AJAX
       * @param  [String] filename
       * @param  [Function] callback
       * @private
      */


      Preloader.prototype.loadJSON = function(filename, callback) {
        return $.getJSON(filename, function(data) {
          return callback(null, {
            filename: filename,
            item: data
          });
        });
      };

      /*
       * Loads a FNT file via AJAX
       * @param  [String]   filename
       * @param  [Function] callback
      */


      Preloader.prototype.loadFNT = function(filename, callback) {
        return $.get(filename, function(data) {
          return callback(null, {
            filename: filename,
            item: data
          });
        });
      };

      /*
       * Loads an image item
       * @param  [String] filename
       * @param  [Function] callback
       * @private
      */


      Preloader.prototype.loadImage = function(filename, callback) {
        var image;
        image = new Image();
        image.onload = function() {
          return callback(null, {
            filename: filename,
            item: image
          });
        };
        return image.src = filename;
      };

      Preloader.prototype.loadPNG = function() {
        return this.loadImage.apply(this, arguments);
      };

      Preloader.prototype.loadJPG = function() {
        return this.loadImage.apply(this, arguments);
      };

      Preloader.prototype.loadJPEG = function() {
        return this.loadImage.apply(this, arguments);
      };

      return Preloader;

    })(EventEmitter);
    return module.exports = Preloader;
  });

}).call(this);

(function() {
  define('ldfw',['require','exports','module','./game','./screen','./actor','./stage','./node','./graphics/textureatlas','./graphics/textureregion','./graphics/sprite','./graphics/bitmapfont','./graphics/tilemap','./math/vector2','./utilities/preloader'],function(require, exports, module) {
    return module.exports = {
      Game: require("./game"),
      Screen: require("./screen"),
      Actor: require("./actor"),
      Stage: require("./stage"),
      Node: require("./node"),
      TextureAtlas: require("./graphics/textureatlas"),
      TextureRegion: require("./graphics/textureregion"),
      Sprite: require("./graphics/sprite"),
      BitmapFont: require("./graphics/bitmapfont"),
      TileMap: require("./graphics/tilemap"),
      Vector2: require("./math/vector2"),
      Preloader: require("./utilities/preloader")
    };
  });

}).call(this);
