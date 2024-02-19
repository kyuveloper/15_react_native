import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import TapHome from "./01_TapHome";
import TapView from "./02_TapView";


const Tap = createBottomTabNavigator();

const NestingNavigation = () => {
    

    return (
        <Tap.Navigator>
            <Tap.Screen
                name="home"
                component={TapHome}
                options={{
                    tapBarIcon: ({focused}) => focused ? (<Ionicons name="home" size={30} color='green'/>) : (<Ionicons name="home" size={30} color='black'/>),
                    tapBarBadge: 3
                }}
            />
            <Tap.Screen
                name="RootPage"
                component={TapView}
                options={{
                    tapBarIcon: ({focused}) => focused ? (<Ionicons name="eye-outline" size={30} color='green'/>) : (<Ionicons name="eye-outline" size={30} color='black'/>)
                }}
            />
        </Tap.Navigator>
    )
}

export default NestingNavigation;