import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../API/axios';
import { MoneyFormat } from '../components';

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);

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

    // Change quantity
    const incrementQuantity = (item) => {
        const newCartProduct = cartProduct.map(product => {
            if (product.product_id === item.product_id) {
                axios.post('/cart/add', { product_id: item.product_id, quantity: 1 });
                return { ...product, cartQuantity: product.cartQuantity + 1 };
            }
            return product;
        });
        setCartProduct(newCartProduct);
    };

    const decrementQuantity = (item) => {
        const newCartProduct = cartProduct.map(product => {
            if (product.product_id === item.product_id) {
                const newQuantity = product.cartQuantity - 1;
                axios.post('/cart/add', { product_id: item.product_id, quantity: -1 })
                    .then(() => {
                        if (newQuantity <= 0) {
                            // Remove item from the cart on the server and refetch the cart data
                            fetchData();
                        }
                    })
                    .catch(error => console.error('Error updating product quantity:', error));
                return { ...product, cartQuantity: newQuantity };
            }
            return product;
        }).filter(product => product.cartQuantity > 0); // Filter out products with quantity zero
        setCartProduct(newCartProduct);
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return cartProduct.reduce((total, product) => {
            return total + (product.price * product.cartQuantity);
        }, 0);
    };

    const renderItem = ({ item }) => (
        <View key={item.product_id} style={styles.contentItem}>
            <Image style={styles.itemImg} source={{ uri: item.thumbnail }} />
            <View style={styles.itemInfo}>
                <View style={styles.priceInfo}>
                    <Text style={GlobalStyles.h5}>{item.title}</Text>
                    <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}><MoneyFormat value={item.price} isShowing={true}/></Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.quantityInput}
                        value={String(item.cartQuantity)}
                        editable={false}
                    />
                    <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
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
                <Text style={styles.titleText}>Cart</Text>
            </View>
            <FlatList
                style={styles.container}
                data={cartProduct}
                renderItem={renderItem}
                keyExtractor={(item) => item.product_id.toString()}
            />
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                        <Text style={[GlobalStyles.basicText]}>Total Price: </Text>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}><MoneyFormat value={calculateTotalPrice()} isShowing={true}/></Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Checkout")} style={[styles.checkoutBtn]}>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.whitePrimary }]}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 20
    },
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: width,
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
        width: 90,
        height: 90
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
        height: 90,
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
    }
});
