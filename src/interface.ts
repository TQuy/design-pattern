interface Serializer<T> {
  serialize(obj: T): string;
  deserialize(s: string): T;
}

class JSONSerializer<T> implements Serializer<T> {
  serialize(obj: T): string {
    return JSON.stringify(obj);
  }

  deserialize(s: string): T {
    return JSON.parse(s) as T;
  }
}

class NoopSerializerM<T> implements Serializer<T> {
  serialize(obj: T): string {
    return '[noop]';
  }

  deserialize(s: string): T {
    throw new Error('not supported');
  }
}

function persist<T>(obj: T, serializer: Serializer<T>) {
  const payload = serializer.serialize(obj);
  console.log('Persisting:', payload);
}

persist({
  id: 1,
  name: 'x'
}, new JSONSerializer());

persist({
  id: 1,
  name: 'x'
}, new NoopSerializerM());