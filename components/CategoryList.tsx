import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import Dialog from "react-native-dialog";
import TaskList from "./TaskList";

const CategoryList = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<Array<Array<string>>>([]);
  const [activeList, setActiveList] = useState<Array<string>>([]);

  const handleCancel = () => {
    setName("");
    setVisible(false);
  };

  const handleConfirm = () => {
    let listName = name.split(" ");
    setList((prev) => [...prev, listName]);
    setActiveList(listName);
    setName("");
    setVisible(false);
  };

  const deleteList = (name: string) => {
    setList((prev) =>
      prev.filter((list) => {
        for (let i = 0; i <= list.length; i++) {
          return list[i] !== name;
        }
      })
    );
    setActiveList(list[0]);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Lista Zadań</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.list}>
          {list.map((name: Array<string>, id: number) => {
            return (
              <Pressable key={id} onPress={() => setActiveList(name)}>
                <Text
                  style={[
                    styles.listName,
                    name === activeList ? styles.active : null,
                  ]}
                >
                  {" "}
                  {name}{" "}
                </Text>
              </Pressable>
            );
          })}
          <Pressable onPress={() => setVisible(true)}>
            <Text style={styles.listName}>+ dodaj liste</Text>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Dodaj nową listę</Dialog.Title>
              <Dialog.Input
                value={name}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ): void => setName(e.nativeEvent.text)}
                placeholder="Nazwa nowej listy"
              />
              <Dialog.Button label="Anuluj" onPress={handleCancel} />
              <Dialog.Button label="Gotowe" onPress={handleConfirm} />
            </Dialog.Container>
          </Pressable>
        </Text>
      </View>
      <TaskList
        activeList={list.length > 0 ? activeList : null}
        deleteList={deleteList}
      />
    </>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1A7A1B",
  },
  title: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 35,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
    fontFamily: "IBMPlexSansArabic",
  },
  listContainer: {
    borderBottomColor: "#000000",
    borderStyle: "solid",
    borderBottomWidth: 1,
    padding: 5,
    height: "8%",
  },
  list: {
    margin: 10,
  },
  listName: {
    fontSize: 19,
  },
  active: {
    color: "#1A7A1B",
    fontWeight: "bold",
  },
});
