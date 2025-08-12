interface Transport {
  drive(): void;
}

class Ship implements Transport {
  drive() {
    console.log("Sailing in sea");
  }
}

class Plane implements Transport {
  drive() {
    console.log("Flying in air");
  }
}

class Truck implements Transport {
  drive() {
    console.log("Driving in land");
  }
}

export class LogisticsFactory {
  public static createTransport(type: string): Transport {
    switch (type.toLowerCase()) {
      case "sea":
        return new Ship();
      case "air":
        return new Plane();
      case "land":
        return new Truck();
      default:
        throw new Error("Invalid transport type");
    }
  }
}