import { useState } from 'react';
import { Button, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import ActivityIndicatorComponent from './01_otherComponent/01_ActivityIndicatorComponent';
import SafeAreaViewComponent from './01_otherComponent/02_SafeAreaView';
import SwitchComponent from './01_otherComponent/03_SwitchComponent';
import FlatListComponent from './01_otherComponent/04_FlatList';
import ModalComponent from './01_otherComponent/07_ModalComponent';

export default function App() {

  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorComponent/>
        <View style={{marginTop:5}}>
          <Button title='로딩 완료' onPress={() => {setLoading(false)}}/>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaViewComponent isDark={isDark}>
      <StatusBar style='auto' />
      <SwitchComponent isDark={isDark} setIsDark={setIsDark}/>
      <View style={isDark && styles.titleView}>
        {/* Dimenstions 컴포넌트는 동적으로 변하는 화면의 값을 취득할 수 있는 컴포넌트로 css 화면 렌더링시 많이 사용된다 */}
        <Text style={{backgroundColor:'green'}}>window의 현재 넓이 : {Dimensions.get('window').width}</Text>
        <Text style={{backgroundColor:'green'}}>window의 현재 넓이 : {Dimensions.get('window').height}</Text>
      </View>
      <View style={styles.rootContainer}>
        <FlatListComponent isDark={isDark}/>
      </View>
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <Button title='Modal' onPress={() => setModalVisible(true)}/>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyContainer:{
    flex:1
  },
  lodingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  rootContainer:{
    flex:1,
  },
  titleView:{
    backgroundColor:'white',
  }
});
