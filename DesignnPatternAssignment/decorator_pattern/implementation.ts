export interface Coffee {
  cost(): number;
}

export class SimpleCoffee implements Coffee {
  cost() {
    return 5;
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;
}

export class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }
}

export class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }
}

export class WhippedCreamDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 3;
  }
}