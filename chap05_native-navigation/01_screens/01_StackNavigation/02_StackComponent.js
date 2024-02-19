import { Button, Text, View } from "react-native";


const StackComponent = ({route, navigation}) => {

    const page = () => {
        navigation.navigate('StackView');
    }

    const tapRouter = () => {
        navigation.navigate('NestingNavigation');
    }

    return (
        <View>
            <Text>
                Stack View Screen
            </Text>
            <Button onPress={page} title="Go to Page" />
            <View>
                <Text>Tap 메뉴 이동</Text>
                <Button onPress={tapRouter} title="Tap 이동"/>
            </View>
        </View>
    )

}

export default StackComponent;