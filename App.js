import React, { Component } from 'react'

import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Block, Card, Text, Button, Input } from './galio-framework';
import theme from './theme';
import DATA from './data.json';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Require cycle']);

 //console.disableYellowBox = true;
 //console.ignoredYellowBox = ['Require cycle'];


 DATA.sort(function (a, b) {
  return a.rank - b.rank;
});

const { width } = Dimensions.get('screen');

 

function handleChange(value) {
  console.log(value);
};





export default class App extends Component {
   constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
 

  }

  componentWillMount () {
    this.fetchData(1);
  }

  fetchData = (page) => {
    var filterData = DATA.filter(function (item, index) {
      return index < 20;
    });
    this.setState({ "data": filterData })
    console.log(filterData)
    return filterData
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
     if (!this.state.loading) return null;
     return (
       <ActivityIndicator
         style={{ color: '#000' }}
       />
     );
   };
   handleLoadMore = () => {
    console.log("end");
    if (!this.state.loading) {
     
    }

  };
 
  render() {
   
    return (
      <View style={styles.container}>
        <Input
    rounded
    placeholder="Search"
    style={{ width: width * 0.9 }}
    onChangeText={text => handleChange(text)}
  />
       
        <FlatList
        style={styles.flatList}
          data={this.state.data}
          keyExtractor={ ( item, index )=> index.toString()}
          
          renderItem={({ item, index }) => (
               
              <Block >
              <Text style={{textAlign:'left',padding:8}}>
                  {item.rank}
                  {'.'}
                  {item.name.toUpperCase()}
                </Text>
              </Block>

            )}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={1}
          onEndReached={() => this.handleLoadMore()}   
        />

       { /*<Card

          borderless
          style={styles.card}
          title="Christopher Moon"
          caption="139 minutes ago"
          location="Los Angeles, CA"
          avatar="http://i.pravatar.cc/100?id=skater"
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
          image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
       />*/}


</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.COLORS.MUTED,
  
  },
  flatList:{
    flex:1,
    backgroundColor:theme.COLORS.WHITE,
    
   },
   cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
});
