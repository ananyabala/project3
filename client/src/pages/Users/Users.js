import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Users extends Component {
  state = {
    users: [],
    name: "",
    occupation: "",
    bio: ""
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", occupation: "", bio: "" })
      )
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUsers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.occupation) {
      API.saveUser({
        name: this.state.name,
        occupation: this.state.occupation,
        bio: this.state.bio
      })
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Fill out Your Personal Information!?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="name (required)"
              />
              <Input
                value={this.state.occupation}
                onChange={this.handleInputChange}
                name="occupation"
                placeholder="occupation (required)"
              />
              <TextArea
                value={this.state.bio}
                onChange={this.handleInputChange}
                name="bio"
                placeholder="bio (Optional)"
              />
              <FormBtn
                disabled={!(this.state.occupation && this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit user
              </FormBtn>
            </form>
          </Col>

          {/* This is where Oliver's part would go!!! */}
          {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Users On My List</h1>
            </Jumbotron>
            {this.state.Users.length ? (
              <List>
                {this.state.Users.map(user => (
                  <ListItem key={user._id}>
                    <Link to={"/Users/" + user._id}>
                      <strong>
                        {user.name} by {user.occupation}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteuser(user._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}

          {/* This is where Oliver's part ends */}
        </Row>
      </Container>
    );
  }
}

export default Users;
