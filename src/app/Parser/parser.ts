import * as parser from './rules';

export function parse(inputList: ReadonlyArray<string>) {
  let output = "";
  let toBeParsed = "";
  let lastParsed;
  let lastIsAnError: boolean;
  inputList.forEach(str => {
    output += str + "\n";
    if (toBeParsed !== "") {
      toBeParsed += "\n";
    }
    toBeParsed += str;

    try {
      let parsed = parser.parse(toBeParsed);
      output += "  ans=" + parsed.vars["ans"].value + "\n\n";
      lastParsed = parsed;
      lastIsAnError = false;
    } catch (error) {
      console.log("**** Syntax Error parsing ****");
      console.log(str);
      console.log("---- Returned value ----");
      console.log(error);
      output += "  " + error.name + "\n\n";
      toBeParsed = removeLastExpression(toBeParsed);
      lastIsAnError = true;
    }
  })

  let vars      : string = "";
  let functions : string = "";
  let results   : string = "";
  let lastAns    : string = "";
  
  if (lastParsed !== undefined) {
    for (const [key] of Object.entries(lastParsed.vars)) {
      vars += key + '=' + lastParsed.vars[key].value + "\n";
    };
    
    for (const [key] of Object.entries(lastParsed.functions)) {
      let value = lastParsed.functions[key];
      functions += key + "(" + value.arg + ')=' + value.expr + "\n";
    };
    lastParsed.results.forEach((element, index) => {
      results += "[" + index + "]: " + element + "\n";
      lastAns = element.toString();
    });
  }

  if (lastIsAnError) {
    lastAns = "NaN";
  } 

  return {
    output: output,
    vars: vars,
    functions: functions,
    results: results,
    lastAns: lastAns
  }
}

function removeLastExpression(toBeParsed: string): string {
  var toBePrasedList = toBeParsed.split("\n");
  toBePrasedList.pop();
  return toBePrasedList.join("\n");
}