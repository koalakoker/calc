{
  var ex_variables = [];
  
  var ex_parseInt = function(x) {return parseInt(x, 10)};
  var ex_parseFloat = function(x) {return parseFloat(x)};
  
  var ex_myAdd = function(a,b){return a+b};
  var ex_mySub = function(a,b){return a-b};
  var ex_myMul = function(a,b){return a*b};
  var ex_myDiv = function(a,b){return a/b};
  var ex_myPow = function(a,b){return Math.pow(a,b)};
  var ex_myPar = function(r1,r2){return ((r1*r2)/(r1+r2))};

  var getVarValue = function(variable) {
    var value = 0;
    ex_variables.forEach(element => {
      if (element.varName === variable) {
        value = element.value;
      }
    });
    return value;
  }

}

Input = Expression / VarAssign / Command / VarValue

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
  = head:Power tail:(_ "^" _ Power)* { 
  	  return tail.reduce(function(result, element) {
        return ex_myPow(result, element[3]);
      }, head);
    }

Power
  = head:Parallel tail:(_ ":" _ Parallel)* {
  	return tail.reduce(function(result, element) {
    	return ex_myPar(result, element[3]);
    }, head);
  }

Parallel
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
 
VarValue "var value"
 = [A-Za-z]* {
   return getVarValue(text());
 }
  
VarAssign "var assignment"
 = _ varName:VarName _[=]_ value:Expression {
 	ex_variables.push({varName,value});
 	return value;
 }