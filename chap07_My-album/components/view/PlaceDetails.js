import { useEffect, useState } from "react";
import { Colors } from "../../model/Colors";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutLineButton from "../UI/OutLineButton";
import { fetchedPlaceDetails } from "../../util/query";


const PlaceDetails = ({route, navigation}) => {
    
    const [fetchedPlace, setFetchedPlace] = useState();

    const showOnMapHandler = () => {
        navigation.navigate('Map', {
            latitue : fetchedPlace.location.lat,
            longitude : fetchedPlace.location.lng
        })
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        const loadPlaceData = async () => {
            const result = await fetchedPlaceDetails(selectedPlaceId);

            setFetchedPlace(result);
            navigation.setOptions({title: result.title})
        }

        loadPlaceData();
    },[selectedPlaceId])

    if(!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>로딩중..</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutLineButton icon='map' onPress={showOnMapHandler}>
                    지도 보기
                </OutLineButton>
            </View>
        </ScrollView>
    )
}


export default PlaceDetails;


const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});