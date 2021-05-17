import { result } from 'lodash';
import * as parser from './rules';

export function parse(inputList: ReadonlyArray<string>) {
  let output = "";
  let toBeParsed = "";
  let lastParsed;
  inputList.forEach(str => {
    output += str + "\n";
    if (toBeParsed !== "") {
      toBeParsed += "\n";
    }
    toBeParsed += str;

    try {
      let parsed = parser.parse(toBeParsed);
      output += "  ans = " + parsed.vars["ans"].value + "\n\n";
      lastParsed = parsed;
    } catch (error) {
      console.log(error);
      output += "  " + error.name + "\n\n";
      toBeParsed = removeLastExpression(toBeParsed);
    }
  })

  let vars = "";
  let functions = "";
  let results = "";
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
    });
  }

  return {
    output: output,
    vars: vars,
    functions: functions,
    results: results
  }
}

function removeLastExpression(toBeParsed: string): string {
  var toBePrasedList = toBeParsed.split("\n");
  toBePrasedList.pop();
  return toBePrasedList.join("\n");
}