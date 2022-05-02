import React,{useEffect} from 'react'
import { View } from 'react-native'

function Splash(props) {

    useEffect(()=>{
        console.log('comes to Splash and props is',props)
        props.navigation.navigate('Login')
    },[])

    return(
        <View/>
    )
}

export default Splash