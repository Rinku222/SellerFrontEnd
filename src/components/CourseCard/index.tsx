import React from 'react'
import { TouchableOpacity,View,Image, Text, StyleSheet } from 'react-native'
import { colors } from '../../config/colors';

function CourseCard(props) {

    return(
        <View style={styles.recommendedCards}>
            <View style={styles.cardPhoto}>
                <Image
                source={{ uri: 'https://thumbs.dreamstime.com/z/stethoscope-red-heart-medical-concept-stethoscope-red-heart-medical-concept-159774880.jpg' }}
                style={styles.imageRecomended} />
            </View>
            <View style={{paddingHorizontal:4}}>
                <Text style={styles.RecomendedCardTitle}>Program Name Will </Text>

                <View style={styles.mentor}>
                    <Image source={require('../../assets/images/laps.png')} style={{width:22,height:22,borderRadius:11}}/>
                    {/* <IconB name="user" size={28} color='gray' style={{marginLeft:'1%'}} /> */}
                    <Text style={styles.mentorName}>Hugo First</Text>
                </View>

                <View style={styles.cardPrice}>
                    <Text style={{fontSize:14,color:colors.placeholderGray}}> Advance </Text>
                    <Text style={{fontSize:14, fontWeight:'bold'}}> $8000 </Text>
                </View>

                <View style={styles.sessionDetails}>
                    <Text style={{fontSize:14,color:colors.placeholderGray}}> 14 Hr </Text>
                    <Text style={{fontSize:14,color:colors.themeDarkBlackText, fontWeight:'bold'}}> 20 Lessons </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
  recommendedCards: { 
    borderRadius:12,
    shadowColor: '#F1894E33',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
    height: 280,
    width: 200,
    backgroundColor: "#FFFFFF",
    margin: 10
  },
  cardPhoto : {
    height:120,
    margin:5,
    borderRadius:12,
  },
  imageRecomended : {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    height: '100%', 
    borderRadius:12
  },
  cardTitle:{
      fontSize:18,
      padding:15,
  },
  RecomendedCardTitle:{
      color:colors.themeDarkBlackText,
      fontSize:15,
      fontWeight:'bold',
      paddingLeft:10,
      paddingTop:10
  },
  discount:{
      fontSize:25,
      padding:15,
  },
  viewCourse:{
      backgroundColor:'#F3894D',
      width:'40%',
      paddingTop:7,
      paddingBottom:7,
      paddingLeft:'9%',
      borderRadius:6,
      marginLeft:'4%',
      marginTop:20
  },
  checkIcon : {
    position:'absolute',
    top:15,
    right:20
  },
  onGoingCourse:{
    color:'black',
    fontSize:18,
    marginLeft:25
  },
  mentor:{
      height:36,
      marginTop:5,
      padding:5,
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
  },
  mentorName:{
      fontSize:14,
      color:colors.placeholderGray,
      // fontWeight:'bold',
      opacity:1,
      marginLeft:8
  },
  cardPrice:{
      height:35,
      flexDirection:'row',
      padding:5,
      justifyContent:'space-between'
  },
  sessionDetails:{
      height:35,
      flexDirection:'row',
      padding:3,
  },
})

export default CourseCard