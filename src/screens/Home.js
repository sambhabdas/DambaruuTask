import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "../utils/Scale";
import {fetchRecipes} from '../api/api';
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const renderRecipeItem = (recipe) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={recipe.id}
      onPress={() => navigation.navigate("Video")}
    >
      <Image
        source={{
          uri: recipe.url,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.cuisine}>{recipe.Recipe.cuisine}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.recipeContainer}>
        {recipes.map(renderRecipeItem)}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: moderateScale(10),
    paddingTop: verticalScale(20),
  },
  recipeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: scale(5),
  },
  itemContainer: {
    width: "48%", 
    aspectRatio: 1, 
    marginBottom: verticalScale(20),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
  },
  thumbnail: {
    width: "100%",
    height: verticalScale(120),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  textContainer: {
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: moderateScale(14),
    color: "#888",
  },
});
export default Home;
