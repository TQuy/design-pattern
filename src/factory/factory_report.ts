interface Exporter {
  export(): void;
}

class PDFExporter implements Exporter {
  export() {
    console.log("Exporting report as PDF");
  }
}

class CSVExporter implements Exporter {
  export() {
    console.log("Exporting report as CSV");
  }
}

abstract class ReportGenerator {
  protected abstract createExporter(): Exporter;

  generate(): void {
    console.log("Generating report...");
    const exporter = this.createExporter();
    exporter.export();
  }
}


class PDFReportGenerator extends ReportGenerator {
  createExporter(): Exporter {
    return new PDFExporter();
  }
}

class CSVReportGenerator extends ReportGenerator {
  createExporter(): Exporter {
    return new CSVExporter();
  }
}

const pdfGenerator = new PDFReportGenerator();
pdfGenerator.generate();

const csvGenerator = new CSVReportGenerator();
csvGenerator.generate();
