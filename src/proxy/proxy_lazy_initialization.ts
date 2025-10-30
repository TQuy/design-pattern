interface FileReader {
  read(): string;
}

class RealFileReader implements FileReader {
  private content: string;

  constructor(private filename: string) {
    console.log(`Loading file ${filename}...`);
    this.content = `File content of ${filename}`;
  }

  read(): string {
    return this.content;
  }
}

class LazyFileReaderProxy implements FileReader {
  private realReader: RealFileReader | null = null;

  constructor(private filename: string) { }

  read(): string {
    if (!this.realReader) {
      this.realReader = new RealFileReader(this.filename);
    }
    return this.realReader.read();
  }
}

// 🧪 Usage
const file = new LazyFileReaderProxy("data.txt");
console.log("Proxy created, but file not loaded yet");
console.log(file.read());
