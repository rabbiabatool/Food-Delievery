should = require 'should'
facto  = require '../lib/facto'

describe 'facto', ->

    for i in [0..1009]

        it 'returns ∑', -> 

            facto().should.equal '∑'

        it 'returns ∞', -> 

            facto()().should.equal '∞'


