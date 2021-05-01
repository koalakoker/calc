{
  var variables = [];
}

Input = Expression / VarAssign / Command / VarName

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Number / Integer

Number "number"
  = _ ([-]*[0-9]*[\.][0-9]*) {
    return parseFloat(text());
  }

Integer "integer"
  = _ [0-9]+ {
  	return parseInt(text(), 10);
  }
  
_ "whitespace"
  = [ \t\n\r]*
  
Command "command"
  = "print" {
  	return variables;
  }
  
VarName "var name"
 = [A-Za-z]* {return text();}
  
VarAssign "var assignment"
 = _ varName:VarName _[=]_ value:(Number / Integer) {
 	variables.push({varName,value});
 	return variables;
 }