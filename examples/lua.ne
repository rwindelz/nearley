# Adapted from http://www.lua.org/manual/5.2/manual.html
# No comments implemented yet, because lua comments are hard.
# Additionally, this was written using an older version of
# nearley. Use at your own peril (or fix it and PR!)

@{%
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
var isNotKeyword =   function (n) {
                         var keywords = [ "and",       "break",     "do",        "else",      "elseif",
                                          "end",       "false",     "for",       "function",  "goto",
                                          "if",        "in",        "local",     "nil",       "not",
                                          "or",        "repeat",    "return",    "then",      "true",
                                          "until",     "while"                                        ];
                         return keywords.indexOf(n) === -1; };
%}

Chunk -> _ Block _                               {% nth(1) %}

Block ->
      _Block                                     {% function (d) { return {"Block": d[0], "Return": []}; } %}
    | _Block __ ReturnStat                       {% function (d) { return {"Block": d[0], "Return": d[2]}; } %}

ReturnStat ->
      "return" ExpList_opt                       {% nth(2) %}
    | "return" ExpList_opt _ ";"                 {% nth(2) %}

_Block ->
      Statement                                  {% function (d) { return d; } %}
    | _Block _ ";" _ Statement                   {% function (d) { return d[0].concat([d[4]]); } %}
    | _Block __ Statement                        {% function (d) { return d[0].concat([d[2]]); } %}

Statement ->
      VarList _ "=" _ ExpList                    {% stmt("assignment", [0,4]) %}
    | FunctionCall                               {% stmt("functioncall", [0]) %}
    | Label                                      {% stmt("label", [0]) %}
    | "break"                                    {% stmt("break", [0]) %}
    | "goto" __ Name                             {% stmt("goto", [2]) %}
    | "do" __ Block __ "end"                     {% stmt("do", [2]) %}
    | "while" __ Exp __ "do" __ Block __ "end"   {% stmt("while", [2,6]) %}
    | "repeat" __ Block __ "until" __ Exp        {% stmt("repeat", [6,2]) %}
    | "if" __ Exp __ "then" __ Block __ Else     {% stmt("if", [2,6,8]) %}
    | "for" __ NameList __ "in" __ ExpList __ "do" __ Block __ "end"
                                                 {% stmt("for", [2,6,10]) %}
    | "function" __ FunctionName _ FunctionBody  {% stmt("function", [2,4]) %}
    | "local" __ "function" __ Name __ FunctionBody
                                                 {% stmt("localfunction", [4,6]) %}
    | "local" __ NameList                        {% stmt("localnamelist", [2]) %}
    | "local" __ NameList _ "=" _ ExpList
                                                 {% stmt("localassignment", [2,6]) %}

Else ->
      "end"                                      {% empty %}
    | _Else __ "end"                             {% nth(0) %}
    | _Else __ "else" __ Block __ "end"          {% function (d) { return d[0].concat([d[2]]); } %}

_Else ->
               "elseif" __ Exp __ "then" __ Block
    | _Else __ "elseif" __ Exp __ "then" __ Block

Label -> "::" _ Name _ "::"

# Names
# See Section 2.1
Name -> _name {? isNotKeyword ?}                 {% function(d) {return {'name': d[0]}; } %}

_name ->
      [a-zA-Z_]                                  {% nth(0) %}
    | _name [\w_]                                {% function (d) {return d[0] + d[1]; } %}

NameList ->
      Name                                       {% nth(0) %}
    | NameList _ "," _ Name

Var ->
      Name                                       {% nth(0) %}
    | PrefixExp _ "[" _ Exp _ "]"                {% function (d) { return [d[0], d[4]]; } %}
    | PrefixExp _ "." _ Name                     {% function (d) { return [d[0], d[4]]; } %}

VarList ->
      Var
    | VarList _ "," _ Var

ExpList_opt ->
      null
    | __ ExpList

ExpList ->
      Exp
    | ExpList _ "," _ Exp                        {% appendItem(0, 4) %}

PrefixExp ->
      Var                                        {% nth(0) %}
    | FunctionCall                               {% nth(0) %}
    | Parenthesized                              {% nth(0) %}

FunctionCall ->
    PrefixExp _ Args                             {% function (d) { return {"expr": d[0], "name": [], "args": d[2]}; } %}
    | PrefixExp _ ":" _ Name _ Args              {% function (d) { return {"expr": d[0], "name": d[4], "args": d[6]}; } %}

Args ->
      "(" _ ")"                                  {% function (d) { return {"args": []}; } %}
    | "(" _ ExpList _ ")"                        {% function (d) { return {"args": d[2]}; } %}
    | String                                     {% nth(0) %}

FunctionName ->
      _functionname                              {% nth(0) %}
    | _functionname ":" Name                     {% function (d) { return d[0] + ":" + d[2]; } %}

_functionname ->
      Name                                       {% nth(0) %}
    | FunctionName _ "." _ FunctionName          {% function (d) { return d[0] + "." + d[4]; } %}

FunctionDef ->
      "function" __ FunctionBody

FunctionBody ->
      "(" _ ParamList _ ")" __ Block __ "end"
    | "(" _ ")" __ Block __ "end"

ParamList ->
      NameList
    | NameList _ "," _ "..."
    | "..."                                      {% nth(0) %}

# Tables

TableConstructor ->
      "{" _ FieldList _ "}"
    | "{" _ "}"

FieldList ->
      _FieldList
    | _FieldList _ FieldSep

_FieldList ->
      Field                                      {% nth(0) %}
    | _FieldList _ FieldSep _ Field

Field ->
      "[" _ Exp _ "]" _ "=" _ Exp
    | Name _ "=" _ Exp
    | Exp                                        {% nth(0) %}

FieldSep ->
      "," {% nth(0) %}
    | ";" {% nth(0) %}

# Expressions
Exp ->
      Binop                                      {% nth(0) %}

Binop ->
      ExpOr                                      {% nth(0) %}

Parenthesized ->
      "(" Exp ")"

ExpOr ->
      ExpOr __ "or" __ ExpAnd                    {% binop(0, 2, 4) %}
    | ExpAnd                                     {% nth(0) %}

ExpAnd ->
      ExpAnd __ "and" __ ExpComparison           {% binop(0, 2, 4) %}
    | ExpComparison                              {% nth(0) %}

ExpComparison ->
      ExpComparison _ "<"  _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpComparison _ ">"  _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpComparison _ "<=" _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpComparison _ ">=" _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpComparison _ "~=" _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpComparison _ "==" _ ExpConcatenation    {% binop(0, 2, 4) %}
    | ExpConcatenation                           {% nth(0) %}

ExpConcatenation ->
      ExpSum _ ".." _ ExpConcatenation           {% binop(0, 2, 4) %}
    | ExpSum                                     {% nth(0) %}

ExpSum ->
      ExpSum _ "+" _ ExpProduct                  {% binop(0, 2, 4) %}
    | ExpSum _ "-" _ ExpProduct                  {% binop(0, 2, 4) %}
    | ExpProduct                                 {% nth(0) %}

ExpProduct ->
      ExpProduct _ "*" _ ExpUnary                {% binop(0, 2, 4) %}
    | ExpProduct _ "/" _ ExpUnary                {% binop(0, 2, 4) %}
    | ExpProduct _ "%" _ ExpUnary                {% binop(0, 2, 4) %}
    | ExpUnary                                   {% nth(0) %}

ExpUnary ->
      "not" __ ExpPow
    | "#" _ ExpPow
    | "-" _ ExpPow
    | ExpPow                                     {% nth(0) %}

ExpPow ->
      Atom                                       {% nth(0) %}
    | Atom _ "^" _ ExpPow                        {% binop(0, 2, 4) %}

Atom ->
      Number                                     {% nth(0) %}
    | String                                     {% nth(0) %}
    | PrefixExp                                  {% nth(0) %}
    | "nil"                                      {% nth(0) %}
    | "false"                                    {% function (d) { return {"boolean": false}; } %}
    | "true"                                     {% function (d) { return {"boolean": true}; } %}
    | Parenthesized                              {% nth(0) %}
    | FunctionDef                                {% nth(0) %}
    | TableConstructor                           {% nth(0) %}





# Primitives
# ==========

# Numbers

Number -> _number                                {% function(d) {return {'literal': parseFloat(d[0])}} %}

_posint ->
    [0-9]                                        {% nth(0) %}
    | _posint [0-9]                              {% function(d) {return d[0] + d[1]} %}

_int ->
    "-" _posint                                  {% function(d) {return d[0] + d[1]; }%}
    | _posint                                    {% nth(0) %}

_float ->
    _int                                         {% nth(0) %}
    | _int "." _posint                           {% function(d) {return d[0] + d[1] + d[2]; }%}

_number ->
    _float                                       {% nth(0) %}
    | _float "e" _int                            {% function(d){return d[0] + d[1] + d[2]; } %}


#Strings

String ->
      normalstring                               {% nth(0) %}
    | charstring                                 {% nth(0) %}
    | longstring                                 {% nth(0) %}

normalstring ->
    "\"" normalstring_char_seq "\""              {% nth(1) %}

normalstring_char_seq ->
      null                                       {% emptyStr %}
    | normalstring_char_seq normalstring_char    {% appendItemChar(0,1) %}

normalstring_char ->
      EscapeSequence                             {% nth(0) %}
    | [^\\"]                                     {% nth(0) %}


charstring ->
      "'" charstring_char_seq "'"                {% nth(1) %}

charstring_char_seq ->
      null                                       {% emptyStr %}
    | charstring_char_seq charstring_char        {% appendItemChar(0,1) %}

charstring_char ->
      EscapeSequence                             {% nth(0) %}
    | [^\\']                                     {% nth(0) %}

longstring ->
      "[" nested_str "]"                         {% nth(1) %}

EscapeSequence ->
      EscapeSequence_                            {% function(d) {return JSON.parse("\"" + d[0] + "\""); } %}

EscapeSequence_ ->
      "\\" [abfnrtvz"'\\]                        {% function (d) { return d[0] + d[1]; } %}
    | "\\" "\n"                                  {% function (d) { return "\\" + "\n"; } %}
    | "\\" "\r" "\n"                             {% function (d) { return "\\" + "\r\n"; } %}
    | DecimalEscape                              {% nth(0) %}
    | HexEscape                                  {% nth(0) %}

DecimalEscape ->
      "\\" Digit                                 {% function (d) { return d[0] + d[1]; } %}
    | "\\" Digit Digit                           {% function (d) { return d[0] + d[1] + d[2]; } %}
    | "\\" [0-2] Digit Digit                     {% function (d) { return d[0] + d[1] + d[2] + d[3]; } %}

HexEscape ->
      "\\" "x" HexDigit HexDigit                 {% function (d) { return d[0] + d[1] + d[2] + d[3]; } %}

Digit ->
      [0-9]                                      {% nth(0) %}

HexDigit ->
      [0-9a-fA-F]                                {% nth(0) %}


comment -> "-" "-" "[" nested_str "]"

line_comment ->
      "-" "-" line_comment_body                  {% function (d) { return d[0] + d[1] + d[2]; } %}

line_comment_body ->
      null                                       {% emptyStr %}
    | "[" line_comment_body_equals               {% function (d) { return "[" + d[1]; } %}  # --[==
    | "[" line_comment_body_equals [^=\[\r\n] line_comment_body_not_newline
                                                 {% function (d) { return "[" + d[1] + d[2] + d[3]; } %}  # --[==AA
    | [^\[\r\n] line_comment_body_not_newline    {% function (d) { return "[" + d[1]; } %}  # --AAA

line_comment_body_equals ->
      null                                       {% emptyStr %}
    | line_comment_body_equals "="               {% appendItemChar(0,1) %}

line_comment_body_not_newline ->
      null                                       {% emptyStr %}
    | line_comment_body_not_newline [^\r\n]      {% appendItemChar(0,1) %}

nested_str ->
      "=" nested_str "="                         {% function (d) { return d[0] + d[1] + d[2]; } %}
    | "[" nested_str_char "]"                    {% function (d) { return d[0] + d[1] + d[2]; } %}

nested_str_char ->
      null                                       {% emptyStr %}
    | nested_str_char [.]                        {% appendItemChar(0,1) %}

newline_opt ->
      null                                       {% emptyStr %}
    | newline                                    {% nth(0) %}

newline ->
      "\r" "\n"                                  {% function (d) { return "\r\n"; } %}
    | "\r"                                       {% function (d) { return "\r"; } %}
    | "\n"                                       {% function (d) { return "\n"; } %}

# Whitespace
_  -> null | _ _wspart                           {% function() {} %}
__ -> _wspart | __ _wspart                       {% function() {} %}

_wspart ->
      [\s]
    | comment
    | line_comment


# Lua keywords
#   and       break     do        else      elseif
#   end       false     for       function  goto
#   if        in        local     nil       not
#   or        repeat    return    then      true
#   until     while
