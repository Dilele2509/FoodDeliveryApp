import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp'
import ForgotPass from '../screens/ForgotPass'
import OTPScreen from '../screens/OTPScreen'
import HomeScreen from "../screens/HomeScreen";
import ViewAllScreen from "../screens/ViewAllScreen"
import ProductScreen from "../screens/ProductScreen";

const Stack = createNativeStackNavigator();
function AppNavigator() {
    return (  
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions = {{headerShown: false}}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Signup" component={SignUp}/>
                    <Stack.Screen name="forgotPass" component={ForgotPass}/>
                    <Stack.Screen name="OTPScreen" component={OTPScreen}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="ViewAll" component={ViewAllScreen}/>
                    <Stack.Screen name="Product" component={ProductScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppNavigator;

const styles = StyleSheet.create({})