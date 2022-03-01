import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from "expo-constants";
import colors from '../../config/colors';
import TherapistHeader from '../../components/therapist/TherapistHeader';

function TherapistDisabled(props) {
    return (
        <View style={styles.container}>
            <TherapistHeader/>
            <Text style={styles.pendingText}>Your account has been disabled by administrator.</Text>
            <Text style={styles.pendingText}>Please contact the administrator.</Text>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex:1,
        alignItems:"center"
      },
    pendingText:{
        fontSize:26,
        fontWeight: '400',
        padding:10,
        color:colors.grey,
        marginBottom:10
    },
    logo:
    {
        width:100,
        height:100
    }
})
export default TherapistDisabled;