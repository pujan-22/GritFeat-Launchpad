import { LogisticsFactory } from './implementation';

const ship = LogisticsFactory.createTransport('sea');
const plane = LogisticsFactory.createTransport('air');
const truck = LogisticsFactory.createTransport('land');

ship.drive();
plane.drive();
truck.drive();