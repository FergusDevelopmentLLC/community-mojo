import React from "react";
import { StyleSheet, Text, ListView } from "react-native";
import { Container, Content, Button, Icon, List, ListItem } from "native-base";
import firebase from "react-native-firebase";

export default class ListOfActiveQueues extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      textInput: "",
      loading: true,
      todos: [],
      currentUser: ""
    };
    this.ref = firebase.firestore().collection("Queue");
    this.unsubscribe = null;
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.CreatedQueues = this.ref.where("CreatedBy", "==", currentUser.uid);
    this.CreatedQueues.get().then(data => this.onCollectionUpdate(data));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const todos = [];

    querySnapshot.forEach(doc => {
      const { subject, additional_instructions } = doc.data();

      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        subject,
        additional_instructions
      });
    });

    this.setState({
      todos,
      loading: false
    });
  };

  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <Container>
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.todos)}
            renderRow={data => (
              <ListItem>
                <Text>{data.subject}</Text>
              </ListItem>
            )}
            renderLeftHiddenRow={() => (
              <Button full>
                <Icon name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={() => (
              <Button full danger>
                <Icon name="trash" />
              </Button>
            )}
            leftOpenValue={+75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}
