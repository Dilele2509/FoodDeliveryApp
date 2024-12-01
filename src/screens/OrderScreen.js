import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../API/axios';
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { Footer, MoneyFormat } from '../components';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const OrderScreen = (props) => {
  const { navigation } = props;
  const [orderList, setOrderList] = useState([]);
  const [tabHeader, setTabHeader] = useState([
    {
      title: "Now",
      isSelected: true,
    },
    {
      title: "History",
      isSelected: false,
    },
  ]);

  const handleTabPress = (index) => {
    setTabHeader(tabHeader.map((tab, i) => ({
      ...tab,
      isSelected: i === index
    })));
  };

  const fetchData = useCallback(() => {
    axios.get('/order/id')
      .then((response) => {
        //console.log(response.data);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error('API response does not contain an array:', error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const renderOrderItem = ({ item }) => {
    let statusLabel = '';
    let statusColor = 'black';
  
    if (item.status === 1) {
      statusLabel = 'Pending';
      statusColor = primaryColor.brownPrimary;
    } else if (item.status === 2) {
      statusLabel = 'Shipping';
      statusColor = primaryColor.organPrimary;
    } else if (item.status === 3) {
      statusLabel = 'Completed';
      statusColor = primaryColor.darkPrimary;
    } else if (item.status === 0) {
      statusLabel = 'Canceled';
      statusColor = 'red';
    }
  
    return (
      <View style={{marginBottom: 20}}>
        <Text>{item.order_date}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail", {order_id: item.order_id})} key={item.order_id} style={styles.orderItem}>
          <Text>{item.order_id}</Text>
          <Text style={{ color: statusColor }}>{statusLabel}</Text>
          <Text><MoneyFormat value={item.total} isShowing={true}/></Text>
        </TouchableOpacity>
      </View>
    );
  };  


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryColor.creamPrimary }]}>
      <View style={styles.container}>
        <View style={[GlobalStyles.flexRow, styles.headerContainer]}>
          {tabHeader.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => handleTabPress(index)} style={[styles.headerItem, tab.isSelected && styles.isChoose]}>
              <Text style={[GlobalStyles.h5, { color: tab.isSelected ? primaryColor.organPrimary : primaryColor.blackPrimary }]}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contentContainer}>
          {tabHeader[0].isSelected ? (
            // tab "Now" content
            orderList.length === 0 ? (
              <View style={[styles.orderNoti]}>
                <MaterialCommunityIcons style={[]} name="clipboard-list-outline" size={90} color={primaryColor.organPrimary} />
                <Text style={[styles.orderNotiText]}>No orders have been placed yet</Text>
              </View>
            ) : (
              <FlatList
                data={orderList.filter(item => item.status === 1 || item.status === 2)}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.order_id.toString()}
              />
            )
          ) : (
            orderList.length === 0 ? (
              <View style={[styles.orderNoti]}>
                <MaterialCommunityIcons style={[]} name="clipboard-list-outline" size={90} color={primaryColor.organPrimary} />
                <Text style={[styles.orderNotiText]}>No orders have been placed yet</Text>
              </View>
            ) : (
              <FlatList
                data={orderList.filter(item => item.status === 0 || item.status === 3)}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.order_id.toString()}
              />
            )
          )}
        </View>
      </View>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );

};

export default OrderScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    justifyContent: 'space-around',
  },
  headerItem: {
    flex: 1,
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: 'center',
  },
  isChoose: {
    color: primaryColor.organPrimary,
    borderBottomColor: primaryColor.organPrimary,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 60, // Ensure space for the Footer
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
  orderItem: {
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: primaryColor.whitePrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: primaryColor.blackPrimary,
    marginTop: 10
  }
});
