const stack = [];
const redoStack = [];
const ans = [];

function addAns(val) {
  ans[0] = val;
}

function getAns() {
  return ans[0];
}

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
  if (redoStack.length > 0) {
    const exp = redoStack.pop();
    stack.push(exp);
    return exp;
  }
}

export { addStack, undo, redo ,addAns, getAns};
