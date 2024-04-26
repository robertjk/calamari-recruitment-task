# Calamari Recruitment Task

Recruitment task for Calmari.

## Task

The task is to implement an application screen using React.js.

Screen designs are on
[Figma](https://www.figma.com/file/5yj3qvtTUOsVRNzleYzVeq/Programista-Frontend---TEST?type=design&node-id=0-1&mode=design&t=BDUpSDZ8EJd5zh0q-0).

### Functional requirements

- Clicking the star sets the rating
- Clicking the heart displays the specialist in _My specialists_ tab
- Initially the stars are grey; after clicking them the average rating should be
  updated
- _Screen_1_ is the base view, while _Screen_2_ shows the hover states
- Generate and mock the input data (> 5k specialists), while ensuring the search
  works smoothly

### Non-functional requirements

- Implement the screens without using any UI component libraries
- Mock the data; it doesn't have to be persisted anywhere
- Use Redux / ReduxToolkit
- To build the project use Webpack and configure it manually (don't use
  automated solutions like Create React App)

### Nice to have

- TypeScript
- Tests
- RWD
- Comfortable navigation using keyboard

## Note about the solution

### Vite

**I used Vite instead of Webpack**. I have never had opportunity to use this
tool, while since some time I have wanted to try it out. I felt now would be a
good opportunity to do that. I think it demonstrates my skills of configuring
bundlers exactly the same as Webpack would do; especiall that I'm using it for
the first time.

### Specialists data

I didn't generate the specialists data, but simply mocked 6 specialists
manually.

The rest of the functionality took me more time than expected. Now I simply
don't have time to spend on generating the data, then implementing pagination or
lazy-loading, which such amount of data would require.

## Running

### Dependencies

To run the app you need to have the following installed:

- [Node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Setup

Before the first run you need to install NPM dependencies by going to the app
folder:

```sh
$ cd calamari-recruitment-task/
```

and executing:

```sh
$ npm install
```

### Run the app

To run the app you need to execute:

```sh
$ npm run dev
```

### Tests

To run the tests suite you need to execute:

```sh
$ npm run test
```
