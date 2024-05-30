import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { AntDesign } from '@expo/vector-icons';
import axios from "../API/axios";
import { AddCartBox, CartView } from "../components";

const { width } = Dimensions.get('window');

function ProductScreen({ route, navigation }) {
    const { id } = route.params;
    const [productInfo, setProductInfo] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const fetchData = useCallback(() => {
        axios.post('/product/id', { product_id: id })
            .then((response) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProductInfo(response.data[0]);
                } else {
                    console.error('API response does not contain an array or is empty:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        axios.get('/cart')
            .then((response) => {
                setCartCount(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const handleAddToCart = () => {
        axios.post('/cart/add', { product_id: productInfo.product_id, quantity: quantity })
            .then(() => {
                fetchData(); // Fetch updated cart data to update cartCount
                setIsOpen(false);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!productInfo) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 10, height: "auto", backgroundColor: primaryColor.creamPrimary }}>
            <View style={{ flex: 3 }}>
                <Image style={styles.prodImg} source={{ uri: productInfo.thumbnail }} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <AntDesign name="arrowleft" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={[GlobalStyles.padScreen20, { flex: 1.5 }]}>
                <Text style={GlobalStyles.h2}>{productInfo.title}</Text>
                <Text style={GlobalStyles.basicText}>{productInfo.description}</Text>
                <Text style={[GlobalStyles.basicText, styles.description]}>Quantity Sold: {productInfo.sold}</Text>
                <Text style={GlobalStyles.basicText}>In Stock: {productInfo.quantity}</Text>
                <View style={styles.desContainer}>
                    <View>
                        <Text style={styles.price}>{productInfo.price} VND</Text>
                    </View>
                    <View style={styles.addBtn}>
                        <TouchableOpacity onPress={() => setIsOpen(true)}>
                            <AntDesign name="plussquare" size={28} color={primaryColor.organPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[{ flex: 2 }, GlobalStyles.padScreen20]}>
                <View style={[styles.fbArea, { paddingBottom: 20 }]}>
                    <Text style={GlobalStyles.h3}>Feedbacks</Text>
                </View>
                <FlatList
                    data={productInfo.feedbacks || []}
                    renderItem={({ item }) => (
                        <View key={item.id} style={styles.recentItem}>
                            <Image style={styles.recentImg} source={{ uri: item.itemURI }} />
                            <View style={[GlobalStyles.pad10, styles.recentContent]}>
                                <Text style={GlobalStyles.h5}>{item.name}</Text>
                                <Text style={styles.discountText}>{item.discount}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <SafeAreaView>
                {isOpen && (
                    <AddCartBox 
                        handleAddToCart={handleAddToCart}
                        quantity={quantity}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                        setIsOpen={setIsOpen}
                        item={productInfo}
                    />
                )}
                {cartCount > 0 && <CartView cartCount={cartCount} navigation={navigation} style={styles.cartView} />}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    prodImg: {
        width: width,
        height: 320,
        resizeMode: "cover"
    },
    description: {
        marginTop: 10,
    },
    desContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15
    },
    backBtn: {
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        textAlign: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: "15%",
        left: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        color: primaryColor.organPrimary
    },
    fbArea: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: primaryColor.organPrimary
    },
    recentItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    recentImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    recentContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    discountText: {
        color: 'red',
    },
    cartView: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

export default ProductScreen;
