// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.

Input = Expression / Command

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
  	console.log("Number:"+text());
    return parseFloat(text());
  }

Integer "integer"
  = _ [0-9]+ {
    console.log("Integer:"+text());
  	return parseInt(text(), 10);
  }
  
_ "whitespace"
  = [ \t\n\r]*
  
Command "command"
 = "cmd" {console.log("Ciao")}