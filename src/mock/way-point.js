import { getRandomArrayElement } from '../utils.js';

const pointTypes = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTARAUNT: 'Restaurant'
};

const destinationDescriptions = [
  `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa amet dignissimos quae
  placeat aut ipsum, labore facere cum nulla maxime repudiandae voluptate modi harum hic
  adipisci nobis molestiae impedit dicta eligendi officia corrupti quibusdam, eaque alias.
  Facere dolorum esse, tempora quo non consequatur officiis repellat ratione. Facilis
  incidunt quae odit accusantium commodi perferendis vero voluptates quidem officia qui
  sint, consectetur consequatur soluta error. Porro quisquam eligendi assumenda incidunt
  eveniet laboriosam veritatis iusto iure adipisci ut dolores debitis, eum voluptatum.
  Tempore debitis alias iste quia temporibus beatae quasi illo rerum, error aliquid dolorem ab.
  Sequi facilis laudantium temporibus dicta ratione delectus?`,

  `is an island country in the southwestern Pacific Ocean.
  It consists of two main landmasses—the North Island (Te Ika-a-Māui) and
  the South Island (Te Waipounamu)—and over 700 smaller islands. It is the
  sixth-largest island country by area and lies east of Australia across
  the Tasman Sea and south of the islands of New Caledonia, Fiji, and Tonga.
  The country's varied topography and sharp mountain peaks, including the Southern Alps,
  owe much to tectonic uplift and volcanic eruptions. New Zealand's capital
  city is Wellington, and its most populous city is Auckland.`
];

const destinations = [
  {
    id: crypto.randomUUID(),
    name: 'Moskow',
    description: destinationDescriptions[0],
    photos: [
      {
        src: 'img/photos/1.jpg',
        alt: 'Event photo 1'
      },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'London',
    description: destinationDescriptions[0].slice(150),
    photos: [
      {
        src: 'img/photos/2.jpg',
        alt: 'Event photo 2'
      },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Amsterdam',
    description: destinationDescriptions[0].slice(1, 80),
    photos: []
  },
  {
    id: crypto.randomUUID(),
    name: 'New Zealand',
    description: destinationDescriptions[1],
    photos: [
      {
        src: 'img/photos/1.jpg',
        alt: 'Event photo 1'
      },
      {
        src: 'img/photos/2.jpg',
        alt: 'Event photo 2'
      },
      {
        src: 'img/photos/3.jpg',
        alt: 'Event photo 3'
      },
    ]
  },
];

const offers = {
  [pointTypes.TAXI]: [
    {
      id: crypto.randomUUID(),
      name: 'Transfer',
      cost: 80,
      checked: true,
    },
    {
      id: crypto.randomUUID(),
      name: 'Meet in Airport',
      cost: 100,
      checked: false,
    }
  ],

  [pointTypes.FLIGHT]: [
    {
      id: crypto.randomUUID(),
      name: 'Extra Luggage',
      cost: 150,
      checked: false,
    }
  ],

  [pointTypes.CHECK_IN]: [
    {
      id: crypto.randomUUID(),
      name: 'Lunch',
      cost: 320,
      checked: true,
    },
  ],

  [pointTypes.BUS]: [
    {
      id: crypto.randomUUID(),
      name: 'Switch to comfort',
      cost: 80,
      checked: false,
    }
  ],
};

// Пустая точка (для создания новой точки маршрута)
const NEW_BLANK_POINT = {
  type: pointTypes.FLIGHT,
  destination: '',
  dates: '',
  offers: '',
  cost: 0,
  isFavorite: false,
};

const mockWayPoints = [
  {
    type: pointTypes.FLIGHT,
    destination: destinations[3],
    dates: {
      start: '2019-12-25 16:00',
      end: '2020-08-01 00:00'
    },
    offers: offers[pointTypes.FLIGHT],
    cost: 5000,
    isFavorite: true,
  },

  {
    type: pointTypes.SHIP,
    destination: '',
    dates: {
      start: '2023-08-10 11:00',
      end: '2023-08-12 14:00'
    },
    offers: offers[pointTypes.SHIP],
    cost: 1000,
    isFavorite: false,
  },

  {
    type: pointTypes.CHECK_IN,
    destination: destinations[0],
    dates: {
      start: '2023-02-01 03:00',
      end: '2023-10-01 03:00'
    },
    offers: offers[pointTypes.CHECK_IN],
    cost: 400,
    isFavorite: false,
  },

  {
    type: pointTypes.TAXI,
    destination: destinations[1],
    dates: {
      start: '2023-12-25 10:00',
      end: '2023-12-25 18:00'
    },
    offers: offers[pointTypes.TAXI],
    cost: 800,
    isFavorite: false,
  },

  {
    type: pointTypes.BUS,
    destination: destinations[2],
    dates: {
      start: '2023-07-24 00:00',
      end: '2023-08-11 09:00'
    },
    offers: offers[pointTypes.BUS],
    cost: 450,
    isFavorite: false,
  },
];

function getBlankPoint() {
  return NEW_BLANK_POINT;
}

function getRandomPoint() {
  return getRandomArrayElement(mockWayPoints);
}

function getDestinations() {
  return destinations;
}


export {getBlankPoint, getRandomPoint, getDestinations};
