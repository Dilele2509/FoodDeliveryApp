import React, { useState, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Categories, Header, Recommend, SliderShow, TopRatedRes, MenuBar, Footer, CartView, CartNoti } from "../components";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import axios from "../API/axios";
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    const topRateList = [
        {
            id: 1,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 2,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 3,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
        {
            id: 4,
            name: "Gà rán Popeye's",
            itemURI: 'https://drive.fife.usercontent.google.com/u/0/d/16wuSJ_suOk3NdWrykcftGL28wdX3tAjx=w200-h190-p-k-rw-v1-nu-iv1',
            discount: "Discount 40K"
        },
    ];

    const [products, setProducts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [recentProduct, setRecentProduct] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const fetchRecentProducts = async (recentList) => {
        try {
            const productList = await Promise.all(recentList.map(async (item) => {
                const productResponse = await axios.post('product/recent', { product_id: item.product_id });
                return productResponse.data[0];
            }));
            setRecentProduct(productList);
        } catch (error) {
            console.error('Error fetching recent product data:', error);
        }
    };

    const fetchData = useCallback(() => {
        axios.get('/product')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        axios.get(`/user/id`)
            .then((response) => {
                const userData = response.data.user[0];
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        axios.get(`/user/recent`)
            .then((response) => {
                fetchRecentProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recent data:', error);
            });

        axios.get('/cart')
            .then((response)=>{
                //console.log(response.data.length, response.data);
                setCartCount(response.data.length)
            })
            .catch((error)=>{
                console.log('Error fetching recent data: ', error);
            })
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'slider':
                return <SliderShow />;
            case 'categories':
                return <Categories navigation={navigation} productAllList={products} />;
            case 'recommend':
                return (
                    <>
                        {recentProduct.length > 0 && (
                            <Recommend
                                listTitle="Recently Viewed"
                                itemList={recentProduct}
                                onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recently Viewed', prevPage: 'Home', allList: recentProduct })}
                                navigation={navigation}
                            />
                        )}
                    </>
                );
            case 'recommend2':
                return (
                    <Recommend
                        listTitle="Recommend"
                        itemList={products}
                        onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recommended', prevPage: 'Home', allList: products })}
                    />
                );
            case 'topRatedRes':
                return (
                    <TopRatedRes
                        listTitle="Top Rating"
                        itemList={topRateList}
                        onPress={() => navigation.navigate("ViewAll", { titlePage: 'Top Rating Restaurant', prevPage: 'Home', allList: products })}
                        navigation={navigation}
                    />
                );
            case 'menuBar':
                return <MenuBar listTitle="Menu" itemList={products} navigation={navigation} />;
            default:
                return null;
        }
    };

    const sections = [
        { id: 'slider', type: 'slider' },
        { id: 'categories', type: 'categories' },
        { id: 'recommend', type: 'recommend' },
        { id: 'recommend2', type: 'recommend2' },
        { id: 'topRatedRes', type: 'topRatedRes' },
        { id: 'menuBar', type: 'menuBar' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header userName={userInfo.full_name} />
            <FlatList
                style={[{ marginBottom: 35 }]}
                data={sections}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatList}
            />
            {cartCount > 0 && <CartNoti cartCount={cartCount} navigation={navigation}/>}
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: primaryColor.creamPrimary,
    },
    flatList: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default HomeScreen;
