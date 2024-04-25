# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

bio: null
birth_date: "2000-05-01"
city: null
created_at: "2021-06-08T13:09:50.213Z"
deleted_at: null
email: "james.freelance@yopmail.com"
full_name: "Jame Mario"
id: 78
last_seen: null
nemid_verified: 1
nemid_verified_date: "2021-06-08T13:09:50.000Z"
password: "$2b$10$2gAOSdQjiiMrClQSp7iZVulXfkydT1bBjWNMg2TS4s7yZ3scrEZJS"
phone_numbers: null
preferred_way_of_contacting: 1
profile_completed: 0
profile_photo: null
remember_me: null
sign_in_as: 0 
status: 1
stripe_account_id: null
stripe_customer_id: null
sub_nemid: "{10a3d990-29d4-451b-95da-a8e6ece645dd}"
token: null
updated_at: "2021-06-08T13:11:17.000Z"
user_role: 0
verified: 1
work_as: 1
zipcode: null

signinas => 1 admin => 0 user
workas => 1 Business => 0 Freelance


## Docker Scripts
To create the production build
```sh
docker build -t marketplace-web .
```
To run it locally on port 3000
```sh
docker run -p 3000:80 -d marketplace-web:latest
```
To run it on port 80
```sh
docker run -p 80:80 -d marketplace-web:latest
```

To stop the image
```sh
docker stop CONTAINER_ID
```