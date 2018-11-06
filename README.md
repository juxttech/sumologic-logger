# sumologic-logger

> Send your application's logs to a SumoLogic HTTP endpoint

sumologic-logger was made as a replacement for [logs-to-sumologic](https://github.com/tawawa/logs-to-sumologic)
which hasn't had an update in over two years and has a ton of dependency errors. Basically we made this to help clean
up our codebase a little bit (it also has Typescript definitions bundled with it).

## Prerequisites

* Node.js 8.x

## Installation

1. `npm install -g sumologic-logger` or `yarn global add sumologic-logger`

## Usage

```typescript
import { Logger } from 'sumologic-logger';

const logger = new Logger({
  url: 'your sumologic url',
});

logger.info('foo');
logger.warn('foo');
logger.error('foo');
```

## Development

1. `yarn install`
2. `yarn run build`
