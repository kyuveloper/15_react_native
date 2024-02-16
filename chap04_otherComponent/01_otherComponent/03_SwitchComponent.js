import { StyleSheet, Switch, Text, View } from "react-native";


const SwitchComponent = ({isDark, setIsDark}) => {

    const togglehandler = () => setIsDark(state => !state);

    return (
        <View style={styles.toggleContainer}>
            <Text style={{color:isDark? 'white':'black'}}>{!isDark? 'dark':'ligth'}</Text>
            <Switch
                trackColor={{false:'#767577', true:'#81b0ff'}}
                thumbColor={isDark? '#f5dd4b' : '#f4f3f3'}
                onValueChange={togglehandler}
                value={isDark}
            />
        </View>
    )
}

export default SwitchComponent;

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})