export function evaluateInfix(expression) {
  try {
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
    if (!tokens || tokens.length < 3) {
      throw new Error("Incomplete expression");
    }

    const values = [];
    const ops = [];

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    const applyOp = (op, b, a) => {
      if (op === "/" && b === 0) {
        if (a === 0) return NaN;
        return Infinity;
      }
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
        default:
          throw new Error("Unknown operator");
      }
    };

    for (let token of tokens) {
      if (!isNaN(token)) {
        values.push(Number(token));
      } else if (token in precedence) {
        while (
          ops.length &&
          precedence[ops[ops.length - 1]] >= precedence[token]
        ) {
          const op = ops.pop();
          const b = values.pop();
          const a = values.pop();
          values.push(applyOp(op, b, a));
        }
        ops.push(token);
      } else {
        throw new Error("Invalid token");
      }
    }

    while (ops.length) {
      const op = ops.pop();
      const b = values.pop();
      const a = values.pop();
      values.push(applyOp(op, b, a));
    }

    const result = values[0];
    if (isNaN(result)) return "NaN";
    if (!isFinite(result)) return "Infinity";
    return result;
  } catch (e) {
    return "Error";
  }
}
