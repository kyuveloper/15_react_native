import { useEffect, useState } from "react";
import { useForegroundPermissions, PermissionStatus, getCurrentPositionAsync } from "expo-location"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutLineButton from "../UI/OutLineButton";
import { Colors } from "../../model/Colors";
import { getAddress, getMapPreview } from "../../util/Api";


const LocationPicker = ({onPickLocation}) => {
    
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const isFocused = useIsFocused();

    const navigation = useNavigation();

    const route = useRoute();

    useEffect(() => {
        if(isFocused && route.params) {
            const mapPickedLocation = route.params && {lat: route.params.pickedLat, lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
    },[isFocused, route])

    useEffect(() => {
        const handler = async () => {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address});
            }
        }
        handler();
    },[pickedLocation, onPickLocation])

    const verifyPermissions = async () => {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('주의', '위치 정보가 필요합니다')
            return false;
        }

        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    const pickOnMapHandler = async () => {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>선택한 장소가 없습니다</Text>

    if (pickedLocation) {
        locationPreview = (
            <Image style={styles.mapPreview} source={{uri: getMapPreview(pickedLocation)}}/>
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutLineButton
                    icon='location'
                    onPress={getLocationHandler}>내 위치 보기</OutLineButton>

                <OutLineButton
                    icon='location'
                    onPress={pickOnMapHandler}>내 위치 확인</OutLineButton>
            </View>
        </View>
    )

}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%'
    }
});