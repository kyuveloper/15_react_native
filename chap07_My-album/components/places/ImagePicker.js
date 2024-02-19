import { useState } from "react";
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutLineButton from "../UI/OutLineButton";
import { Colors } from "../../model/Colors";


const ImagePicker = ({onTakeImage}) => {
    
    const [pickedImage, setPickedImage] = useState('');

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        
        // 최초 실행시 동작
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('주의', '카메라 권한이 필요합니다')
            return false;
        }

        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>촬영한 이미지가 없습니다</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutLineButton icon='camera' onPress={takeImageHandler}>촬영하기</OutLineButton>
        </View>
    )

}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    }
});