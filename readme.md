# Simple planner

This is simple planner application written in TypeScript.

Code can be compiled usign TSC to pure JavaScript using this command:
```console
npx tsc -w
```

Simplest way to check effects is to open included `index.html` file on web browser. Output is returned in the browsers console (F12).

Script contain sample usage:
- defines 2 users,
- defines 2 meetings for both users,
- defines meeting for single user,
- tries to define meeting starting not at hour mark - giving error,
- tries to define meeting with no participants added - giving error,
- tries to define meeting on busy time slot - giving error.

Messages and defined meeting are displayed in the browsers console using
```js
console.log()
```
.
