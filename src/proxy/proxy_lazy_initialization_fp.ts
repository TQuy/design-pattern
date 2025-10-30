const createLazy = <T extends object>(facttory: () => T): T => {
  let instance: T | null = null;

  return new Proxy({} as T, {
    get: (_target, prop, receiver) => {
      if (!instance) {
        console.log("Initializing lazy instance...");
        instance = facttory();
      }
      const value = Reflect.get(instance!, prop, receiver);
      return typeof value === 'function' ? value.bind(instance) : value;
    }
  })
}

const user = createLazy(() => {
  console.log("Creating real user...");
  return { name: "Alice", greet: () => { return "Hello " + "Alice"; } };
});

console.log("Proxy created.");
console.log(user.greet());