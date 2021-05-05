import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
export default class App extends Component{

  constructor(){
    super()
    this.state = {
      generatedItems: [],
      inMemory: [],
      str: ''
    }
  }

  generateRandomString = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let str = '';
    for ( let i = 0; i < 5; i++ ) {
      str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
  };

  _addItems = () => {
    //TODO : Randomly generate a text and then add it to array
    const randomText = this.generateRandomString();
    // setGeneratedItems();
    // const arr = [{key: Math.random().toString(), value: randomText}, ...generatedItems]
    const obj = {key: Math.random().toString(), value: randomText}
    this.setState({generatedItems:[obj, ...this.state.generatedItems], inMemory: [obj, ...this.state.inMemory]})
    // array.push({key: Math.random().toString(), value: randomText});
  };

  renderItem = (items) =>(
    // <View>
      // console.log(items.item.value);
    // </View>
    <View 
    style={{borderColor:'pink',
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      width:'80%',
      height:50,
      alignSelf:'center',
      marginTop:10,
      borderRadius:5
    }}
    >

      <Text style={{fontSize:14}}>{items.item.value}</Text>
    </View>
    
  )

  filterArr = (valuePassed) => {
    const filteredValue = this.state.inMemory.filter(
      generatedItem => {
        let valuePassedLC = valuePassed.toLowerCase();

        let gnLC = generatedItem.value.toLowerCase();

        // console.log(valuePassed.toLowerCase())
        // console.log(generatedItem.value.toLowerCase())
        return gnLC.indexOf(valuePassedLC) > -1
        // if(gnLC.includes(valuePassedLC))
      }
    )

    this.setState({generatedItems: filteredValue})
  }

  render(){
  return (
    <View style={styles.container}>
      <View style = {{padding: 40, marginTop:40, flexDirection:'row', justifyContent:'space-around'}}>
        <TextInput 
          placeholder = "Search"
          placeholderTextColor = "#fff"
          style = {{borderColor: '#000', borderWidth: 1, flex:1, marginRight:6, borderRadius:5, backgroundColor: '#000', color: '#fff', paddingLeft: 5}}
          onChangeText = {this.filterArr}
        />
        <Button title="+" onPress={this._addItems} />
      </View>
      
      <FlatList 
        showsVerticalScrollIndicator = {false}
        style = {styles.listStyle}
        data = {this.state.generatedItems}
        renderItem = {this.renderItem}
        ListEmptyComponent = {() => (
          <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:20}}>Nothing Here</Text></View>
        )}
      />
      
    </View>
  );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:30,
  },
  listStyle: {
    width:'80%'
  }
});



