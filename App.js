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



function convertToASCII(metin) {
   metin = metin.replace(/\u00c2/g, 'A'); // Â
   metin = metin.replace(/\u00e2/g, 'a'); // â
   metin = metin.replace(/\u00fb/g, 'u'); // û
   metin = metin.replace(/\u00c7/g, 'C'); // Ç
   metin = metin.replace(/\u00e7/g, 'c'); // ç
   metin = metin.replace(/\u011e/g, 'G'); // Ğ
   metin = metin.replace(/\u011f/g, 'g'); // ğ
   metin = metin.replace(/\u0130/g, 'I'); // İ
   metin = metin.replace(/\u0131/g, 'i'); // ı
   metin = metin.replace(/\u015e/g, 'S'); // Ş
   metin = metin.replace(/\u015f/g, 's'); // ş
   metin = metin.replace(/\u00d6/g, 'O'); // Ö
   metin = metin.replace(/\u00f6/g, 'o'); // ö
   metin = metin.replace(/\u00dc/g, 'U'); // Ü
   metin = metin.replace(/\u00fc/g, 'u'); // ü

   return metin.toLowerCase();
}

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
      this.setState({ loadingMore: true });

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
         var itemData = convertToASCII(`${item.name}`);
         var textData = convertToASCII(this.state.search);
         return itemData.includes(textData);
      });
      var startpage = this.state.page * 20
      var endpage = (this.state.page + 1) * 20
      var filterData = searchData.filter(function (item, index) {
         return index > startpage && index < endpage
      });



      if (this.state.page == 0) {
         this.setState(prevState => ({
            data: filterData,
            page: prevState.page + 1,
            loadingMore:false
         }))
      } else {
         this.setState(prevState => ({
            data: prevState.data.concat(filterData),
            page: prevState.page + 1,
            loadingMore:false
         }))
      }

 
      //console.log(filterData)
     // return filterData
   };

   
 
   handleLoadMore = () => {
     //console.log("end");
      if (!this.state.loadingMore) {
         this.fetchData();
      }
   };

   handleChange = (search) => {
      console.log(search);
      this.setState({ data: [] })
      this.setState({ search: search })
      this.fetchData(search);

      this.setState({ page: 0 });
   };

   render() {
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
         
         if (this.state.data.length>0 ) return null;
        return (
            <ActivityIndicator
               style={{ color: '#000' }}
            />
         );
      };
      
      return (
         <Block safe style={styles.container}>
            <Input
               rounded
               placeholder="Search"
               style={{ width: width * 0.9 }}
               onChangeText={text => this.handleChange(text)}
            /><Text>{this.state.data.length}</Text>

            {this.state.data.length!=0?<FlatList
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
            />:<Text> Veri Yok</Text>}

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
