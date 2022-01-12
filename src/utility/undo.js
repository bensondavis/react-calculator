const stack = [];
const redoStack = [];

function addStack(val) {
  stack.push(val);
}

function undo() {
  if (stack.length > 0) {
    const exp = stack.pop();
    redoStack.push(exp);
    return exp;
  }
}

function redo() {
  console.log({ redoStack });
  if (redoStack.length > 0) {
    const exp = redoStack.pop();
    stack.push(exp);
    console.log(stack);
    console.log( redoStack );
    return exp;
  }
}

export { addStack, undo, redo };
