// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "final", "symbols": ["whit?", "prog", "whit?"], "postprocess":  function(d) { return d[1]; } },
    {"name": "prog", "symbols": ["prod"], "postprocess":  function(d) { return [d[0]]; } },
    {"name": "prog", "symbols": ["prod", "whit", "prog"], "postprocess":  function(d) { return [d[0]].concat(d[2]); } },
    {"name": "prod", "symbols": ["word", "whit?", " ebnf$1", {"literal":">"}, "whit?", "expression+"], "postprocess":  function(d) { return {name: d[0], rules: d[5]}; } },
    {"name": "prod", "symbols": [{"literal":"@"}, "whit?", "js"], "postprocess":  function(d) { return {body: d[2]}; } },
    {"name": "expression+", "symbols": ["completeexpression"]},
    {"name": "expression+", "symbols": ["expression+", "whit?", {"literal":"|"}, "whit?", "completeexpression"], "postprocess":  function(d) { return d[0].concat([d[4]]); } },
    {"name": "completeexpression", "symbols": ["expr"], "postprocess":  function(d) { return {tokens: d[0]}; } },
    {"name": "completeexpression", "symbols": ["expr", "whit?", "js"], "postprocess":  function(d) { return {tokens: d[0], postprocess: d[2]}; } },
    {"name": "expr_member", "symbols": ["word"], "postprocess":  id },
    {"name": "expr_member", "symbols": ["string"], "postprocess":  id },
    {"name": "expr_member", "symbols": ["charclass"], "postprocess":  id },
    {"name": "expr_member", "symbols": [{"literal":"&"}, "js"], "postprocess":  function(d) {return {'predicate': d[1]}; } },
    {"name": "expr_member", "symbols": [{"literal":"("}, "whit?", "expression+", "whit?", {"literal":")"}], "postprocess":  function(d) {return {'subexpression': d[2]} ;} },
    {"name": "expr_member", "symbols": ["expr_member", "whit?", "ebnf_modifier"], "postprocess":  function(d) {return {'ebnf': d[0], 'modifier': d[2]}; } },
    {"name": " string$2", "symbols": [{"literal":":"}, {"literal":"+"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ebnf_modifier", "symbols": [" string$2"], "postprocess":  id },
    {"name": " string$3", "symbols": [{"literal":":"}, {"literal":"*"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ebnf_modifier", "symbols": [" string$3"], "postprocess":  id },
    {"name": " string$4", "symbols": [{"literal":":"}, {"literal":"?"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ebnf_modifier", "symbols": [" string$4"], "postprocess":  id },
    {"name": "expr", "symbols": ["expr_member"]},
    {"name": "expr", "symbols": ["expr", "whit", "expr_member"], "postprocess":  function(d){ return d[0].concat([d[2]]); } },
    {"name": "word", "symbols": [/[\w\?\+]/], "postprocess":  function(d){ return d[0]; } },
    {"name": "word", "symbols": ["word", /[\w\?\+]/], "postprocess":  function(d){ return d[0]+d[1]; } },
    {"name": "string", "symbols": [{"literal":"\""}, "charset", {"literal":"\""}], "postprocess":  function(d) { return { literal: d[1].join("") }; } },
    {"name": "charset", "symbols": []},
    {"name": "charset", "symbols": ["charset", "char"], "postprocess":  function(d) { return d[0].concat([d[1]]); } },
    {"name": "char", "symbols": [/[^\\"]/], "postprocess":  function(d) { return d[0]; } },
    {"name": "char", "symbols": [{"literal":"\\"}, /./], "postprocess":  function(d) { return JSON.parse("\""+"\\"+d[1]+"\""); } },
    {"name": "charclass", "symbols": [{"literal":"."}], "postprocess":  function(d) { return new RegExp("."); } },
    {"name": "charclass", "symbols": [{"literal":"["}, "charclassmembers", {"literal":"]"}], "postprocess":  function(d) { return new RegExp("[" + d[1].join('') + "]"); } },
    {"name": "charclassmembers", "symbols": []},
    {"name": "charclassmembers", "symbols": ["charclassmembers", "charclassmember"], "postprocess":  function(d) { return d[0].concat([d[1]]); } },
    {"name": "charclassmember", "symbols": [/[^\\\]]/], "postprocess":  function(d) { return d[0]; } },
    {"name": "charclassmember", "symbols": [{"literal":"\\"}, /./], "postprocess":  function(d) { return d[0] + d[1]; } },
    {"name": "js", "symbols": [{"literal":"{"}, {"literal":"%"}, "jscode", {"literal":"%"}, {"literal":"}"}], "postprocess":  function(d) { return d[2]; } },
    {"name": "jscode", "symbols": [], "postprocess":  function() {return "";} },
    {"name": "jscode", "symbols": ["jscode", /[^%]/], "postprocess":  function(d) {return d[0] + d[1];} },
    {"name": "whit", "symbols": ["whitraw"]},
    {"name": "whit", "symbols": ["whitraw?", "comment", "whit?"]},
    {"name": "whit?", "symbols": []},
    {"name": "whit?", "symbols": ["whit"]},
    {"name": "whitraw", "symbols": [/[\s]/]},
    {"name": "whitraw", "symbols": ["whitraw", /[\s]/]},
    {"name": "whitraw?", "symbols": []},
    {"name": "whitraw?", "symbols": ["whitraw"]},
    {"name": "comment", "symbols": [{"literal":"#"}, "commentchars", {"literal":"\n"}]},
    {"name": "commentchars", "symbols": []},
    {"name": "commentchars", "symbols": ["commentchars", /[^\n]/]},
    {"name": " ebnf$1", "symbols": [" subexpression$5"]},
    {"name": " ebnf$1", "symbols": [" subexpression$6", " ebnf$1"], "postprocess": function (d) {
                    return [d[0]].concat(d[1]);
                }},
    {"name": " subexpression$5", "symbols": [{"literal":"-"}]},
    {"name": " subexpression$5", "symbols": [{"literal":"="}]},
    {"name": " subexpression$6", "symbols": [{"literal":"-"}]},
    {"name": " subexpression$6", "symbols": [{"literal":"="}]}
]
  , ParserStart: "final"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
