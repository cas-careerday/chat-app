# Chat App Client

## Running

1. Install [Node.js](https://nodejs.org/en/) if not installed already.
1. Install the [Angular CLI](https://github.com/angular/angular-cli).
1. Navigate to the client folder on a terminal and run `npm install`
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate service|module|directive|pipe|class|guard|interface|enum`.


## What should I do with this?
This project contains a very basic Angular App that displays an ugly chat client to the user. Note that your [server](../server) needs to be running on localhost:3000 for this to work!

A good place to start is to check out [the example component](./src/app/example) and understand how it works. It's a very rudimentary and ugly component. Feel free to change it to look better, or even remove it and start from scratch.

To use your own component instead of the example component, remember to add it to the `app.module.ts` in the `declarations` array. This will be done automatically for you if you use the Angular CLI to generate your component!

Some good things to try are:
* Divide your app into more than one component
* Make your layout responsive
* Add a timestamp to the received messages
* Make a distinction between your own messages, and those from others
* Add a "currently typing" feature to your client
  * The server supports the WebSockets events `'typing'` and `'stop typing'` with a `User` as payload
  * The server will simply broadcast these events to other clients on arrival
* ... Make it look nice, and be creative!
