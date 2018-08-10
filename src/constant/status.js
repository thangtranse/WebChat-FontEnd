const _ = require('lodash')

const status = [
    "online",
    "busy",
    "away",
    "offline"
]

const color = [
    "#2de0a5",
    "#f5455c",
    "#ffd21f",
    "#cbced1"
]

module.exports = _.zipObject(status, color)
