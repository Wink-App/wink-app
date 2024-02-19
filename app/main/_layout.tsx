import { Tabs } from "expo-router";
import { Image, ImageStyle } from "expo-image";

type TabBarIconProps = {
  focused: boolean;
};

export default function Layout() {

  const icons = {
    home: require("../../assets/icons/Home.svg"),
    search: require("../../assets/icons/Search.svg"),
    favourites: require("../../assets/icons/Favourites.svg"),
    bag: require("../../assets/icons/Bag.svg"),
    profile: require("../../assets/icons/Profile.svg"),
  };

  const iconStyle: ImageStyle = {
    marginTop: 5,
    height: 23,
    objectFit: "contain",
    aspectRatio: 1,
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={icons.home}
              style={{
                ...iconStyle,
                tintColor: focused ? "black" : "grey",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Cerca",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={icons.search}
              style={{
                ...iconStyle,
                tintColor: focused ? "black" : "grey",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Preferiti",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={icons.favourites}
              style={{
                ...iconStyle,
                tintColor: focused ? "black" : "grey",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Borsa",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={icons.bag}
              style={{
                ...iconStyle,
                tintColor: focused ? "black" : "grey",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profilo",
          tabBarIcon: ({ focused }: TabBarIconProps) => (
            <Image
              source={icons.profile}
              style={{
                ...iconStyle,
                tintColor: focused ? "black" : "grey",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}