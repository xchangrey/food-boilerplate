import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id  = navigation.getParam('id');

    const  getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };

    useEffect(() => {   
        getResult(id);
    },[]);

    if (!result) {
        return null;
    }

    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList 
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
        borderRadius: 4,
        marginBottom: 5
    },
});

export default ResultsShowScreen;