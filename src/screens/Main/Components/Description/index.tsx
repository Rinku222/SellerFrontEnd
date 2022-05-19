import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {colors} from '../../../../config/colors';
import UserImage from '../../../../assets/images/laps.png';
import TwitterImage from '../../../../assets/images/twitter.png';
import FacebookImage from '../../../../assets/images/facebook.png';
import LinkedInImage from '../../../../assets/images/linkedIn.png';

const ImagesData = [TwitterImage, FacebookImage, LinkedInImage];

function DescriptionText() {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionHeader}>About the Course</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi, optio voluptas dolore
        dolor laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam
        culpa accusamus aliquid exercitationem. Praesentium voluptate repudiandae illum corrupti a
        tempore molestiae culpa ab quibusdam.
      </Text>
    </View>
  );
}

function Description() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <DescriptionText />
      <Text style={styles.mentorText}>Mentor</Text>
      <View style={styles.imageContainer}>
        <View>
          <Image source={UserImage} style={styles.image} />
        </View>
        <View style={styles.mentorSubheading}>
          <Text style={styles.mentorSubheadingText}>name of the mentor will be here</Text>
          <View style={styles.imagesDataContainer}>
            {ImagesData.map(item => {
              return (
                <TouchableOpacity>
                  <Image source={item} style={styles.images} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.biographyContainer}>
        <Text style={styles.biographyText}>Biography</Text>
      </View>
      <Text style={{color: colors.black}}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      </Text>
      <Text style={{color: colors.black}}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mentorSubheading: {
    flex: 1,
    marginHorizontal: 10,
  },
  mentorSubheadingText: {
    fontWeight: 'bold',
    color: colors.black,
  },
  imagesDataContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 7,
    marginRight: 10,
    // marginRight: 10,
  },
  descriptionContainer: {
    margin: 5,
  },
  descriptionHeader: {
    fontWeight: 'bold',
    marginVertical: 5,
    color: colors.black,
  },
  biographyContainer: {
    marginBottom: 10,
    flex: 1,
  },
  biographyText: {
    fontWeight: 'bold',
    color: colors.black,
  },
  images: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  mentorText: {
    marginVertical: 10,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default Description;
