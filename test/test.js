/*

test.js - test script

The MIT License (MIT)

Copyright (c) 2013 Dale Schumacher

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";

var tart = require('tart');
var lambda = require('../index.js');

var test = module.exports = {};   

test['empty environment should return undefined'] = function (test) {
    test.expect(1);
    var sponsor = tart.sponsor();
    var env = lambda.env(sponsor);

    var expectUndefined = sponsor(function (result) {
        test.equal(result, undefined);
        test.done();
    });
    env.empty({
        customer: expectUndefined,
        name: 'not-used'
    });
};

test['environment lookup should return value, or undefined'] = function (test) {
    test.expect(2);
    var sponsor = tart.sponsor();
    var env = lambda.env(sponsor);

    var value = 42;
    var expectValue = sponsor(function (result) {
        test.equal(result, value);
        doneCountdown();
    });
    var expectUndefined = sponsor(function (result) {
        test.equal(result, undefined);
        doneCountdown();
    });
    var environment = env.bind('foo', value, env.empty);
    environment({
        customer: expectUndefined,
        name: 'bar'
    });
    environment({
        customer: expectValue,
        name: 'foo'
    });
    
    var doneExpected = 2;
    var doneCountdown = function () {
        if (--doneExpected <= 0) {
            test.done();
        }
    };
};

test['variable evaluation should return value, or undefined'] = function (test) {
    test.expect(2);
    var sponsor = tart.sponsor();
    var env = lambda.env(sponsor);

    var value = 42;
    var expectValue = sponsor(function (result) {
        test.equal(result, value);
        doneCountdown();
    });
    var expectUndefined = sponsor(function (result) {
        test.equal(result, undefined);
        doneCountdown();
    });
    var environment = env.bind('x', value, env.empty);
    var variableX = env.variable('x');
    var variableY = env.variable('y');
    variableY({
        customer: expectUndefined,
        environment: environment
    });
    variableX({
        customer: expectValue,
        environment: environment
    });
    
    var doneExpected = 2;
    var doneCountdown = function () {
        if (--doneExpected <= 0) {
            test.done();
        }
    };
};
