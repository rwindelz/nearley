(function () {
if (typeof(window) === 'undefined') {
    var nearley = require('../lib/nearley.js');
} else {
    var nearley = window.nearley;
}
var Compile = function (structure, opts) {
    var un = 0;

    function unique(name) {
        return name + '$' + (++un);
    }

    function joiner(d) {
        return d.join('');
    }

    var outputRules = [];
    var body = []; // @directives list

    function buildProcessedRule(name, rule) {
        var tokenList = [];

        rule.tokens.forEach(function(token) {
            if (token.literal) {
                var str = token.literal;
                if (str.length > 1) {
                    var rules = str.split("").map(function(d) {
                        return {
                            literal: d
                        };
                    });

                    var newname = unique(" string");
                    buildProcessedRule(newname, {
                        tokens: rules,
                        postprocess: joiner
                    });
                    tokenList.push(newname);
                } else if (str.length === 1) {
                    tokenList.push({
                        literal: str
                    });
                }
            } else if (token.predicate) {
                tokenList.push(token);
            } else if (token.subexpression) {
                var data = token.subexpression;
                var name = unique(" subexpression");
                structure.push({"name": name, "rules": data});
                tokenList.push(name);
            } else if (token.ebnf) {
                var data = token.ebnf;
                var modifier = token.modifier;
                var name = unique(" ebnf");
                var arrconcat = (function(d) {
                    return [d[0]].concat(d[1]);
                }).toString();

                switch (modifier) {
                    case ":+":
                        structure.push({
                            "name": name,
                            "rules": [{
                                "tokens": [data],
                            }, {
                                "tokens": [data, name],
                                "postprocess": arrconcat
                            }]
                        });
                        tokenList.push(name);
                        break;
                    case ":*":
                        structure.push({
                            "name": name,
                            "rules": [{
                                "tokens": [],
                            }, {
                                "tokens": [data, name],
                                "postprocess": arrconcat
                            }]
                        });
                        tokenList.push(name);
                        break;
                    case ":?":
                        structure.push({
                            "name": name,
                            "rules": [{
                                "tokens": [data],
                                "postprocess": "id"
                            }, {
                                "tokens": [],
                                "postprocess": "function(d) {return null;}"
                            }]
                        });
                        tokenList.push(name);
                        break;
                }
            } else if (typeof(token) === 'string') {
                if (token !== 'null') tokenList.push(token);
            } else if (token instanceof RegExp) {
                tokenList.push(token);
            } else {
                throw new Error("Should never get here");
            }
        });

        var out = new nearley.Rule(name, tokenList, rule.postprocess);

        outputRules.push(out);
    }

    var firstName;

    var i=0;
    while (i<structure.length) {
        var productionRule = structure[i];
        if (productionRule.body) {
            // This isn't a rule, it's an @directive.
            body.push(productionRule.body);
        } else {
            var rules = productionRule.rules;
            if (!firstName) firstName = productionRule.name;
            rules.forEach(function(rule) {
                buildProcessedRule(productionRule.name, rule);
            });
        }
        i++;
    }

    return {
        rules: outputRules,
        body: body,
        start: firstName
    };
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
   module.exports = Compile;
} else {
   window.Compile = Compile;
}
})();
