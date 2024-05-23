import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

export const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure({ name: 'Smart Boi' })
	.useReactNative();
