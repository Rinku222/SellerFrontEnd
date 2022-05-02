import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Paragraph, Dialog, Portal, Provider, Subheading, Divider} from 'react-native-paper';
import {colors} from '../../config/colors';

function RenderDialog() {
  return (
    <View>
      <Text>world</Text>
    </View>
  );
}

function CreditEarnedDialog() {
  const [visible, setVisible] = React.useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={{height: '100%'}}>
      <Provider>
        <Portal>
          <Dialog visible={visible}>
            <View style={styles.container}>
              <Text style={styles.heading}>Credits earned</Text>
              <View style={styles.creditRow}>
                <Text style={styles.creditText}>500 </Text>
                <Text>/ 1000</Text>
              </View>
              <Text>You have to earn min 750 points to get the certificate</Text>
              <Divider style={styles.divider} />
              <Text style={styles.bottomMargin}>
                You have to earn min 750 points to get the certificate
              </Text>
              <Text style={styles.bottomMargin}>
                You have to earn min 750 points to get the certificate
              </Text>
              <Button
                color={colors.primary}
                mode="contained"
                style={styles.bottomMargin}
                onPress={() => hideDialog()}>
                OK
              </Button>
            </View>
          </Dialog>
        </Portal>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },
  divider: {
    height: 2,
    marginVertical: 10,
    backgroundColor: colors.themeGray,
    width: '100%',
  },
  bottomMargin: {
    marginBottom: 10,
  },
  creditRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  creditText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default CreditEarnedDialog;
