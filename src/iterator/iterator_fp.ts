const createIterator = (items: any[]) => {
  let index = 0;

  return () => {
    if (index < items.length) {
      const value = items[index];
      index = index + 1;
      return { value, done: false };
    }

    return { value: undefined, done: true };
  };
};

const next = createIterator(["a", "b", "c"]);

console.log(next()); // { value: "a", done: false }
console.log(next()); // { value: "b", done: false }
console.log(next()); // { value: "c", done: false }
console.log(next()); // { value: undefined, done: true }
