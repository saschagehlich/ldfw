fs = require "fs"

module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        expand: true
        cwd: "src"
        src: ["**/*.coffee"]
        dest: "build"
        ext: ".js"

    requirejs:
      app:
        options:
          baseUrl: "build"
          name: "ldfw"
          out: "ldfw.js"
          optimize: "none"
          paths:
            eventemitter: "empty:"
            async: "empty:"

    uglify:
      dist:
        files:
          "ldfw.min.js": ["ldfw.js"]

    watch:
      coffee:
        files: ["src/**/*.coffee"]
        tasks: "newer:coffee"

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-requirejs"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-newer"

  grunt.registerTask "default", ["newer:coffee", "watch"]
  grunt.registerTask "build", ["coffee", "requirejs", "uglify"]
