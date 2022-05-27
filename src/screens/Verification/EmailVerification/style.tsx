import {StyleSheet} from 'react-native';
import { colors } from '../../../config/colors';
import { fontSizes } from '../../../config/globalStyles';

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    upperBody:{
        flex:0.7,
        justifyContent:'center',
        alignItems:'center'
    },
    mainBody:{
        position:'absolute',
        bottom:0,
        backgroundColor:colors.themeLightGray,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,

        shadowColor: 'gray',
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5 , 
    },

    headerLabel:{
        position:'absolute',
        top:14,
        left:24
    },
    headerLabelText:{
        fontSize:fontSizes.huge,
        color:colors.themeDarkBlackText,
        marginBottom:24
    },
    headerLabelTextSignUp:{
        fontSize:fontSizes.huge,
        color:colors.themeDarkBlackText,
        marginBottom:18
    },
    socialIcon:{
        height:52,
        width:52,
        borderRadius:52,
        backgroundColor:'white',

        shadowColor: colors.themeShadow,
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5 , 
    },
    verifyContainer:{
        marginTop:30,
        flex:1,
        backgroundColor:'white',
        alignItems: 'center',
    }

})