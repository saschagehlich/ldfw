fs = require "fs"

module.exports = (grunt) ->
  grunt.initConfig
    urequire:
      dist:
        path: "./src"
        main: "ldfw"
        dstPath: "./ldfw.min.js"
        template: "combined"
        optimize: true

      dev:
        path: "./src"
        main: "ldfw"
        dstPath: "./ldfw.js"
        template: "combined"

    watch:
      dev:
        files: ["src/**/*.coffee"]
        tasks: ["urequire:dev"]
      options:
        spawn: false

  grunt.loadNpmTasks "grunt-urequire"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "build", ["urequire:dev", "urequire:dist"]
  grunt.registerTask "default", ["urequire:dev", "watch"]
