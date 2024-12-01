import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Alert, ScrollView, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios, { axiosPrivate } from '../API/axios';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { FillButton, MoneyFormat } from '../components';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ navigation, route }) => {
    const { order_id } = route.params
    const [productList, setProductList] = useState([]);
    const [orderDetailInfo, setOrderDetailInfo] = useState([]);

    const fetchOrderProducts = async (list) => {
        try {
            const products = await Promise.all(list.map(async (item) => {
                const productResponse = await axios.post('product/recent', { product_id: item.product_id });
                return { ...productResponse.data[0], total: item.total, boughtQuantity: item.quantity }; // Include cart quantity in the product data
            }));
            //console.log(products);
            setProductList(products);
        } catch (error) {
            console.error('Error fetching recent product data:', error);
        }
    };

    const fetchData = useCallback(() => {
        axios.post('/order/info', { order_id: order_id })
            .then((response) => {
                //console.log(response.data.order_details);
                setOrderDetailInfo(response.data)
                fetchOrderProducts(response.data.order_details)
            })
            .catch((error) => {
                console.error('Error fetching order detail data:', error);
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item }) => (
        <View style={styles.contentItem}>
            <Image style={[styles.itemImg]} source={{ uri: item.thumbnail }} />
            <View style={styles.itemInfo}>
                <View style={styles.priceInfo}>
                    <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                    <Text style={[GlobalStyles.basicText]}><MoneyFormat value={item.price} isShowing={true}/></Text>
                    <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}><MoneyFormat value={item.total} isShowing={true}/></Text>
                </View>
                <View>
                    <Text>x{item.boughtQuantity}</Text>
                </View>
            </View>
        </View>
    );

    const handleCancel = () => {
        // Show confirmation dialog
        Alert.alert(
            'Confirm',
            'Are you sure you want to cancel this order?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        // User confirmed, proceed with cancellation
                        axios.put("/order/cancel", { order_id: orderDetailInfo.order_id })
                            .then((response) => {
                                console.log(response.data);
                                // Fetch data again after cancellation
                                fetchData();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryColor.creamPrimary }]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.organPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Order Detail</Text>
            </View>
            {/* Order status */}
            <View style={[styles.orderStatus]}>
                <View style={{ alignItems: "center" }}>
                    <MaterialIcons style={{ marginBottom: 5 }} name="pending-actions" size={18} color={primaryColor.greenPrimary} />
                    <Text style={{ color: primaryColor.greenPrimary }}>Pending</Text>
                </View>

                {orderDetailInfo.status !== 0 ? (
                    orderDetailInfo.status === 3 ? (
                        <>
                            {/* complete status */}
                            <Text style={{ color: primaryColor.greenPrimary, fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <FontAwesome5 style={{ marginBottom: 5 }} name="shipping-fast" size={18} color={primaryColor.greenPrimary} />
                                <Text style={{ color: primaryColor.greenPrimary }}>Shipping</Text>
                            </View>

                            <Text style={{ color: primaryColor.greenPrimary, fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons style={{ marginBottom: 5 }} name="done-all" size={18} color={primaryColor.greenPrimary} />
                                <Text style={{ color: primaryColor.greenPrimary }}>Completed</Text>
                            </View>
                        </>
                    ) : orderDetailInfo.status === 2 ? (
                        <>
                            {/* shipping status */}
                            <Text style={{ color: primaryColor.greenPrimary, fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <FontAwesome5 style={{ marginBottom: 5 }} name="shipping-fast" size={18} color={primaryColor.greenPrimary} />
                                <Text style={{ color: primaryColor.greenPrimary }}>Shipping</Text>
                            </View>

                            <Text style={{ color: "#999", fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons style={{ marginBottom: 5 }} name="done-all" size={18} color="#999" />
                                <Text style={{ color: "#999" }}>Completed</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            {/* pending status */}
                            <Text style={{ color: "#999", fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <FontAwesome5 style={{ marginBottom: 5 }} name="shipping-fast" size={18} color={"#999"} />
                                <Text style={{ color: "#999" }}>Shipping</Text>
                            </View>

                            <Text style={{ color: "#999", fontWeight: "600" }}> ________ </Text>
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons style={{ marginBottom: 5 }} name="done-all" size={18} color="#999" />
                                <Text style={{ color: "#999" }}>Completed</Text>
                            </View>
                        </>
                    )
                ) : (
                    <>
                        {/* Cancel status */}
                        <Text style={{ color: primaryColor.redPrimary, fontWeight: "600" }}> _____________ </Text>
                        <View style={{ alignItems: "center" }}>
                            <MaterialIcons style={{ marginBottom: 5 }} name="cancel" size={18} color={primaryColor.redPrimary} />
                            <Text style={{ color: primaryColor.redPrimary }}>Cancel</Text>
                        </View>
                    </>
                )}
            </View>

            {/* Delivery address */}
            <View style={styles.deliInfo}>
                <View style={styles.deliItem}>
                    <Entypo name="location" size={24} color={primaryColor.organPrimary} />
                    <View style={styles.deliContainer}>
                        <Text style={[GlobalStyles.h5]}>Delivery Address</Text>
                        <View style={styles.deliDetail}>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>{orderDetailInfo.receiver}</Text>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>{orderDetailInfo.receiver_phone}</Text>
                            <Text style={[GlobalStyles.basicText, { color: "#333" }]}>{orderDetailInfo.delivery_address}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Container content */}
            <FlatList
                data={productList}
                style={[styles.container]}
                renderItem={renderItem}
                keyExtractor={(item) => item.product_id.toString()}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            {/* Detail for bill */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                style={[styles.container, { maxHeight: 300 }]}>
                <View>
                    {/* OrderDate */}
                    <View style={{ marginBottom: 20 }}>
                        <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: -20 }]}>
                            <FontAwesome6 name="calendar" size={28} color={primaryColor.organPrimary} />
                            <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary, marginLeft: 10 }]}>Order Date: </Text>
                            <Text style={[GlobalStyles.basicText]}>{orderDetailInfo.order_date}</Text>
                        </View>
                    </View>


                    {/* Notes */}
                    <View>
                        <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: -20 }]}>
                            <MaterialIcons name="sticky-note-2" size={32} color={primaryColor.organPrimary} />
                            <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary, marginLeft: 10 }]}>Note: </Text>
                            <Text style={[GlobalStyles.basicText]}>{orderDetailInfo.note == '' ? "No Notes" : orderDetailInfo.note}</Text>
                        </View>
                    </View>

                    {/* Payment method */}
                    <View style={{ marginTop: 25 }}>
                        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                            <FontAwesome5 name="money-check-alt" size={24} color={primaryColor.organPrimary} />
                            <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary, marginLeft: 10 }]}>Payment Method: </Text>
                            <Text style={[GlobalStyles.basicText]}>{orderDetailInfo.payment_method}</Text>
                        </View>
                    </View>

                    {/* Invoice Details */}
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
                                <Text style={[styles.detailText, { textAlign: 'right' }]}><MoneyFormat value={orderDetailInfo.total} isShowing={true}/></Text>
                                <Text style={[styles.detailText, { textAlign: 'right' }]}><MoneyFormat value={1600} isShowing={true}/></Text>
                                <Text style={[styles.detailText, { textAlign: 'right' }]}><MoneyFormat value={-1600} isShowing={true}/></Text>
                                <Text style={[styles.detailText, GlobalStyles.h5, { color: primaryColor.organPrimary, textAlign: 'right' }]}><MoneyFormat value={orderDetailInfo.total} isShowing={true}/></Text>
                            </View>
                        </View>
                    </View>
                    {orderDetailInfo.status !== 0 &&
                        <>
                            <View style={{ marginTop: 20, alignItems: "center" }}>
                                <FillButton onPress={handleCancel} backgroundColor={primaryColor.redPrimary} color={primaryColor.whitePrimary} text="Cancel Order" />
                            </View>
                        </>
                    }
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                        <Text style={[GlobalStyles.basicText]}>Total Price: </Text>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.organPrimary }]}><MoneyFormat value={orderDetailInfo.total} isShowing={true}/></Text>
                    </View>
                    <TouchableOpacity style={[styles.checkoutBtn]}>
                        <Text style={[GlobalStyles.h5, { color: primaryColor.whitePrimary }]}>Received</Text>
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
        alignItems: "center"
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
        minHeight: 50,
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
        marginTop: 10,
        backgroundColor: primaryColor.whitePrimary
    },
    detailText: {
        marginBottom: 8,
    },
    orderStatus: {
        width: "100%",
        height: 80,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"

    }
});
