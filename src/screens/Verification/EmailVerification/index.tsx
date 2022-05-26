import React, { useState, useRef } from 'react';
import { View,Text, Image, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';
import { styles } from './style';
import Button from '../../../components/Button/index';
import TopHeader from '../../../components/TopHeader';
import Email from '../../../assets/images/Change_email.png';


function VerificationMail(props) {
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' })
    const { navigation,route } = props
    const { itemId, otherParam } = route.params;
    console.log("Item id is",itemId)

    const inputOne = useRef()
    const inputTwo = useRef()
    const inputThree = useRef()
    const inputFour = useRef()
    const inputFive = useRef()
    const inputSix = useRef()

    const code = Object.values(otp).toString()
    console.log("Code is", code.replace(/,/g, ""))

    async function confirmSignUp() {
        try {
            navigation.navigate('App')
            // const user = await Auth.confirmSignUp("deepak@amci.net.in", code.replace(/,/g, ""));
            // console.log("confirm Sign Up", JSON.stringify(user))
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }


    return (<View style={{ marginTop: 50, flex: 1 }}>
        <TopHeader title="Email verification" />
        <View style={styles.verifyContainer}>
            <Image source={Email} />
            <Text numberOfLines={5} style={{ width: 265, height: 100, top: 15, fontSize: 18, textAlign: 'center' }}>
                Enter the verification code you received on ri*@lip**.com on this mail id
            </Text>
            <View style={{ width: 300, marginHorizontal: 20, marginBottom: 20, justifyContent: "space-between", flexDirection: 'row', paddingRight: 2 }}>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad' maxLength={1}
                        ref={inputOne}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 1: text })
                            text && inputTwo.current.focus()
                        }} />
                </View>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad'
                        maxLength={1}
                        ref={inputTwo}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 2: text })
                            text ? inputThree.current.focus() : inputOne.current.focus()
                        }} />
                </View>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad'
                        maxLength={1}
                        ref={inputThree}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 3: text })
                            text ? inputFour.current.focus() : inputTwo.current.focus()
                        }} />
                </View>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad'
                        maxLength={1}
                        ref={inputFour}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 4: text })
                            text ? inputFive.current.focus() : inputThree.current.focus()
                        }} />
                </View>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad'
                        maxLength={1}
                        ref={inputFive}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 5: text })
                            text ? inputSix.current.focus() : inputFour.current.focus()
                        }} />
                </View>
                <View style={{ borderRadius: 5, borderColor: 'grey', borderWidth: 0.5 }}>
                    <TextInput keyboardType='number-pad'
                        maxLength={1}
                        ref={inputSix}
                        style={{ fontSize: 20, color: 'black', padding: 0, textAlign: "center", paddingHorizontal: 15, paddingVertical: 10 }}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 6: text })
                            text ? inputSix.current.focus() : inputFive.current.focus()
                        }} />
                </View>
            </View>
            <Button
                style={{ marginTop: 20, alignSelf: 'center', backgroundColor: 'red' }}
                text="Verify"
                variant="primary"
                onPress={confirmSignUp}
            />
        </View>
    </View>
    )
}

export default VerificationMail