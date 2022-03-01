import React, { useContext } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'
import Constants from 'expo-constants';

import colors from '../../config/colors';
import AuthContext from '../../auth/context';

function AthleteHeader(props) {
    const { user, setUser } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>Hi, {user.userObj.first_name}</Text>
                <View style={styles.phoneContainer}>
                    <Text style={styles.phoneText}>{user.userObj.mobile}</Text>
                    <MaterialCommunityIcons name="circle-edit-outline" size={24} color="white" />
                </View>
            </View>
            <View style={styles.avatarContainer}>
                <FontAwesome name="user-circle" size={100} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.primary,
        flexDirection: 'row',
        padding: 10,
        marginTop: Constants.statusBarHeight,

    },
    detailsContainer: {
        width: '70%',
        paddingLeft: 10,
        paddingVertical: 10,
    },
    phoneContainer: {
        marginVertical:7,
        flexDirection: 'row',
    },
    nameText: {
        color: colors.secondary,
        fontWeight: "300",
        fontSize: 36,
    },
    phoneText: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: "300",
        marginRight: 7,
    },
    avatarContainer: {
    },
})
export default AthleteHeader;