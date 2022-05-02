import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../../config/colors';

function Button(props) {
    const {variant,
        text='hello',
        style={},
        onPress=()=>{},
        disabled=false} = props;
    return(
        <TouchableOpacity
        disabled={disabled}
        style={[style,variant==='primary'?styles.buttonPrimary:styles.button]}
        onPress={onPress}>
            <Text
            style={{color:variant==='primary'?'white':colors.themeBlackText}}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        height:52,
        width:178,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'white',

        shadowColor: colors.themeShadow,
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3, 
    },
    buttonPrimary:{
        height:52,
        width:178,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:colors.primaryButtonBackground
    }
})

export default Button