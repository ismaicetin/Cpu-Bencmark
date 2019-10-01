import React, { Component } from 'react'

import { StyleSheet, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Block, Card, Text, Button, Input } from './galio-framework';
import Constants from 'expo-constants';
import theme from './theme';
import DATA from './data.json';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Require cycle']);

//console.disableYellowBox = true;
//console.ignoredYellowBox = ['Require cycle'];


DATA.sort(function (a, b) {
  return a.rank - b.rank;
});

const { width } = Dimensions.get('screen');





export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loadingMore: false,
      search: "",
      page: 0
    }
  }

  componentWillMount() {
    this.fetchData(1);
  }

  fetchData = () => {
    this.setState({ "loadingMore": true });

    var searchValue = this.state.search;
    /*   var searchValue= new RegExp('[a-z0-9]*'+searchValue+'[a-z0-9]*', 'i');  
       var searchData= DATA.filter( (item) =>{
           return item.name.search(searchValue)!=-1
       });
   
   *//*
     const searchData = DATA.filter(item => {
       const itemData = `${item.name.toUpperCase()}`;
       const textData = searchValue.toUpperCase();
       return itemData.includes(textData); // this will return true if our itemData contains the textData
     });
     */

    const searchData = DATA.filter(item => {
      const itemData = `${item.name}`.toUpperCase();
      const textData = searchValue.toUpperCase();
      return itemData.includes(textData); // this will return true if our itemData contains the textData
    });





    var startpage = this.state.page * 20
    var endpage = (this.state.page + 1) * 20
    var filterData = searchData.filter(function (item, index) {
      return index > startpage && index < endpage
    });



    if (this.state.page == 0) {
      this.setState(prevState => ({
        data: filterData,
        page: prevState.page + 1
      }))
    } else {
      this.setState(prevState => ({
        data: prevState.data.concat(filterData),
        page: prevState.page + 1
      }))
    }


    this.setState({ "loadingMore": false });
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
    if (this.state.loadingMore) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };
  handleLoadMore = () => {
    console.log("end");
    if (!this.state.loading) {
      this.fetchData();
    }
  };

  handleChange = (search) => {
    //console.log(search);
    this.setState({ "search": search })
    this.fetchData(search);

    this.setState({ "page": 0 });
  };

  render() {

    return (
      <Block safe style={styles.container}>
        <Input
          rounded
          placeholder="Search"
          style={{ width: width * 0.9 }}
          onChangeText={text => this.handleChange(text)}
        />

        <FlatList
          style={styles.flatList}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) => (

            <Block  >
              <Text style={{ textAlign: 'left', paddingTop: 8, paddingBottom: 8 }}>
                {item.rank}
                {' . '}
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


      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.MUTED,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight

  },
  flatList: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    width: "100%"
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
