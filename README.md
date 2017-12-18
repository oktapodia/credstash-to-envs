# credstash-to-envs

## Prerequisites
 
Because this package will connect to your AWS account through the package `aws-sdk`, you must have the aws credentials already set up.

To set up your AWS configuration:

```
$ pip install awscli
$ aws configure
```

## Install

* With npm
```
npm install --save crestash-to-env
```
* With yarn
```
yarn add crestash-to-env
```

## Configuration template reference

```js
{
  "handlersDir": './handlers', // Dir handler
  "region": 'eu-west-1', // AWS region
  "table": 'credential-store', // DynamoDB table
  "projectName": 'credstash-to-envs', // Project name (accessible in all the handlers)
};
```

## Add Handler

Each handler have to extends the class `AbstractHandler` accessible through `import { AbstractHandler } from 'credstash-to-env';` and must be in the `handlersDir` directory

eg: 

```js
import { AbstractHandler } from 'credstash-to-env';

class ExampleHandler extends AbstractHandler {
  
  /**
   * If the method `option` is declared, you will be able to add some options to `commanderjs`
   */
  option() {
    // boolean declaration, -e is the shortand, --example the long one
    this.program.option('-e, --example', 'Description of the command'); 
  
    // string declaration, you can also set an option with text
    // boolean declaration, -s is the shortand, --exampleString the long one
    this.program.option('-s, --exampleString', 'Description of the command [default]', 'default');

    return this;
  }

  /**
   * This method must be implemented, all the parsing logic will be here.,
   * The argument `data` will receive the data from the previous handler executed and can alterate the response
   * you can access to the boolean value through commanderjs with `this.program.exampleString`
   * 
   * @param data [] Data returned by the previous handler
   * @return data [] Final data handled by this handler
   */
  handle(data) {
    if (this.program.example) {
      const paramPath = this.getPath();
      data[paramPath] = false;
    }

    return data;
  }
  
  /**
   * The getOrder method will sort the handlers by priority (ascendant priority)
   * 
   * default value: 10
   */
  getOrder() {
    return 100;
  }
}

export default ExampleHandler;
```
