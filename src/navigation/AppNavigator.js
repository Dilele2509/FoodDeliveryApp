// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FooterProvider } from '../provider/FooterProvider';// Import the provider
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp/SignUp';
import SignUpInfo from '../screens/SignUp/SignUpInfo';
import ForgotPass from '../screens/ForgotPass';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from "../screens/HomeScreen";
import ViewAllScreen from "../screens/ViewAllScreen";
import ProductScreen from "../screens/ProductScreen";
import OrderScreen from "../screens/OrderScreen";
import ChatBoxScreen from "../screens/ChatBoxScreen";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccess from '../screens/OrderSuccess';
import ResetPass from '../screens/ResetPass';
import OrderDetail from '../screens/OrderDetail';
import EditUserInfo from '../screens/EditUserInfo';
import EditSecurity from '../screens/EditSecurity';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <FooterProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={SignUp} />
                    <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
                    <Stack.Screen name="forgotPass" component={ForgotPass} />
                    <Stack.Screen name="OTPScreen" component={OTPScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="ViewAll" component={ViewAllScreen} />
                    <Stack.Screen name="Product" component={ProductScreen} />
                    <Stack.Screen name="Orders" component={OrderScreen} options={{ gestureEnabled: false }} />
                    <Stack.Screen name="ChatBox" component={ChatBoxScreen} />
                    <Stack.Screen name="Account" component={AccountScreen} options={{ gestureEnabled: false }} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="Checkout" component={CheckoutScreen} />
                    <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
                    <Stack.Screen name="ResetPass" component={ResetPass} />
                    <Stack.Screen name="OrderDetail" component={OrderDetail} />
                    <Stack.Screen name="EditUser" component={EditUserInfo} />
                    <Stack.Screen name="EditSecurity" component={EditSecurity} />
                    <Stack.Screen name="Search" component={SearchScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </FooterProvider>
    );
}

export default AppNavigator;
