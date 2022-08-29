# The concept of a web platform for training aspiring journalists (React App) :disguised_face:

The purpose of the work was to create a platform for publishing and disseminating the work of journalists with opportunities for further employment. The developed software product is a web application that helps to improve the skills and employment of novice journalists, and employers to hire good specialists.
The software product is implemented in Visual Studio Code using the TypeScript programming language. The database and hosting was created using the Firebase platform.

## Technical requirements (Stack)
1. TypeScript
2. Framework: React
   - Use functional components.
   - Use functional component hooks.
   - Use redux state.
   - Use redux form (react hook forms).
   - Use react router (i.e. get params from route).
   - Use Typescript.
   - Use Axios for fetch requests or some other tool (you could use some json generator or some real time db).
   - Prevent component render without data.
   - Don't forget to create interfaces, 'any' type is unacceptable.
   - Use a styling library (Chakra UI).
   - Use middlewares.
3. PWA requirements
   - App should cache all static resources with service worker
   - App should continue to work when there's no internet connection, displaing latest fetched chat information
   - After re-connection to internet, all chat data should be updated
4. Testing
   - Jest/Jasmine for Unit Tests
   - Cypress/Protractor for E2E Tests
5. CI/CD

## Functional requirements
1. Sign in/Signup/Reset Password
  - Login / logout flow via email and password
  - Login using Google/Facebook oAuth
  - Sign up flow using email and password, name, age and etc.
  - Reset / forgot password flow
2. Dashboard
 - Functionality to add/change/remove "items" on Dashboard
 - Populate a list of items which can be sorted and filtered
 - The widget can display real-time weather data (or some other real-time data from API)
 3. Profile
 - 	Populate our personal data. You can edit it. Also, the user should be able to update the profile image and password
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn cypress`

This script will run end-to-end tests written on Cypress.

### `yarn ci`

Script which install packages based on the lock-file.

## Hosting
Hosting was implemented using the Firebase platform.
Open [https://myapp-44173.web.app/](https://myapp-44173.web.app/) to view it in the browser.


