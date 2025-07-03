export function evaluateInfix(expression) {
  const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
  const values = [];
  const ops = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const applyOp = (op, b, a) => {
    if (b && a) {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
      }
    } else {
      return "Error";
    }
  };

  for (let token of tokens) {
    if (!isNaN(token)) {
      values.push(Number(token));
    } else {
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
    }
  }

  while (ops.length) {
    const op = ops.pop();
    const b = values.pop();
    const a = values.pop();
    values.push(applyOp(op, b, a));
  }

  return values[0] !== "Error" ? Math.trunc(values[0]) : values[0];
}
