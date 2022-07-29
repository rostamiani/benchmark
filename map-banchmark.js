const benny = require('benny');

const data = [...Array(10).keys()].map(x => ({
  id: x,
  count: Math.floor(Math.random() * 10),
}));

benny.suite(
  'Compare Map and For loop',
  benny.add('Map', () => {
    const out = data.map(item => ({
      id: item.id,
      count: item.count * 2,
    }));
  }),
  benny.add('Foreach Push', () => {
    const result = [];
    data.forEach(item => {
      result.push({
        id: item.id,
        count: item.count * 2,
      });
    });
  }),
  benny.add('For Push', () => {
    const result = [];
    for (const element of data) {
      result.push({
        id: element.id,
        count: element.count * 2,
      });
    }
  }),
  benny.cycle(),
  benny.complete(),
  benny.save({file: 'Map vs For', format: 'chart.html'})
);

benny.suite(
  'Aggregate using Reduce and Foreach',
  benny.add('Reduce', () => {
    const count = data.reduce((sum, item) => item.count, 0);
  }),
  benny.add('Foreach', () => {
    let count = 0;
    data.forEach(item => {
      count += item.count;
    });
  }),
  benny.add('For', () => {
    let count = 0;
    for (const element of data) {
      count += element.count;
    }
  }),
  benny.cycle(),
  benny.complete(),
  benny.save({file: 'Reduce vs For', format: 'chart.html'})
);

benny.suite(
  'Compare Map/Filter/Reduce with foreach',
  benny.add('Map/Filter/Reduce', () => {
    const sum = data
      .map(item => item.count * 2)
      .filter(count => count > 3)
      .reduce((a, b) => a + b);
  }),
  benny.add('Foreach', () => {
    let sum = 0;
    data.forEach(item => {
      if (item.count * 2 > 3) sum += item.count * 2;
    });
  }),
  benny.cycle(),
  benny.complete(),
  benny.save({file: 'Map-Filter-Reduce vs For', format: 'chart.html'})
);
