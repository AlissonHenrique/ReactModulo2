import React, { Component } from "react";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import { Container, Form } from "./styles";
//formata hora data
import moment from "moment";
import CompareList from "../../components/compareList";

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };
  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );
      repository.lasCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      //loadin
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Container>
        <img src={logo} alt="git compare" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositoryInput}
            onChange={e => {
              this.setState({ repositoryInput: e.target.value });
            }}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "ok"
            )}
          </button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
