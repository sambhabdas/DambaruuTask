import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigations/AppStack';
const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;