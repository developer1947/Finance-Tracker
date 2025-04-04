import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/redux/reducers/index';
import Appnavigator from './src/navigation/Appnavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const store = configureStore({ reducer: rootReducer });
export default App = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Appnavigator/>
            </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    )
}