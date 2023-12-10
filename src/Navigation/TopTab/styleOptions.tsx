import { Text } from "@gluestack-ui/themed";

const topTabNavigatorOptions  = () => ({
    tabBarLabelStyle: {
      fontSize: 12,
    },
    tabBarBadge: ()=> { return(<Text left={-20} top={5}></Text>)},
    tabBarScrollEnabled: true,
    tabBarItemStyle: { width: 130 },
    tabBarStyle: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,
      shadowColor: 'white',
      elevation: 0,
    },
    tabBarIndicatorStyle: {
      backgroundColor: 'blue',
      height: 4,
      marginVertical: 5,
      marginHorizontal: 15,
      width: 100,
      borderRadius: 2,
      elevation: 0,
    } 
});
  
export default topTabNavigatorOptions;