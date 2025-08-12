# Adapter Pattern Implementation

## Purpose
Allows incompatible interfaces to work together.

## Implementation
- Target interface (Printer) expected by client
- Adaptee (OldPrinter) with incompatible interface
- Adapter class that implements target interface and wraps adaptee

## Usage
```typescript
const adapter = new OldPrinterAdapter(new OldPrinter());
adapter.print('message');
```
## Output
![alt text](image.png)