/*

index.js - "tart-lambda": A simple lambda-calculus evaluator (tart module)

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

var lambda = module.exports;

lambda.env = function env(sponsor) {

    var emptyEnvBeh = function emptyEnvBeh(message) {
        message.customer(undefined);
    };

    var bind = function bind(name, value, env) {
        return sponsor(boundEnv(name, value, env));
    };

    var boundEnv = function (name, value, env) {
        return function boundEnvBeh(message) {
            if (message.name === name) {
                message.customer(value);
            } else {
                env(message);
            }
        };
    };

    var variable = function variable(name) {
        return sponsor(varExpr(name));
    };

    var varExpr = function (name) {
        return function varExprBeh(message) {
            message.environment({
                customer: message.customer,
                name: name
            });
        };
    };

    return {
        bind: bind,
        variable: variable,
        empty: sponsor(emptyEnvBeh)
    };
};