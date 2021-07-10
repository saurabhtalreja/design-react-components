# Learning Design Patterns on creating React Components

## Thanks to [Peter Kellner](https://github.com/pkellner) for creating this Plural Sight course [Designing React Components](https://app.pluralsight.com/library/courses/react-components-designing)

### Overview
This simple application serves a server-rendered React application to the client. It's a Next.js server app
 where Speakers Data is shown, best design practices have been implemented. Some features
* Inbuilt API Server to mock real world
* Usage of `useContext` to avoid prop-drilling
* Optimistic UI ie with instant change result, if change persisitng fails rendering original state.
* DRY (Do not repeat yourself) implemeted, kept code clean and reusable.
* Kept state and actions handlers as close as possible.
* Created multiple components to follow Single Responsibility Model at many plaves.

### Usage
To preview the app, first install the necessary dependencies:

`npm install`

Then, build the client code and start the server with one step using

`npm run dev`

The application should now be visible at `http:localhost:3000`.