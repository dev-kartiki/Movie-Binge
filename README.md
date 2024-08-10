## Design Decisions

1. UI/UX -> bootstrap, bootstrap-icons, saas, sweetalert2.
   bootstrap handles CSS with minimum lines of code and minimizes the need to create CSS files.
   saas is integrated to manage any further design complexities.
   bootstrap-icons is a helper package to handle easy usage of icons with bootstrap.

2. Routing -> react-router-dom.
   It is used to handle routing in the application.

3. API calls -> axios, TMDB APIs.
   axios is used to make HTTP requests and interact with backend.
   TMDB APIs are used for backend interaction.

4. User login data handling -> json-server.
   A file "db.json" stores user credentials and the JSON server acts as a mock server that simulates RESTful API.

5. Form validations -> formik, yup.
   It is done using Formik and Yup as it facilitates easy state handling, submissions, and validation of forms.

6. SEO -> react-helmet.
   A dedicated reusable component 'SEO' manages SEO for different pages.

7. Accessibility -> axe.
    It flags accessibility issues in the application encouraging better accessibility practices.
   
9. Components -> common, Movie, AuthContext.
   common: 
    RegularList is a reusable component used to render any list with some modifications.
    SmallMovieList is another reusable component that shows limited movie data and can be passed to RegularList as a component that handles further styling.
    LargeMovieList is a similar component to SmallMovieList rendering more amount of data.

   Movie:
    All components related to Movie rendering exist here.

   AuthContext:
   Context to handle authorization and authentication along with PrivateRoute restricting access to the application without Login.
    
## Steps to run the application

To start the app:
1. Run `npm install` to install all dependencies.
2. Run `npm start` to start the development server.

To start the JSON server:
1. Ensure you have `json-server` installed globally (`npm install -g json-server`).
2. Run `json-server --watch db.json --port 5000` to start the server, which will watch for changes in the `db.json` file and serve it on port 5000. Go to the directory which has db.json file. Here /src and then run the command.

## Additional features
1. Login
2. Create Account
3. Alerts

## Possible improvements
1. Filters can be integrated to work along with search as well. Currently, search has a higher priority over filter.
2. SEO can be improved by handling SEO content through a state in Context.
3. UI design can also be improved using UI/UX principles.
