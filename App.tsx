
import { useState } from 'react';
import { Button, FlatList, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, Image, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const startAddGoalHandler = () => {
    setShowModal(true);
  }

  const handleInput = (text: string) => {
    setInput(text);
    console.log(text);
  }

  const addGoal = () => {
    console.log([...goals, input]);
    setGoals(currentGoals =>[...currentGoals, input] );
    setInput('');
    setShowModal(false);
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/images/favicon.png")} />
      <Button title='add new goal' color="red" onPress={startAddGoalHandler}/>
      <Modal visible={showModal} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Enter your goal" onBlur={Keyboard.dismiss} value={input} onChangeText={handleInput}/>
        <Button title="Add Goal" onPress={addGoal} />
      </View>
      </Modal>
      <View style={styles.goalsContainer}>
        {/* <View>
        <Text style={styles.list}>List of goals</Text>
        </View> */}
        <FlatList 
          data={goals} 
          renderItem={goalData => (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,  backgroundColor: "green", borderRadius: 6}}>
              <Pressable android_ripple={{color: "gray"}} onPress={()=>console.log("hello")} style={({pressed}) => pressed && styles.pressItem}
              >
              <Text style={{color: 'white',}}>{goalData.item}</Text>
              </Pressable>
              <Button title="Remove" onPress={() => removeGoal(goalData.index)} />
            </View>
          )}
          alwaysBounceVertical={false}>
        </FlatList>
        
      
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
  },
  list: {
    width: '100%',
    height: '100%',
    borderWidth: 1, 
    borderColor:"red", 
    padding: 10,
    color: 'white',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  goalsContainer: {
    marginTop: 20,
    flex: 4,
    width: '100%',
    flexDirection: 'column',
    color: 'white',
  },
  pressItem: {
    opacity: 0.5,
  }
});
