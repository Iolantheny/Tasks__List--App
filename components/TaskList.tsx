import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import Dialog from "react-native-dialog";
import { Octicons, Foundation } from "@expo/vector-icons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

interface ListProps {
  activeList: Array<string> | null;
  deleteList: (name: string) => void;
}

const TaskList = (props: ListProps) => {
  if (props.activeList !== null) {
    let list = props.activeList;

    const [task, setTask] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [doneList, setDoneList] = useState<Array<string>>([]);
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

    const handleCancel = () => {
      setTask("");
      setVisible(false);
    };

    const handleConfirm = () => {
      list.push(task);
      setTask("");
      setVisible(false);
    };

    const handleDoneTask = (task: string, id: number) => {
      setDoneList((prev) => [...prev, task]);
      list.splice(id, 1);
    };

    const handleRemove = (item: string) => {
      setDoneList(doneList.filter((i) => i !== item));
    };

    const clearList = () => {
      setDoneList([]);
      list.length = 1;
      setVisibleMenu(false);
    };

    const hideMenu = () => setVisibleMenu(false);

    const showMenu = () => setVisibleMenu(true);

    return (
      <View style={styles.wrapper}>
        {list.map((task, id: number) => {
          if (id !== 0) {
            return (
              <View key={id} style={styles.list}>
                <Pressable
                  style={styles.task}
                  onPress={() => handleDoneTask(task, id)}
                >
                  <Text style={styles.label}>{task}</Text>
                  <Foundation
                    name="check"
                    size={30}
                    color="#119C43"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              </View>
            );
          }
        })}
        {doneList.map((item, id: number) => {
          if (id !== 0) {
            return (
              <View key={id} style={styles.list}>
                <Text style={styles.labelDone}>{item}</Text>
                <Pressable onPress={() => handleRemove(item)}>
                  <Octicons name="trash" size={28} color="black" />
                </Pressable>
              </View>
            );
          }
        })}
        <View style={styles.footer}>
          <Menu
            visible={visibleMenu}
            anchor={
              <Pressable
                onPress={showMenu}
                style={[styles.footerBtn, styles.footerBtnMenu]}
              >
                <Text style={styles.footerBtnText}>☰</Text>
              </Pressable>
            }
            onRequestClose={hideMenu}
            animationDuration={200}
          >
            <MenuItem
              onPress={clearList}
              style={styles.menu}
              textStyle={styles.menuText}
              pressColor="#119C43"
            >
              Wyczyść listę
            </MenuItem>
            <MenuItem
              onPress={() => props.deleteList(list[0])}
              style={styles.menu}
              textStyle={styles.menuText}
              pressColor="#119C43"
            >
              Usuń listę
            </MenuItem>
            <MenuDivider />
          </Menu>
          <Pressable onPress={() => setVisible(true)} style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>+</Text>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Dodaj nowe zadanie</Dialog.Title>
              <Dialog.Input
                value={task}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ): void => setTask(e.nativeEvent.text)}
              />
              <Dialog.Button label="Anuluj" onPress={handleCancel} />
              <Dialog.Button label="Gotowe" onPress={handleConfirm} />
            </Dialog.Container>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

export default TaskList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    marginLeft: 20,
    marginRight: 40,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    borderColor: "#00000",
    borderWidth: 0.4,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
  },
  task: {
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginLeft: 10,
    fontSize: 22,
  },
  labelDone: {
    textDecorationLine: "line-through",
    marginLeft: 10,
    fontSize: 22,
  },
  pressed: {
    backgroundColor: "#119C43",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    width: "100%",
    backgroundColor: "#92BF95",
    justifyContent: "flex-end",
    height: 80,
  },
  footerBtn: {
    position: "absolute",
    right: 15,
    bottom: 10,
    borderColor: "#ffffff",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 15,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnMenu: {
    left: 15,
  },
  footerBtnText: {
    fontSize: 40,
    color: "#ffffff",
  },
  menu: {
    margin: 10,
  },
  menuText: {
    fontSize: 22,
  },
});
