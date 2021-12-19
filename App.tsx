import React from "react";
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Input,
  IconButton,
  Icon,
  Divider,
  Checkbox,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// To-do screen
export const Todo = () => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = weekday[new Date().getDay()];
  
  const instState = [
    {
      title: "Checking emails",
      isCompleted: true,
    },
    {
      title: "Coding session ",
      isCompleted: false,
    },
    {
      title: "Writing a blog post",
      isCompleted: false,
    },
    {
      title: "Meeting with the team",
      isCompleted: false,
    },
  ]

  const [list, setList] = React.useState(instState)
  const [inputValue, setInputValue] = React.useState("")

  const addItem = (title: string) => {
    setList([
      ...list,
      {
        title: title,
        isCompleted: false,
      },
    ])
  }

  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index)
    setList(temp)
  }

  const handleStatusChange = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index ? item : { ...item, isCompleted: !item.isCompleted }
    )
    setList(temp)
  }

  return (
    <>
      <Heading size="lg">{day}'s Todos</Heading>
      <Divider my="1" />
      <HStack space={2} alignItems="center">
        <Input 
          flex={1}
          onChangeText={(v) => setInputValue(v)}
          value={inputValue}
          placeholder="Add Task" 
        />
        <IconButton
          borderRadius="sm"
          variant="solid"
          icon={
            <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
          }
          onPress={() => {
            addItem(inputValue)
            setInputValue("")
          }}
        />
      </HStack>
      <Divider my="2" />
      <VStack space={2}>
        {list.map((item, itemI) => (
          <HStack
            justifyContent = 'space-between'
            w="100%"
            alignItems="center"
            key={item.title + itemI.toString()}
          >
            <Checkbox
                mx="10"
                isChecked={item.isCompleted}
                onChange={() => handleStatusChange(itemI)}
                value={item.title}
              >
                <Text
                  mx="5"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                >
                  {item.title}
                </Text>
              </Checkbox>
              <IconButton
                size="sm"
                colorScheme="trueGray"
                icon={
                  <Icon
                    as={Entypo}
                    name="minus"
                    size="sm"
                    color="trueGray.400"
                  />
                }
                onPress={() => handleDelete(itemI)}
              />
            </HStack>
        ))}
      </VStack>
    </>
    
  )


}


// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={3}
        flex={1}
      >
        <VStack space={5} alignItems="center">

          <Todo />

          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
