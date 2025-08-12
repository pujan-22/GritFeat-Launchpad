import { 
  Coffee,
  SimpleCoffee, 
  MilkDecorator, 
  SugarDecorator, 
  WhippedCreamDecorator 
} from './implementation';

let coffee: Coffee = new SimpleCoffee();
console.log(`Cost: ${coffee.cost()}`);

coffee = new MilkDecorator(coffee);
console.log(`Cost: ${coffee.cost()}`);

coffee = new SugarDecorator(coffee);
console.log(`Cost: ${coffee.cost()}`);

coffee = new WhippedCreamDecorator(coffee);
console.log(`Cost: ${coffee.cost()}`);