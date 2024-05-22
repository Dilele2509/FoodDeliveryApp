import React, { useRef, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles"

function OTPInput(props) {
  const [isFocus, setIsFocus] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(null);
  const { length, value, disabled, onChange } = props
  const inputRefs = useRef([])

  const onChangeValue = (text, index) => {
    if (value) {
      const newValue = value.map((item, valueIndex) => {
        if (valueIndex === index) {
          return text;
        }
        return item;
      });
      // Update the value state with newValue
      onChange(newValue);
    }
  };


  const handleChange = (text, index) => {
    onChangeValue(text, index)

    if (text.length !== 0 && text.nativeEvent.text !== '') {
      //console.log("this text: ", text.nativeEvent.text);
      return inputRefs.current[index + 1]?.focus()
    }
    return inputRefs.current[index - 1]?.focus()
  }

  const handleBackPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  }

  return (
    <View
      style={[
        GlobalStyles.centerScreen,
      ]}
    >
      <View style={styles.container}>
        {[...Array(length)].map((item, index) => (
          <TextInput
            ref={ref => {
              //check if ref is not already in array and then add it
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref]
              }
            }}
            key={index}
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            keyboardType="decimal-pad"
            testID={`OTPInput-${index}`}
            style={[styles.input, isFocus && focusedIndex === index && styles.focusInput]}
            onFocus={()=>{
              setIsFocus(true);
              setFocusedIndex(index)}}
            onBlur={()=>{
              setIsFocus(false);
              setFocusedIndex(null)
              }}
            onChange={text => handleChange(text, index)}
            onKeyPress={event => handleBackPress(event, index)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    fontSize: 24,
    color: primaryColor.blackPrimary,
    textAlign: "center",
    width: 45,
    height: 55,
    borderRadius: 10,
    borderColor: primaryColor.organPrimary,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: primaryColor.whitePrimary
  },
  focusInput:{
    borderColor: primaryColor.darkPrimary,
  }
})

export default OTPInput