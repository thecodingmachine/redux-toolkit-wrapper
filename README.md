<div align="center">
    <img src="logo.png" alt="Logo" width="100%">
</div>

![Redux Toolkit Wrapper License](https://img.shields.io/github/license/thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper Version](https://flat.badgen.net/npm/v/@thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper Release Date](https://img.shields.io/github/release-date/thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper Download](https://flat.badgen.net/npm/dt/@thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper Stars](https://img.shields.io/github/stars/thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper Top Language](https://img.shields.io/github/languages/top/thecodingmachine/redux-toolkit-wrapper)
![Redux Toolkit Wrapper TypeScript](https://badgen.net/npm/types/tslib)

# TheCodingMachine Redux-toolkit wrapper 

This project is a [Redux-toolkit](https://redux-toolkit.js.org/) wrapper used to write less code regarding classic CRUD operations.  
It's mainly used inside this RN Boilerplate : [`thecodingmachine/react-native-boilerplate`](https://github.com/thecodingmachine/react-native-boilerplate) 

## Installation

```
yarn add @thecodingmachine/redux-toolkit-wrapper
```

## Usage
```javascript
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchOneUserService from '@/Services/User/FetchOne'

export default {
  initialState: buildAsyncState('fetchOne'),
  action: buildAsyncActions('user/fetchOne', fetchOneUserService),
  reducers: buildAsyncReducers({
    errorKey: 'fetchOne.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'fetchOne.loading',
  }),
}
```
More information on [the dedicated documentation](https://thecodingmachine.github.io/react-native-boilerplate/docs/AddAStore#redux-toolkit-wrapper)

## License

This project is released under the [MIT License](LICENSE).

## About us

[TheCodingMachine](https://www.thecodingmachine.com/) is a web and mobile agency based in Paris and Lyon, France. We are [constantly looking for new developers and team leaders](https://www.thecodingmachine.com/nous-rejoindre/) and we love [working with freelancers](https://coders.thecodingmachine.com/). You'll find [an overview of all our open source projects on our website](https://thecodingmachine.io/open-source) and on [Github](https://github.com/thecodingmachine).
