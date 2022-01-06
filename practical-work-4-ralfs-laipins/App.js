import React, { useEffect, useState } from 'react';
import {Linking,TouchableOpacity, Image, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/everything?q=crypto&from=2022-01-02&pageSize=100&sortBy=popularity&apiKey=a813b60249cb48cea953a8877379b248'
    )
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#ccc', padding: 10 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{ marginTop: 5, backgroundColor: '#fff', padding: 14 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {item.title}, {item.id},Article author:{item.author}
              </Text>
              <Text>{item.alt_title}</Text>
              <Text>{item.note}</Text>
              <Text>
                <View>
                <TouchableOpacity onPress={() =>Linking.openURL(item.url)}>
                    
                      <Image
                    source={{ uri: item.urlToImage }}
                    style={{ width: 305, height: 140 }}
                      />
                    
                  </TouchableOpacity>
                </View>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
