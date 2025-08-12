import { UserBuilder } from './implementation';

const user1 = new UserBuilder('Raju', 'raju@master.com').build();
const user2 = new UserBuilder('Sita', 'sita@ram.com')
  .setAge(20)
  .setAddress('Kathmandu')
  .build();

console.log(user1);
console.log(user2);