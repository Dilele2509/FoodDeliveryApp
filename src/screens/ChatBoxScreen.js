import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Footer } from '../components'
import ChatScreen from './ChatScreen'
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window');

const ChatBoxScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[GlobalStyles.heighFullScreen,{ backgroundColor: primaryColor.creamPrimary }]}>
      <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={primaryColor.organPrimary} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Hungry Cat AI</Text>
      </View>
      <ChatScreen />
    </SafeAreaView>
  )
}

export default ChatBoxScreen

const styles = StyleSheet.create({
  headerPage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    width: width - 40, // adjust according to padding/margin
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
})
