import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { colors } from '../../config/colors';
import { screenWidth } from '../../config/globalStyles';

function InputBox(props) {
    const {
        placeHolder='',
        margin=28,
        style={},
        secureTextEntry=false,
        onChangeText=()=>{},
        onSubmitEditing=()=>{},
        value='',
        errorText=''
    } = props;
    return(
        <View style={style}>
        <TextInput
        // editable={false}
        placeholder={placeHolder}
        placeholderTextColor={colors.placeholderGray}
        secureTextEntry={secureTextEntry}
        style={[styles.box,{width:screenWidth-margin*2}]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}/>
        {errorText?<Text style={styles.errorText}>{errorText}</Text>:null}
        </View>  
    )
}

const styles = StyleSheet.create({
    box:{
        height:50,
        paddingHorizontal:18,
        alignItems:'center',
        borderRadius:8,
        borderColor:colors.themeGray,
        borderWidth:StyleSheet.hairlineWidth,
        fontSize:16
    },
    errorText:{
        color:'red',
        paddingHorizontal:18,
        fontSize:10,
        marginTop:4
    }
})

export default InputBox