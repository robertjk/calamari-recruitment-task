interface Specialist {
  name: string;
  surname: string;
  profession: string;
  photo?: string;
  rating: {
    sum: number;
    count: number;
  };
}

const specialists: Specialist[] = [
  {
    name: "John",
    surname: "Doe",
    profession: "serial killer",
    photo:
      "https://i.pinimg.com/originals/df/a2/e4/dfa2e40dac2012c6f5d9e5ed9a6db348.jpg",
    rating: {
      sum: 293,
      count: 120,
    },
  },
  {
    name: "Kate",
    surname: "Bush",
    profession: "musician",
    photo:
      "https://bibliolore.org/wp-content/uploads/2018/07/kate-bush.jpg?w=500",
    rating: {
      sum: 1530,
      count: 360,
    },
  },
  {
    name: "Pharoah",
    surname: "Sanders",
    profession: "musician",
    photo:
      "https://www.northseajazz.com/-/media/northseajazz/rotterdam/shows/2011/p/pharoah-sanders-quartet.jpg",
    rating: {
      sum: 88,
      count: 18,
    },
  },
  {
    name: "James",
    surname: "McNulty",
    profession: "policeman",
    photo: "https://s3.cine3.com/2016/07/1200-1200x675.jpg",
    rating: {
      sum: 5818,
      count: 1181,
    },
  },
  {
    name: "Joanna",
    surname: "Newsom",
    profession: "musician",
    photo: "https://www.famousbirthdays.com/headshots/joanna-newsom-5.jpg",
    rating: {
      sum: 231,
      count: 51,
    },
  },
];

export { type Specialist, specialists };
