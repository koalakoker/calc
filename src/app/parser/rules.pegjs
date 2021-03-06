{
  var ans;
  var ex_results = [];
  var ex_variables = {};
  var ex_functions = {};
  
  var ex_parseInt = function(x) {return parseInt(x, 10)};
  var ex_parseFloat = function(x) {return parseFloat(x)};
  var ex_parseHex = function(x) {return parseInt(x, 16)};
  var ex_parseBin = function(x) {return parseInt(x, 2)};
  
  var ex_myAdd = function(a,b){return a+b;}
  var ex_mySub = function(a,b){return a-b;}
  var ex_myMul = function(a,b){return a*b;}
  var ex_myDiv = function(a,b){return a/b;}
  var ex_myPow = function(a,b){return Math.pow(a,b);}
  var ex_myPar = function(r1,r2){return ((r1*r2)/(r1+r2));}
  var ex_myPI  = function(){return Math.acos(-1);}
  var ex_myE   = function(){return Math.exp(1); }
  
  function ex_setArgsAsVariables(argList, fnArg) {
    var len = argList.length;
    var oldValues = [];
    for (var i = 0; i < len; i++) {
      oldValues.push(ex_variables[argList[i]]);
      var expr = argList[i] + "=" + fnArg[i];
      peg$parse(expr);
    }
    return oldValues;
  }

  function ex_resetArgsAsVariables(argList, oldValues) {
    var len = argList.length;
    for (var i = 0; i < len; i++) {
      var value = oldValues[i];
      if (value !== undefined) {
        ex_variables[argList[i]] = oldValues[i];
      } else {
        delete ex_variables[argList[i]];
      }
    }
  }

  var ex_fn = function (fnName, fnArg) {
  	var result = NaN;
    if (typeof Math[fnName] !== 'undefined') {
    	result = Math[fnName](fnArg);
        return result;
	}
    if (typeof ex_functions[fnName] !== 'undefined') {
      var argList = ex_functions[fnName].arg.split(',');
      var expr = "";
      if (argList.length != fnArg.length) return NaN;
      var oldValues = ex_setArgsAsVariables(argList, fnArg);
      expr = ex_functions[fnName].expr;
      var ans = peg$parse(expr);
      result = ans;
      ex_resetArgsAsVariables(argList, oldValues);
      return result;
    }
    if (fnName === "hex") {
    	var value = parseInt(fnArg, 10);
    	return "0x" + value.toString(16);;
    }
    if (fnName === "bin") {
    	var value = parseInt(fnArg, 10);
    	return "0b" + value.toString(2);;
    }
    return (result);
  }
  
  var ex_fnAssign = function(fnName, fnArg, fnExpr) {
  	var retVal = NaN;
    if (typeof Math        [fnName] === 'undefined') {
      ex_functions[fnName] = {};
      fnExpr = fnExpr.replace(/\s+/g,'');
      ex_functions[fnName].expr = fnExpr;
      fnArg = fnArg.replace(/\s+/g,'');
      ex_functions[fnName].arg  = fnArg;
      retVal = 0;
    }
  	return retVal;
  }

  var getVarValue = function(variable) {
    var value = NaN;
    if (typeof ex_variables[variable] !== 'undefined') {
      value = ex_variables[variable].value;
    }
    return value;
  }
  
  var setVar = function(varName, value) {
    if (typeof ex_variables[varName] ==! 'undefined') {
    	ex_variables[varName] = {value:value};
    } else {
    	ex_variables[varName] = {value:value};
    }
    return value;
  }

}

Input = ans:( FnAssign / VarAssign / 
        Expression / Command / FnValue / AnsValue / VarValue) {
        setVar("ans", ans);
    	return ans;
	}

Expression = 
  head:Term tail:(_ ("+" / "-") _ Term)* {
  	if (isNaN(head)) {
    	head = 0;
    }
    var ans = tail.reduce(function(result, element) {
      if (element[1] === "+") {
        return ex_myAdd(result, element[3]); 
      }
      if (element[1] === "-") {
          return ex_mySub(result, element[3]); 
      }
    }, head);
    return ans;
  }

Term =
  head:Factor tail:(_ ("*" / "/") _ Factor)* {
    return tail.reduce(function(result, element) {
      if (element[1] === "*") {
        return ex_myMul(result, element[3]); 
      }
      if (element[1] === "/") {
        return ex_myDiv(result, element[3]);
      }
    }, head);
  }

Factor  = 
  head:Power tail:(_ "^" _ Power)* { 
    return tail.reduce(function(result, element) {
      return ex_myPow(result, element[3]);
    }, head);
  }

Power = 
  head:Parallel tail:(_ ":" _ Parallel)* {
  	return tail.reduce(function(result, element) {
    	return ex_myPar(result, element[3]);
    }, head);
  }

Parallel = 
  "(" _ expr:Expression _ ")" { return expr; }
  / Hexadecimal / Binary / Number / Integer 
  / FnValue / AnsValue / VarValue

Number "number" = 
  _ ([-]*[0-9]*[\.][0-9]*) {
    return ex_parseFloat(text());
  }

Integer "integer" = 
  _ [0-9]+ {
  	return ex_parseInt(text());
  }
  
Hexadecimal "hexadecimal" =
  _ "0x"[0-9a-fA-F]+ {
  	return ex_parseHex(text());
  }
  
Binary "binary" =
  _ "0b"bin:[0-1]+ {
  	return ex_parseBin(bin.join(""));
  }
  
_ "whitespace" = 
  [ \t]*
  
Cr "return" = 
  [\n\r]+
  
Command "command" = 
  "print" {
    return ex_variables;
  }
   
Name "name" =
  [A-Za-z_$]+[A-Za-z0-9_]* {return text()};
  
VarValue "var value" =
  ("pi"/"PI") {return ex_myPI();}
  / ("e" / "E") {return ex_myE();}
  / [A-Za-z]* {return getVarValue(text());}

AnsValue "Previous answer value" =
  "ans["line:Integer"]" {return ex_results[line];}

FnValue "function value" = 
  _ fnName:Name _ [(] _ fnArg:ExpressionList _ [)] {
  return ex_fn(fnName, fnArg);
}
  
VarAssign "var assignment" = 
  _ varName:Name _ [=] _ value:Expression {
    return setVar(varName, value);
 }
 
VarList "Variable list" = 
  Name  (_ "," _ Name)* {
 return text();
 }
 
ExpressionList "Expression list" = 
  _ head:Expression _ tail:("," _ Expression)* {
  var retList = [];
  retList.push(head);
  tail.forEach(element => {
    retList.push(element[2]);
  });
  return retList;
}
  
FnExpr "Function expression" = 
  [^\n\r]+ {return text();}
 
FnAssign "function assignment" = 
  _ fnName:Name _ [(] _ fnArg: VarList _ [)] _ [=] fnExpr:FnExpr {
  return ex_fnAssign(fnName, fnArg, fnExpr);
}