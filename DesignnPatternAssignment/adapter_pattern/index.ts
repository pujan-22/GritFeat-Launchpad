import { OldPrinterAdapter, Printer, OldPrinter } from './implementation';

const oldPrinter = new OldPrinter();
const adapter: Printer = new OldPrinterAdapter(oldPrinter);

adapter.print('Hello World');