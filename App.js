import React, { Component } from 'react'

import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Block, Card, Text, Button, Input } from './galio-framework';
import theme from './theme';
import DATA from './data.json';


const { width } = Dimensions.get('screen');

function Item({ ngmodel }) {
  return (
    <Block style={styles.item}>
      <Text style={styles.title}>{ngmodel.name}</Text>
      <Text style={styles.title}>{ngmodel.rank}</Text>
    </Block>
  );
}

function handleChange(value) {
  console.log(value);
};


var filterData = DATA.filter(function (item, index) {
  return index < 20;
});


export default class App extends Component {
   constructor(props) {
    super(props)
    this.state = {
      data: filterData || []
    }
    this.setState({ "data": filterData })
    console.log(this.state.data);

  }
  
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
      this.page = this.page + 1; // increase page by 1
     
    }
  };
 
  render() {
    return (
      <View style={styles.container}>
        {/*<Input
    rounded
    placeholder="Search"
    style={{ width: width * 0.9 }}
    onChangeText={text => handleChange(text)}
  />*/}
       
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <Item ngmodel={item} key={index} />
            );
          }}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={1}
          onEndReached={this.handleLoadMore}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, cards: {
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
