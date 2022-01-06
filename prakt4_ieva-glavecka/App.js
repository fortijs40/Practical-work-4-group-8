import React, { useEffect, useState } from 'react';
import {Linking,TouchableOpacity, Image, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=lv&apiKey=546d02fd273d4cc3aec0172acfc71184'
    )
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#333333', padding: 10 }}>
    <Text style={{ marginTop: 30, marginBottom: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}> Latvijas Zinas </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{ marginTop: 10, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.title} {item.id} {"\n"}
              </Text>
              <Text>
                <View>
                <TouchableOpacity onPress={() =>Linking.openURL(item.url)}>
                  <Image style = {{alignItems: 'center', justifyContent: 'center'}}
                    source={{ uri: item.urlToImage }}
                    style={{ width: 350, height: 170 }}
                      />
                  </TouchableOpacity>
                </View>
                {"\n"}Raksta autors: {item.author}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}