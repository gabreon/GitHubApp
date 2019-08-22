import Reactotron, { asyncStorage, openInEditor, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  const tron = Reactotron
    .configure({ host: scriptHostname })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(asyncStorage())
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}