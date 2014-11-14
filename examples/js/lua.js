// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

var nth =            function (n)    { return function (d) { return d[n]; }; };
var appendItem =     function (a, b) { return function (d) { return d[a].concat([d[b]]); } };
var appendItemChar = function (a, b) { return function (d) { return d[a] + d[b]; } };
var empty =          function (d)    { return []; };
var emptyStr =       function (d)    { return ""; };
var binop =          function (l, op, r) {
                         return function (d) { return {"op": d[op], "left": d[l], "right": d[r]}; }; };
var stmt =           function (type, members) {
                         return function (d) { return {"statement": type,
                                                       "body": members.map(
                                                                   function (n) { return d[n]; })}; };};
var grammar = {
    ParserRules: [
    {"name": "Chunk", "symbols": ["_", "Block", "_"], "postprocess":  nth(1) },
    {"name": "Block", "symbols": ["_Block"], "postprocess":  function (d) { return {"Block": d[0], "Return": []}; } },
    {"name": "Block", "symbols": ["_Block", "__", "ReturnStat"], "postprocess":  function (d) { return {"Block": d[0], "Return": d[2]}; } },
    {"name": " string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ReturnStat", "symbols": [" string$1", "ExpList_opt"], "postprocess":  nth(2) },
    {"name": " string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ReturnStat", "symbols": [" string$2", "ExpList_opt", "_", {"literal":";"}], "postprocess":  nth(2) },
    {"name": "_Block", "symbols": ["Statement"], "postprocess":  function (d) { return d; } },
    {"name": "_Block", "symbols": ["_Block", "_", {"literal":";"}, "_", "Statement"], "postprocess":  function (d) { return d[0].concat([d[4]]); } },
    {"name": "_Block", "symbols": ["_Block", "__", "Statement"], "postprocess":  function (d) { return d[0].concat([d[2]]); } },
    {"name": "Statement", "symbols": ["VarList", "_", {"literal":"="}, "_", "ExpList"], "postprocess":  stmt("assignment", [0,4]) },
    {"name": "Statement", "symbols": ["FunctionCall"], "postprocess":  stmt("functioncall", [0]) },
    {"name": "Statement", "symbols": ["Label"], "postprocess":  stmt("label", [0]) },
    {"name": " string$3", "symbols": [{"literal":"b"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"k"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$3"], "postprocess":  stmt("break", [0]) },
    {"name": " string$4", "symbols": [{"literal":"g"}, {"literal":"o"}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$4", "__", "Name"], "postprocess":  stmt("goto", [2]) },
    {"name": " string$5", "symbols": [{"literal":"d"}, {"literal":"o"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$6", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$5", "__", "Block", "__", " string$6"], "postprocess":  stmt("do", [2]) },
    {"name": " string$7", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$8", "symbols": [{"literal":"d"}, {"literal":"o"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$9", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$7", "__", "Exp", "__", " string$8", "__", "Block", "__", " string$9"], "postprocess":  stmt("while", [2,6]) },
    {"name": " string$10", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"p"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$11", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"t"}, {"literal":"i"}, {"literal":"l"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$10", "__", "Block", "__", " string$11", "__", "Exp"], "postprocess":  stmt("repeat", [6,2]) },
    {"name": " string$12", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$13", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$12", "__", "Exp", "__", " string$13", "__", "Block", "__", "Else"], "postprocess":  stmt("if", [2,6,8]) },
    {"name": " string$14", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$15", "symbols": [{"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$16", "symbols": [{"literal":"d"}, {"literal":"o"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$17", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$14", "__", "NameList", "__", " string$15", "__", "ExpList", "__", " string$16", "__", "Block", "__", " string$17"], "postprocess":  stmt("for", [2,6,10]) },
    {"name": " string$18", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$18", "__", "FunctionName", "_", "FunctionBody"], "postprocess":  stmt("function", [2,4]) },
    {"name": " string$19", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$20", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$19", "__", " string$20", "__", "Name", "__", "FunctionBody"], "postprocess":  stmt("localfunction", [4,6]) },
    {"name": " string$21", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$21", "__", "NameList"], "postprocess":  stmt("localnamelist", [2]) },
    {"name": " string$22", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Statement", "symbols": [" string$22", "__", "NameList", "_", {"literal":"="}, "_", "ExpList"], "postprocess":  stmt("localassignment", [2,6]) },
    {"name": " string$23", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Else", "symbols": [" string$23"], "postprocess":  empty },
    {"name": " string$24", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Else", "symbols": ["_Else", "__", " string$24"], "postprocess":  nth(0) },
    {"name": " string$25", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$26", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Else", "symbols": ["_Else", "__", " string$25", "__", "Block", "__", " string$26"], "postprocess":  function (d) { return d[0].concat([d[2]]); } },
    {"name": " string$27", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}, {"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$28", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "_Else", "symbols": [" string$27", "__", "Exp", "__", " string$28", "__", "Block"]},
    {"name": " string$29", "symbols": [{"literal":"e"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}, {"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$30", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "_Else", "symbols": ["_Else", "__", " string$29", "__", "Exp", "__", " string$30", "__", "Block"]},
    {"name": " string$31", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": " string$32", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Label", "symbols": [" string$31", "_", "Name", "_", " string$32"]},
    {"name": "Name", "symbols": ["_name"], "postprocess":  function(d) {return {'name': d[0]}; } },
    {"name": "_name", "symbols": [/[a-zA-Z_]/], "postprocess":  nth(0) },
    {"name": "_name", "symbols": ["_name", /[\w_]/], "postprocess":  function (d) {return d[0] + d[1]; } },
    {"name": "NameList", "symbols": ["Name"], "postprocess":  nth(0) },
    {"name": "NameList", "symbols": ["NameList", "_", {"literal":","}, "_", "Name"]},
    {"name": "Var", "symbols": ["Name"], "postprocess":  nth(0) },
    {"name": "Var", "symbols": ["PrefixExp", "_", {"literal":"["}, "_", "Exp", "_", {"literal":"]"}], "postprocess":  function (d) { return [d[0], d[4]]; } },
    {"name": "Var", "symbols": ["PrefixExp", "_", {"literal":"."}, "_", "Name"], "postprocess":  function (d) { return [d[0], d[4]]; } },
    {"name": "VarList", "symbols": ["Var"]},
    {"name": "VarList", "symbols": ["VarList", "_", {"literal":","}, "_", "Var"]},
    {"name": "ExpList_opt", "symbols": []},
    {"name": "ExpList_opt", "symbols": ["__", "ExpList"]},
    {"name": "ExpList", "symbols": ["Exp"]},
    {"name": "ExpList", "symbols": ["ExpList", "_", {"literal":","}, "_", "Exp"], "postprocess":  appendItem(0, 4) },
    {"name": "PrefixExp", "symbols": ["Var"], "postprocess":  nth(0) },
    {"name": "PrefixExp", "symbols": ["FunctionCall"], "postprocess":  nth(0) },
    {"name": "PrefixExp", "symbols": ["Parenthesized"], "postprocess":  nth(0) },
    {"name": "FunctionCall", "symbols": ["PrefixExp", "_", "Args"], "postprocess":  function (d) { return {"expr": d[0], "name": [], "args": d[2]}; } },
    {"name": "FunctionCall", "symbols": ["PrefixExp", "_", {"literal":":"}, "_", "Name", "_", "Args"], "postprocess":  function (d) { return {"expr": d[0], "name": d[4], "args": d[6]}; } },
    {"name": "Args", "symbols": [{"literal":"("}, "_", {"literal":")"}], "postprocess":  function (d) { return {"args": []}; } },
    {"name": "Args", "symbols": [{"literal":"("}, "_", "ExpList", "_", {"literal":")"}], "postprocess":  function (d) { return {"args": d[2]}; } },
    {"name": "Args", "symbols": ["String"], "postprocess":  nth(0) },
    {"name": "FunctionName", "symbols": ["_functionname"], "postprocess":  nth(0) },
    {"name": "FunctionName", "symbols": ["_functionname", {"literal":":"}, "Name"], "postprocess":  function (d) { return d[0] + ":" + d[2]; } },
    {"name": "_functionname", "symbols": ["Name"], "postprocess":  nth(0) },
    {"name": "_functionname", "symbols": ["FunctionName", "_", {"literal":"."}, "_", "FunctionName"], "postprocess":  function (d) { return d[0] + "." + d[4]; } },
    {"name": " string$33", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "FunctionDef", "symbols": [" string$33", "__", "FunctionBody"]},
    {"name": " string$34", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "FunctionBody", "symbols": [{"literal":"("}, "_", "ParamList", "_", {"literal":")"}, "__", "Block", "__", " string$34"]},
    {"name": " string$35", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "FunctionBody", "symbols": [{"literal":"("}, "_", {"literal":")"}, "__", "Block", "__", " string$35"]},
    {"name": "ParamList", "symbols": ["NameList"]},
    {"name": " string$36", "symbols": [{"literal":"."}, {"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ParamList", "symbols": ["NameList", "_", {"literal":","}, "_", " string$36"]},
    {"name": " string$37", "symbols": [{"literal":"."}, {"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ParamList", "symbols": [" string$37"], "postprocess":  nth(0) },
    {"name": "TableConstructor", "symbols": [{"literal":"{"}, "_", "FieldList", "_", {"literal":"}"}]},
    {"name": "TableConstructor", "symbols": [{"literal":"{"}, "_", {"literal":"}"}]},
    {"name": "FieldList", "symbols": ["_FieldList"]},
    {"name": "FieldList", "symbols": ["_FieldList", "_", "FieldSep"]},
    {"name": "_FieldList", "symbols": ["Field"], "postprocess":  nth(0) },
    {"name": "_FieldList", "symbols": ["_FieldList", "_", "FieldSep", "_", "Field"]},
    {"name": "Field", "symbols": [{"literal":"["}, "_", "Exp", "_", {"literal":"]"}, "_", {"literal":"="}, "_", "Exp"]},
    {"name": "Field", "symbols": ["Name", "_", {"literal":"="}, "_", "Exp"]},
    {"name": "Field", "symbols": ["Exp"], "postprocess":  nth(0) },
    {"name": "FieldSep", "symbols": [{"literal":","}], "postprocess":  nth(0) },
    {"name": "FieldSep", "symbols": [{"literal":";"}], "postprocess":  nth(0) },
    {"name": "Exp", "symbols": ["Binop"], "postprocess":  nth(0) },
    {"name": "Binop", "symbols": ["ExpOr"], "postprocess":  nth(0) },
    {"name": "Parenthesized", "symbols": [{"literal":"("}, "Exp", {"literal":")"}]},
    {"name": " string$38", "symbols": [{"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpOr", "symbols": ["ExpOr", "__", " string$38", "__", "ExpAnd"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpOr", "symbols": ["ExpAnd"], "postprocess":  nth(0) },
    {"name": " string$39", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpAnd", "symbols": ["ExpAnd", "__", " string$39", "__", "ExpComparison"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpAnd", "symbols": ["ExpComparison"], "postprocess":  nth(0) },
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", {"literal":"<"}, "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", {"literal":">"}, "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": " string$40", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", " string$40", "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": " string$41", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", " string$41", "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": " string$42", "symbols": [{"literal":"~"}, {"literal":"="}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", " string$42", "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": " string$43", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpComparison", "symbols": ["ExpComparison", "_", " string$43", "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpComparison", "symbols": ["ExpConcatenation"], "postprocess":  nth(0) },
    {"name": " string$44", "symbols": [{"literal":"."}, {"literal":"."}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpConcatenation", "symbols": ["ExpSum", "_", " string$44", "_", "ExpConcatenation"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpConcatenation", "symbols": ["ExpSum"], "postprocess":  nth(0) },
    {"name": "ExpSum", "symbols": ["ExpSum", "_", {"literal":"+"}, "_", "ExpProduct"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpSum", "symbols": ["ExpSum", "_", {"literal":"-"}, "_", "ExpProduct"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpSum", "symbols": ["ExpProduct"], "postprocess":  nth(0) },
    {"name": "ExpProduct", "symbols": ["ExpProduct", "_", {"literal":"*"}, "_", "ExpUnary"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpProduct", "symbols": ["ExpProduct", "_", {"literal":"/"}, "_", "ExpUnary"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpProduct", "symbols": ["ExpProduct", "_", {"literal":"%"}, "_", "ExpUnary"], "postprocess":  binop(0, 2, 4) },
    {"name": "ExpProduct", "symbols": ["ExpUnary"], "postprocess":  nth(0) },
    {"name": " string$45", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "ExpUnary", "symbols": [" string$45", "__", "ExpPow"]},
    {"name": "ExpUnary", "symbols": [{"literal":"#"}, "_", "ExpPow"]},
    {"name": "ExpUnary", "symbols": [{"literal":"-"}, "_", "ExpPow"]},
    {"name": "ExpUnary", "symbols": ["ExpPow"], "postprocess":  nth(0) },
    {"name": "ExpPow", "symbols": ["Atom"], "postprocess":  nth(0) },
    {"name": "ExpPow", "symbols": ["Atom", "_", {"literal":"^"}, "_", "ExpPow"], "postprocess":  binop(0, 2, 4) },
    {"name": "Atom", "symbols": ["Number"], "postprocess":  nth(0) },
    {"name": "Atom", "symbols": ["String"], "postprocess":  nth(0) },
    {"name": "Atom", "symbols": ["PrefixExp"], "postprocess":  nth(0) },
    {"name": " string$46", "symbols": [{"literal":"n"}, {"literal":"i"}, {"literal":"l"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Atom", "symbols": [" string$46"], "postprocess":  nth(0) },
    {"name": " string$47", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Atom", "symbols": [" string$47"], "postprocess":  function (d) { return {"boolean": false}; } },
    {"name": " string$48", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {
        return d.join('');
    }},
    {"name": "Atom", "symbols": [" string$48"], "postprocess":  function (d) { return {"boolean": true}; } },
    {"name": "Atom", "symbols": ["Parenthesized"], "postprocess":  nth(0) },
    {"name": "Atom", "symbols": ["FunctionDef"], "postprocess":  nth(0) },
    {"name": "Atom", "symbols": ["TableConstructor"], "postprocess":  nth(0) },
    {"name": "Number", "symbols": ["_number"], "postprocess":  function(d) {return {'literal': parseFloat(d[0])}} },
    {"name": "_posint", "symbols": [/[0-9]/], "postprocess":  nth(0) },
    {"name": "_posint", "symbols": ["_posint", /[0-9]/], "postprocess":  function(d) {return d[0] + d[1]} },
    {"name": "_int", "symbols": [{"literal":"-"}, "_posint"], "postprocess":  function(d) {return d[0] + d[1]; }},
    {"name": "_int", "symbols": ["_posint"], "postprocess":  nth(0) },
    {"name": "_float", "symbols": ["_int"], "postprocess":  nth(0) },
    {"name": "_float", "symbols": ["_int", {"literal":"."}, "_posint"], "postprocess":  function(d) {return d[0] + d[1] + d[2]; }},
    {"name": "_number", "symbols": ["_float"], "postprocess":  nth(0) },
    {"name": "_number", "symbols": ["_float", {"literal":"e"}, "_int"], "postprocess":  function(d){return d[0] + d[1] + d[2]; } },
    {"name": "String", "symbols": ["normalstring"], "postprocess":  nth(0) },
    {"name": "String", "symbols": ["charstring"], "postprocess":  nth(0) },
    {"name": "String", "symbols": ["longstring"], "postprocess":  nth(0) },
    {"name": "normalstring", "symbols": [{"literal":"\""}, "normalstring_char_seq", {"literal":"\""}], "postprocess":  nth(1) },
    {"name": "normalstring_char_seq", "symbols": [], "postprocess":  emptyStr },
    {"name": "normalstring_char_seq", "symbols": ["normalstring_char_seq", "normalstring_char"], "postprocess":  appendItemChar(0,1) },
    {"name": "normalstring_char", "symbols": ["EscapeSequence"], "postprocess":  nth(0) },
    {"name": "normalstring_char", "symbols": [/[^\\"]/], "postprocess":  nth(0) },
    {"name": "charstring", "symbols": [{"literal":"'"}, "charstring_char_seq", {"literal":"'"}], "postprocess":  nth(1) },
    {"name": "charstring_char_seq", "symbols": [], "postprocess":  emptyStr },
    {"name": "charstring_char_seq", "symbols": ["charstring_char_seq", "charstring_char"], "postprocess":  appendItemChar(0,1) },
    {"name": "charstring_char", "symbols": ["EscapeSequence"], "postprocess":  nth(0) },
    {"name": "charstring_char", "symbols": [/[^\\']/], "postprocess":  nth(0) },
    {"name": "longstring", "symbols": [{"literal":"["}, "nested_str", {"literal":"]"}], "postprocess":  nth(1) },
    {"name": "EscapeSequence", "symbols": ["EscapeSequence_"], "postprocess":  function(d) {return JSON.parse("\"" + d[0] + "\""); } },
    {"name": "EscapeSequence_", "symbols": [{"literal":"\\"}, /[abfnrtvz"'\\]/], "postprocess":  function (d) { return d[0] + d[1]; } },
    {"name": "EscapeSequence_", "symbols": [{"literal":"\\"}, {"literal":"\n"}], "postprocess":  function (d) { return "\\" + "\n"; } },
    {"name": "EscapeSequence_", "symbols": [{"literal":"\\"}, {"literal":"\r"}, {"literal":"\n"}], "postprocess":  function (d) { return "\\" + "\r\n"; } },
    {"name": "EscapeSequence_", "symbols": ["DecimalEscape"], "postprocess":  nth(0) },
    {"name": "EscapeSequence_", "symbols": ["HexEscape"], "postprocess":  nth(0) },
    {"name": "DecimalEscape", "symbols": [{"literal":"\\"}, "Digit"], "postprocess":  function (d) { return d[0] + d[1]; } },
    {"name": "DecimalEscape", "symbols": [{"literal":"\\"}, "Digit", "Digit"], "postprocess":  function (d) { return d[0] + d[1] + d[2]; } },
    {"name": "DecimalEscape", "symbols": [{"literal":"\\"}, /[0-2]/, "Digit", "Digit"], "postprocess":  function (d) { return d[0] + d[1] + d[2] + d[3]; } },
    {"name": "HexEscape", "symbols": [{"literal":"\\"}, {"literal":"x"}, "HexDigit", "HexDigit"], "postprocess":  function (d) { return d[0] + d[1] + d[2] + d[3]; } },
    {"name": "Digit", "symbols": [/[0-9]/], "postprocess":  nth(0) },
    {"name": "HexDigit", "symbols": [/[0-9a-fA-F]/], "postprocess":  nth(0) },
    {"name": "comment", "symbols": [{"literal":"-"}, {"literal":"-"}, {"literal":"["}, "nested_str", {"literal":"]"}]},
    {"name": "line_comment", "symbols": [{"literal":"-"}, {"literal":"-"}, "line_comment_body"], "postprocess":  function (d) { return d[0] + d[1] + d[2]; } },
    {"name": "line_comment_body", "symbols": [], "postprocess":  emptyStr },
    {"name": "line_comment_body", "symbols": [{"literal":"["}, "line_comment_body_equals"], "postprocess":  function (d) { return "[" + d[1]; } },
    {"name": "line_comment_body", "symbols": [{"literal":"["}, "line_comment_body_equals", /[^=\[\r\n]/, "line_comment_body_not_newline"], "postprocess":  function (d) { return "[" + d[1] + d[2] + d[3]; } },
    {"name": "line_comment_body", "symbols": [/[^\[\r\n]/, "line_comment_body_not_newline"], "postprocess":  function (d) { return "[" + d[1]; } },
    {"name": "line_comment_body_equals", "symbols": [], "postprocess":  emptyStr },
    {"name": "line_comment_body_equals", "symbols": ["line_comment_body_equals", {"literal":"="}], "postprocess":  appendItemChar(0,1) },
    {"name": "line_comment_body_not_newline", "symbols": [], "postprocess":  emptyStr },
    {"name": "line_comment_body_not_newline", "symbols": ["line_comment_body_not_newline", /[^\r\n]/], "postprocess":  appendItemChar(0,1) },
    {"name": "nested_str", "symbols": [{"literal":"="}, "nested_str", {"literal":"="}], "postprocess":  function (d) { return d[0] + d[1] + d[2]; } },
    {"name": "nested_str", "symbols": [{"literal":"["}, "nested_str_char", {"literal":"]"}], "postprocess":  function (d) { return d[0] + d[1] + d[2]; } },
    {"name": "nested_str_char", "symbols": [], "postprocess":  emptyStr },
    {"name": "nested_str_char", "symbols": ["nested_str_char", /[.]/], "postprocess":  appendItemChar(0,1) },
    {"name": "newline_opt", "symbols": [], "postprocess":  emptyStr },
    {"name": "newline_opt", "symbols": ["newline"], "postprocess":  nth(0) },
    {"name": "newline", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess":  function (d) { return "\r\n"; } },
    {"name": "newline", "symbols": [{"literal":"\r"}], "postprocess":  function (d) { return "\r"; } },
    {"name": "newline", "symbols": [{"literal":"\n"}], "postprocess":  function (d) { return "\n"; } },
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["_", "_wspart"], "postprocess":  function() {} },
    {"name": "__", "symbols": ["_wspart"]},
    {"name": "__", "symbols": ["__", "_wspart"], "postprocess":  function() {} },
    {"name": "_wspart", "symbols": [/[\s]/]},
    {"name": "_wspart", "symbols": ["comment"]},
    {"name": "_wspart", "symbols": ["line_comment"]}
]
  , ParserStart: "Chunk"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
