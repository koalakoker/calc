{
  var ex_variables = [];
  
  var ex_parseInt = function(x) {return parseInt(text(), 10)};
  var ex_parseFloat = function(x) {return parseFloat(x)};
  
  var ex_myAdd = function(a,b){return a+b};
  var ex_mySub = function(a,b){return a-b};
  var ex_myMul = function(a,b){return a*b};
  var ex_myDiv = function(a,b){return a/b};
}

Input = Expression / VarAssign / Command / VarName

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") {
        	return ex_myAdd(result, element[3]); 
        }
        if (element[1] === "-") {
            return ex_mySub(result, element[3]); 
        }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") {
        	return ex_myMul(result, element[3]); 
        }
        if (element[1] === "/") {
        	return ex_myDiv(result, element[3]);
        }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Number / Integer

Number "number"
  = _ ([-]*[0-9]*[\.][0-9]*) {
    return ex_parseFloat(text());
  }

Integer "integer"
  = _ [0-9]+ {
  	return ex_parseInt(text());
  }
  
_ "whitespace"
  = [ \t\n\r]*
  
Command "command"
  = "print" {
  	return ex_variables;
  }
  
VarName "var name"
 = [A-Za-z]* {return text();}
  
VarAssign "var assignment"
 = _ varName:VarName _[=]_ value:(Number / Integer) {
 	ex_variables.push({varName,value});
 	return ex_variables;
 }