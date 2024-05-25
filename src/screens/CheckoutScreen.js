import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../API/axios';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { InputBox } from '../components';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [note, setNote] = useState('');

    const fetchCartProducts = async (list) => {
        try {
            const productList = await Promise.all(list.map(async (item) => {
                const productResponse = await axios.post('product/recent', { product_id: item.product_id });
                return { ...productResponse.data[0], cartQuantity: item.quantity }; // Include cart quantity in the product data
            }));
            setCartProduct(productList);
        } catch (error) {
            console.error('Error fetching recent product data:', error);
        }
    };

    const fetchData = useCallback(() => {
        axios.get('/cart')
            .then((response) => {
                const validCartList = response.data.filter(item => Object.keys(item).length > 0);
                setCartList(validCartList);
                fetchCartProducts(validCartList);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const calculateTotalPrice = (cartProduct) => {
        return cartProduct.reduce((total, item) => total + item.price * item.cartQuantity, 0);
    };

    const renderItem = ({ item }) => (
        <View style={styles.contentItem}>
            <Image style={[styles.itemImg]} source={{ uri: item.thumbnail }} />
            <View style={styles.itemInfo}>
                <View style={styles.priceInfo}>
                    <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                    <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}>{item.price}</Text>
                </View>
                <View>
                    <Text>x{item.cartQuantity}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryColor.creamPrimary }]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.organPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Checkout</Text>
            </View>
            {/* Delivery address */}
            <TouchableOpacity style={styles.deliInfo}>
                <View style={styles.deliItem}>
                    <Entypo name="location" size={24} color={primaryColor.organPrimary} />
                    <View style={styles.deliContainer}>
                        <Text style={[GlobalStyles.h5]}>Delivery Address</Text>
                        <View style={styles.deliDetail}>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>Vy Le</Text>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>0966480829</Text>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>36 TVT, Hiep Phu, Q9, TPHCM</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Container content */}
            <FlatList
                data={cartProduct}
                style={[styles.container]}
                renderItem={renderItem}
                keyExtractor={(item) => item.product_id.toString()}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            {/* Detail for bill */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                style={[styles.container, { borderTopWidth: 1, borderTopColor: "#333", borderRadius: 10, maxHeight: 350 }]}>
                <View>
                    <View>
                        <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: -20 }]}>
                            <FontAwesome5 name="money-check-alt" size={24} color={primaryColor.organPrimary} />
                            <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary, marginLeft: 10 }]}>Note:</Text>
                        </View>
                        <InputBox
                            value={note}
                            onChangeText={setNote}
                            placeholder={'Enter your notes for us'}>
                            <Text>Payment on Delivery</Text>
                        </InputBox>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: 15 }]}>
                            <FontAwesome5 name="money-check-alt" size={24} color={primaryColor.organPrimary} />
                            <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary, marginLeft: 10 }]}>Payment Method</Text>
                        </View>
                        <TouchableOpacity style={styles.contentItem}>
                            <Text>Payment on Delivery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.payDetail]}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons name="note-text-outline" size={32} color={primaryColor.organPrimary} />
                            <Text style={[{ color: primaryColor.organPrimary, marginLeft: 10 }, GlobalStyles.h5]}>Invoice Details:</Text>
                        </View>
                        <View style={[{ marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }]}>
                            <View>
                                <Text style={[styles.detailText]}>Cost of goods: </Text>
                                <Text style={[styles.detailText]}>Shipping cost: </Text>
                                <Text style={[styles.detailText]}>Shipping discount: </Text>
                                <Text style={[styles.detailText, GlobalStyles.h5]}>Total: </Text>
                            </View>
                            <View>
                                <Text style={[styles.detailText, { textAlign: 'right' }]}>{calculateTotalPrice(cartProduct)}</Text>
                                <Text style={[styles.detailText, { textAlign: 'right' }]}>16000</Text>
                                <Text style={[styles.detailText, { textAlign: 'right' }]}>-16000</Text>
                                <Text style={[styles.detailText, GlobalStyles.h5, { color: primaryColor.organPrimary, textAlign: 'right' }]}>{calculateTotalPrice(cartProduct)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                        <Text style={[GlobalStyles.basicText]}>Total Price: </Text>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}>{calculateTotalPrice(cartProduct)} VND</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("OrderSuccess") }} style={[styles.checkoutBtn]}>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.whitePrimary }]}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CheckoutScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        maxHeight: 300,
        padding: 20,
    },
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: width, // adjust according to padding/margin
        borderBottomColor: primaryColor.organPrimary,
        borderBottomWidth: 1,
        borderRadius: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.organPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999
    },
    isChoose: {
        color: primaryColor.organPrimary,
        borderBottomColor: primaryColor.organPrimary,
    },
    contentItem: {
        marginBottom: 10,
        padding: 15,
        borderColor: primaryColor.brownPrimary,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: primaryColor.whitePrimary,
        flexDirection: "row",
    },
    orderNoti: {
        width: "100%",
        height: 400,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    orderNotiText: {
        fontSize: 21,
        marginTop: 15,
        color: primaryColor.blackPrimary,
        fontWeight: "600"
    },
    footer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
        borderTopColor: primaryColor.blackPrimary,
        borderTopWidth: 1,
    },
    footerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemImg: {
        width: 50,
        height: 50
    },
    itemInfo: {
        flex: 10,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    priceInfo: {
        flex: 5,
        height: 50,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: primaryColor.organPrimary,
        borderRadius: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 30,
    },
    quantityInput: {
        width: 30,
        height: 30,
        borderColor: primaryColor.organPrimary,
        borderWidth: 1,
        textAlign: 'center',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    checkoutBtn: {
        backgroundColor: primaryColor.organPrimary,
        padding: 15,
        borderRadius: 20
    },
    deliInfo: {
        marginTop: 15,
        paddingHorizontal: 20
    },
    deliItem: {
        padding: 15,
        borderColor: primaryColor.brownPrimary,
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    deliContainer: {
        marginLeft: 15,
    },
    payDetail: {
        padding: 15,
        borderColor: primaryColor.blackPrimary,
        borderWidth: 1,
        marginTop: 25,
        backgroundColor: primaryColor.whitePrimary
    },
    detailText: {
        marginBottom: 8,
    }
});