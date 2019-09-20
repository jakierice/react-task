# Entropy Party
> Fun data visualization application using a random number generating web socket service.

[Live Demo Site](https://corva-react-task.jakierice.now.sh)

## Overview

The following sections detail various aspects of the Entropy Party application. Please review the [CHANGELOG](./CHANGELOG.md) for a historical outline of the development phases of this application.

### Technologies Used

#### [Next.js](https://nextjs.org)

Next.js is a server side rendering framework that uses React for UI implementation and built on top of AWS infrastructure. There are many advantages to using a server side rendered application like:

* User's browsers don't have to download as much code to run the application because the server streams raw HTML to the browser. When executed, React returns plain HTML and JavaScript for the user to interact with. Because React's JavaScript is run on the server, the user's browser does not need to download any of the React code or code from other libraries used to enhance React.
* Code splitting and dynamic import is supported "out of the box". This allows the server to send much smaller JavaScript bundles to the user's browser because code is only sent to the browser in response to a browser initiated request.
* Hot Module Replacement [HMR]. During development, only the code that has changed will be rebuilt and replaced in the browser. This allows developers to make changes to the code and review the result in a very fluid manner.

#### [Now.sh](https://zeit.co/home)

Now.sh is a hosting and deployment framework built by the same team that developed Next.js. Now gives developers the following benefits (as stated on their website):

* Zero config. Applications can be deployed simply by running the `now` command from a terminal in the project directory. The deployment CAN be extended if necessary.
* GitHub integration for automated deployments when Pull Requests are merged to master.
* Automatic SSL encryption without any extra configuration or other services required.

#### [styled-components](https://www.styled-components.com)

The `styled-components` library is one of many [CSS-in-JS](https://github.com/MicheleBertoli/css-in-js) solutions available from the open source community. Next.js supports CSS-in-JSS as the primary method for styling React components.

#### [recharts](http://recharts.org/en-US/)

`recharts` is an SVG and D3 based charting library built specifically for use in React applications. The library is [tree-shakeable](https://webpack.js.org/guides/tree-shaking/) so only the code required by the host application is bundled instead of the entire library. Chart components provided by `recharts` are highly configurable, declarative, and composable. Each of the charts in Entropy Party were easily implemented using basic configuration.

#### [socket.io-client](https://github.com/socketio/socket.io-client)

The `socket.io-client` library makes connecting a client side application to a web socket seamless and quick. This application does not currently require multiple socket events, but new events could be easily added using the `socket.io-client` library at the page or component level.

### Considerations

In its current form, the Entropy Party application is quite simple. The main considerations for technology were related to the future development of the application:

* Server Side Rendering (SSR) for browser load performance and future ability to cache and cache dump random number data on the server without requiring new data layer service communication with client-side application.
* Themeability using `styled-components` library for future variations of styling due to possible client needs.
* [Atomic and Molecular](http://bradfrost.com/blog/post/atomic-web-design/) level component decomposition for reuse across components and future pages.
* Mobile device responsiveness for access to random number analysis on the go!

### Discoveries

Various discoveries were made during the initial project planning and development phase that required pivots in both technologies used and approach to development. The items listed below were the biggest discoveries that effected the development of the application to its current form.

#### Now.sh 2.0 does not support web socket connections

The application currently uses Now.sh 1.0 because the [Now.sh 2.0 platform does not support web socket connections](http://bradfrost.com/blog/post/atomic-web-design/). This is because Now.sh 2.0 is built completely on top of AWS Lambda serverless functions for data layer API connection and even the static file hosting of any statically built assets. After many hours of attempting to get Now.sh 2.0 to work with sockets, the application was reverted to the Now.sh 1.0 platform in order to support the web socket subscription.

#### Responsive sizing issues with server render React based charting libraries

Since the the client-side markup and JavaScript run-time is on the server and not the browser, it is not possible to calculate the rendered size of HTML elements since there is no DOM available on the server. Because of this, charting libraries like `recharts` cannot calculate the initial size with which to render charts. In order to work around this issue, Entropy Party uses the [use-resize-observer](https://github.com/ZeeCoder/use-resize-observer) hook for calculating the responsive size of the chart after the page has been rendered in the browser.

### Application use instructions

For the most part, Entropy Party simply visualizes and logs a list of random numbers generated by a realtime service. Various controls have been provided to give users with a more richly interactive and controllable experience.

#### Random number threshold

Users can use the random number threshold slider input to set a max number threshold. If a newly generated number is emitted by the random number socket that is higher than the default (75) or user entered threshold number, a [toast notification](https://uxplanet.org/toast-notification-or-dialog-box-ae32ad53106d?gi=5070b145aefe) will appear on the users screen to alert them that the threshold has been broken and by how much.

#### Random number snapshot

It is possible to shrink or expand the quantity of numbers being viewed in the charts and log by adjusting the random number snapshot slider input. The snapshot can be set to any number between 0 and 30, but it defaults to 15. This allows users to "zoom" in or out on the current realtime numbers being emitted by the random number socket.

#### User controlled socket connection status

Users have the ability to manually open or close the socket connection using the "Open connection" and "Close connection" buttons found in the controls section of the application.

#### Mobile device use

The controls are not displayed in the main view on mobile devices. In order to acccess the controls, users can click the icon button pinned to the right side of the screen.

## Development

Development of the Entropy Application is fairly easy to get started with. The Next.js infrastructure already in place makes it possible for developers to very quickly get started with development after they download the git repository containing the code.

### Download repository and install dependencies

```bash
git clone git@github.com:jakierice/react-task.git
```

```bash
cd react-task
```

```bash
npm install
```

### Run development environment locally

Once the following command is run, Next.js will launch a new browser window using your default browser, and changes will be automatically added to the application using Hot Module Replacement.

```bash
npm run dev
```

### Deploy application

Deployment is automatically done once a new Pull Request is merged into the `master` branch using the [Now.sh GitHub integration](https://github.com/zeit/now). However, if the application needs to be deployed manually, first make sure you have the [`now` CLI installed on your local machine](https://zeit.co/docs) and run the following command in the project directory:

```bash
now
```

## Known Issues

1. "Open connection" button sometimes requires two clicks to establish a fully opened connection. Root cause unknown.
2. Threshold and snapshot slider controls do not respond well to touch dragging on mobile devices.

## Future Development

Further planned feature development and improvements that could be made to the Entropy Party application are:

* better unit test coverage
* introduction of integration and end-to-end tests
* abstraction of atomic and molecular level components that are not specific to the application into an external component library publish to private NPM repository
* conversion to TypeScript
* client-side state flushing to maintain low overhead on main JavaScript execution thread
