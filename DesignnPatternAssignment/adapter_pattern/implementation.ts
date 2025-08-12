export class OldPrinter {
  printText(text: string) {
    console.log(`Old Printer: ${text}`);
  }
}

export interface Printer {
  print(message: string): void;
}

export class OldPrinterAdapter implements Printer {
  private oldPrinter: OldPrinter;

  constructor(oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  print(message: string): void {
    this.oldPrinter.printText(message);
  }
}