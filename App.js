import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import database from '@react-native-firebase/database';

const App = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const databaseRef = database().ref('/questions');
    // Fetch questions from Firebase
    databaseRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const questionList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setData(questionList);
      }
    });

    // Clean up the event listener
    return () => {
      databaseRef.off('value');
    };
  }, []);

  const renderQuestion = ({item}) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.options.map((option, index) => (
        <Text key={index} style={styles.optionText}>
          {option}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Firestore Data</Text>
      <FlatList
        data={data.slice(1)} // Exclude the first item
        keyExtractor={item => item.id}
        renderItem={renderQuestion}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await firestore().collection('Quiz').get();
//         const fetchedQuestions = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Data from Firestore:</Text>
//       {questions.map(question => (
//         <View style={styles.questionContainer} key={question.id}>
//           <Text style={styles.questionText}>{question.question}</Text>
//           {question.options.map((option, index) => (
//             <Text key={index} style={styles.optionText}>
//               {option}
//             </Text>
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   questionContainer: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     width: '90%',
//   },
//   questionText: {
//     fontSize: 18,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   optionText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default App;
