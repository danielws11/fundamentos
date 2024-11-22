import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Product } from "../../components/Product";

import { styles } from "./styles";
import { useState } from "react";

export function Home() {
  const [products, setProducts] = useState<string[]>([])
  const [productName, setProductName] = useState("")

  function handleProductAdd() {
    if (products.includes(productName)) {
      return Alert.alert("Produto já cadastrado", "Já exite um produto na lista com esse nome.");
    }

    setProducts(prevState => [...prevState, productName]);
    setProductName('');  
  } 

  function handleProductRemove(name: string) {
    Alert.alert("Remover", `Deseja remover o produto ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setProducts(prevState => prevState.filter(product => product !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <Text style={styles.todaysDate}>Quarta-feira, 17 de Julho de 2025</Text>

      <View style={styles.form}>
        <TextInput        
          style={styles.input}
          placeholder="Nome do Produto"
          placeholderTextColor="#BDBABA"
          keyboardType="default"
          onChangeText={setProductName}
          value={productName}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleProductAdd}>
            <Text style={styles.textButton}>+</Text>        
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>Compras Pendentes</Text>

      <FlatList        
        data={products}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Product key={item} name={item} onRemove={() => handleProductRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Comprou todos os produtos? Adicione produtos a sua lista de compras
          </Text>
        )}
      /> 
    </View>
  )
}
