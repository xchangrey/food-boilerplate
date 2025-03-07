import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [ term, setTerm ] = useState('');
 const [ results, errorMessage, searchApi ] = useResults();

 const filterResultsByPrice = (price) => {
  // price === '$' || '$$' || '$$$'
  return results.filter( result => {
    return result.price === price
  })
 }

  return (
    <>
      <SearchBar 
        term={term} 
        onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <ScrollView>
        <ResultsList results={filterResultsByPrice('$')} title='Cost Effective' />
        <ResultsList results={filterResultsByPrice('$$')} title='Bit Pricier' />
        <ResultsList results={filterResultsByPrice('$$$')} title='Big Spender!' />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error : {
    marginLeft: 15,
    color: 'red'
  } 
});

export default SearchScreen;
