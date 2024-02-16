import { Text, View } from "react-native"

const ViewComponent = ({ isTrue, styles }) => {

    if(!isTrue) {
        return <View>
            에러 발생
        </View>
    }

    return (
        <View style={styles}>
            <Text>Hello</Text>
        </View>
    )
}

export default ViewComponent;