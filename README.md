# Hassanium Hooks

This is not a production ready package. It is for learning purpose only.
A universal, lightweight & efficient EventManager/PluginsSystem/MiddlewareManager/ExtendabilitySystem for JavaScript built on top of the amazing [@wordpress/hooks](https://www.npmjs.com/package/@wordpress/hooks) with one extra addition which is adding asynchronous hooks support.

## Installation

#### npm:

```shell
npm install @hassanium/hooks --save
```

#### CDN:

```html
<!-- unpkg -->
<script src="https://unpkg.com/@hassanium/hooks@latest"></script>
```

## Usage

#### ES2015:

```javascript
import HassaniumHooks from '@hassanium/hooks';
var hooks = HassaniumHooks.createHooks();
```

#### Script:

```html
<script src="path/to/hassanium-hooks.js"></script>
<script>
	var hooks = HassaniumHooks.createHooks();
</script>
```

#### Node.js:

```javascript
var HassaniumHooks = require('@hassanium/hooks');
var hooks = HassaniumHooks.createHooks();
```

## Examples

> These examples are taken from src/test/index.manual.test.js file, you can run this file using `node ./src/examples/misc.js` if you have Node.js installed, there will be other example files worth to check all of them will be able to run using `node ./src/examples/[fileName].js`.

#### Example 1

```javascript
var hooks = HassaniumHooks.createHooks();

/**
 * Asynchronous Filters
 */
hooks.addFilter(
	'awesome_filter',
	'namespace',
	(content, arg1, arg2) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(content + arg1 + arg2);
			}, 300);
		});
	},
	10
);

hooks.addFilter(
	'awesome_filter',
	'namespace',
	(content, arg1, arg2) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(content + arg1 + arg2);
			}, 300);
		});
	},
	10
);

hooks.addFilter(
	'awesome_filter',
	'namespace',
	(content, arg1, arg2) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(content + arg1 + arg2);
			}, 300);
		});
	},
	10
);

const AsyncFunction = async () => {
	var result = await hooks.applyFilters('awesome_filter', 25, 1, 2);
	console.log(result);
};

AsyncFunction();
```

The result will be:

```shell
34
```

---

#### Example 2

```javascript
var hooks = HassaniumHooks.createHooks();

/**
 * Asynchronous Actions
 */

hooks.addAction(
	'awesome_action',
	'namespace',
	(content, arg1, arg2) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				console.log('action1', content, arg1, arg2);
				resolve(content);
			}, 300);
		});
	},
	10
);
hooks.addAction(
	'awesome_action',
	'namespace',
	(content, arg1, arg2) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				console.log('action2', content, arg1, arg2);
				resolve(content);
			}, 300);
		});
	},
	10
);

const AsyncFunction = async () => {
	await hooks.doAction('awesome_action', 25, 6, 30);
};

AsyncFunction();
```

The result will be:

```shell
action1 25 6 30
action2 25 6 30
```

---

#### Example 3

```javascript
var hooks = HassaniumHooks.createHooks();

/**
 * Synchronous Actions
 */
hooks.addAction(
	'awesome_action_sync',
	'namespace2',
	(arg1, arg2) => {
		console.log('awesome_action_sync1', arg1, arg2);
	},
	10
);
hooks.addAction(
	'awesome_action_sync',
	'namespace2',
	(arg1, arg2) => {
		console.log('awesome_action_sync2', arg1, arg2);
	},
	10
);
hooks.addAction(
	'awesome_action_sync',
	'namespace2',
	(arg1, arg2) => {
		console.log('awesome_action_sync3', arg1, arg2);
	},
	10
);

hooks.doActionSync('awesome_action_sync', 10, 20);
```

The result will be:

```shell
awesome_action_sync1 10 20
awesome_action_sync2 10 20
awesome_action_sync3 10 20
```

---

#### Example 4

```javascript
var hooks = HassaniumHooks.createHooks();

/**
 * Synchronous Filters
 */
hooks.addFilter(
	'awesome_filter_sync',
	'namespace2',
	(content, arg1, arg2) => {
		return content + arg1 + arg2;
	},
	10
);
hooks.addFilter(
	'awesome_filter_sync',
	'namespace2',
	(content, arg1, arg2) => {
		return content + arg1 + arg2;
	},
	10
);
hooks.addFilter(
	'awesome_filter_sync',
	'namespace2',
	(content, arg1, arg2) => {
		return content + arg1 + arg2;
	},
	10
);

console.log(hooks.applyFiltersSync('awesome_filter_sync', 5, 1, 2));
```

The result will be:

```shell
14
```

---

## API Usage

-   `createHooks()`
-   `addAction( 'hookName', 'namespace', callback, priority )`
-   `addFilter( 'hookName', 'namespace', callback, priority )`
-   `removeAction( 'hookName', 'namespace' )`
-   `removeFilter( 'hookName', 'namespace' )`
-   `removeAllActions( 'hookName' )`
-   `removeAllFilters( 'hookName' )`
-   `doAction( 'hookName', arg1, arg2, moreArgs, finalArg )`
-   `doActionSync( 'hookName', arg1, arg2, moreArgs, finalArg )`
-   `applyFilters( 'hookName', content, arg1, arg2, moreArgs, finalArg )`
-   `applyFiltersSync( 'hookName', content, arg1, arg2, moreArgs, finalArg )`
-   `doingAction( 'hookName' )`
-   `doingFilter( 'hookName' )`
-   `didAction( 'hookName' )`
-   `didFilter( 'hookName' )`
-   `hasAction( 'hookName' )`
-   `hasFilter( 'hookName' )`
-   `actions`
-   `filters`

### Events on action/filter add or remove

Whenever an action or filter is added or removed, a matching `hookAdded` or `hookRemoved` action is triggered.

-   `hookAdded` action is triggered when `addFilter()` or `addAction()` method is called, passing values for `hookName`, `functionName`, `callback` and `priority`.
-   `hookRemoved` action is triggered when `removeFilter()` or `removeAction()` method is called, passing values for `hookName` and `functionName`.

### The `all` hook

In non-minified builds developers can register a filter or action that will be called on _all_ hooks, for example: `addAction( 'all', 'namespace', callbackFunction );`. Useful for debugging, the code supporting the `all` hook is stripped from the production code for performance reasons.
