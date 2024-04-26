import { type SpecialistResponse } from "%store/apiSlice";

const specialistsData: SpecialistResponse[] = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    profession: "serial killer",
    photoUrl:
      "https://i.pinimg.com/originals/df/a2/e4/dfa2e40dac2012c6f5d9e5ed9a6db348.jpg",
    rating: {
      sum: 293,
      count: 120,
    },
    favorite: false,
  },
  {
    id: 2,
    name: "Kate",
    surname: "Bush",
    profession: "musician",
    photoUrl:
      "https://bibliolore.org/wp-content/uploads/2018/07/kate-bush.jpg?w=500",
    rating: {
      sum: 1530,
      count: 360,
    },
    favorite: false,
  },
  {
    id: 3,
    name: "Pharoah",
    surname: "Sanders",
    profession: "musician",
    photoUrl:
      "https://www.northseajazz.com/-/media/northseajazz/rotterdam/shows/2011/p/pharoah-sanders-quartet.jpg",
    rating: {
      sum: 88,
      count: 18,
    },
    favorite: false,
  },
  {
    id: 4,
    name: "James",
    surname: "McNulty",
    profession: "policeman",
    photoUrl: "https://s3.cine3.com/2016/07/1200-1200x675.jpg",
    rating: {
      sum: 2518,
      count: 712,
    },
    favorite: false,
  },
  {
    id: 5,
    name: "Joanna",
    surname: "Newsom",
    profession: "musician",
    photoUrl: "https://www.famousbirthdays.com/headshots/joanna-newsom-5.jpg",
    rating: {
      sum: 231,
      count: 51,
    },
    favorite: false,
  },
  {
    id: 6,
    name: "Siddhartha",
    surname: "Gautama",
    profession: "religious teacher",
    rating: {
      sum: 8872,
      count: 1802,
    },
    favorite: false,
  },
];

export { specialistsData };
