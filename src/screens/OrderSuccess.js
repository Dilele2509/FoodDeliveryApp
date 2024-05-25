import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FillButton } from '../components';

const OrderSuccess = ({navigation}) => {
    return (
        <View style={[styles.container, GlobalStyles.heighFullScreen, GlobalStyles.centerScreen]}>
            <MaterialCommunityIcons name="basket-check" size={100} color={primaryColor.darkPrimary} />
            <Text style={[GlobalStyles.h3, {color: primaryColor.organPrimary}]}>Order Success</Text>

            <View style={[{marginTop: 30}]}>
                <FillButton onPress={()=>navigation.navigate("Home")} text="Continue Shopping" color={primaryColor.whitePrimary} backgroundColor={primaryColor.brownPrimary}/>
                <TouchableOpacity onPress={()=>{navigation.navigate("Orders")}} style={[GlobalStyles.mt15, GlobalStyles.centerScreen]}>
                    <Text style={[{color: primaryColor.brownPrimary, fontWeight: "500"}]}>Check my order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default OrderSuccess

const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor.creamPrimary,
    }
})