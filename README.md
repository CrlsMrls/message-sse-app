# Message server source events demo app

The goal of this project is to learn/play with the [Server sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).
It uses the [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface to open a persistent HTTP connection to the server
and then the server pushes notifications to the UI on any change.

The application simulates a notification service. The UI creates/deletes/modifies some messages, the server notifies to all clients on any change.
To see it working, open multiple browser windows and check how the changes are syncrhonized across all opened windows. The server updates all opened browsers.

## Architecture

The application is split in two parts:

- User Interface (UI): browser based application based on [Angular](https://angular.io)
- Server: backend REST API based on [NestJS](https://nestjs.com/)

### User interface

The UI lists the messages stored in the server and notifies the user on how many new messages are.
The first part is using normal HTTP requests to fetch/create/modify the messages.
In parallel it creates an EventSource connection, as soon as the server notifies there is a new change, it updates the displayed data.

The interesting part is at message service ([messages.service.ts](./src/ui/app/messages/messages.service.ts)), this Angular Service creates the EventSource and reloads the full message list.

```javascript
const eventSource = new EventSource('/api/messages-summary');

eventSource.onmessage = () => {
  this.ngZone.run(() => {
    this.loadMessages();
  });
};
```

Notice the ngZone is needed, as it does not [patch the EventSource](https://github.com/angular/angular/tree/master/packages/zone.js).

This application is for playing pourposes, in a productive application we should not load the full list of messages.

### Server

The server stores the messages and responds to the typical CRUD requests.
It also listens to the EventSource connection, and update all browsers as changes happen, these events are in text/event-stream format.
The connection remains open until closed by calling `EventSource.close()` in the UI side.

For sending the events, it is as easy as use the `@Sse()` decorator provided by NestJS. [More info at NestJS documentation "Server-Sent Events" section](https://docs.nestjs.com/techniques/server-sent-events). The following code implements that part inside the [app.controller.ts](./src/api/app/app.controller.ts):

```javascript
  @Sse('messages-summary')
  serverSentEvents(): Observable<MessagesSummary> {
    return this.messagesService.messagesSummary$;
  }
```

The `messagesService` simply returns a RxJS Observable and NestJS takes care of the rest.

Notice the server stores the messages in memory inside an array. A productive ready server would store this data in a database.

## Run on docker

You must have [installed Docker](https://docs.docker.com/get-docker/) in your computer. A Dockerfile is already included in the repository, so you just need to build the image and run it.

```bash
$ docker build -t message-sse-app .
$ docker run -dp 8081:8081 message-sse-app
```

## Install and build locally

Before running the application locally, you must install the dependencies and then build the application.

### 1. Install

This is an npm based project, to install the application you must have installed [Node.js](https://nodejs.org/en/) version 12 or greater. Then simply run `npm install` or `yarn`.

```bash
$ npm install
```

### 2. Build

Just run the following command to build the application:

```bash
$ npm run build
```

This will build the UI and the server, the script will place the resulting files into the `dist` folder.

### 3. Running the application

For running the application, just run the following command:

```bash
$ npm run start
```

This will start up the server. The server also serves the UI files.

In no errors are displayed in the console, open the browser to `http://localhost:8081/`.

## Development

For developing, you will need first to follow the previous step and install it locally.

If you want modify the application, open two command lines, in the first one run the server:

```bash
$ npm run dev:server
```

In the second command line build the Angular application:

```bash
$ npm run dev:ui
```

Both commands run in `watch` mode, so all changes in the code automatically reload them.

In this case open the browser to `http://localhost:4200/`.
