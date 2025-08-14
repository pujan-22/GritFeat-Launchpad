import { NewsAgency, NewsChannel } from './implementation';

const agency = new NewsAgency();
const channel1 = new NewsChannel();
const channel2 = new NewsChannel();

agency.addChannel(channel1);
agency.addChannel(channel2);

agency.publishNews('Breaking News!');

console.log(channel1.getNews());
console.log(channel2.getNews());

agency.removeChannel(channel1);
agency.publishNews('Update! Channel removed');

console.log(channel1.getNews());
console.log(channel2.getNews());