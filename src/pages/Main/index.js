import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({
      loading: false,
      repositories: await this.getLocalRepositories(),
    });
  }

  getLocalRepositories = async () => {
    const repositories = await localStorage.getItem('repositories');
    return JSON.parse(repositories) || [];
  };

  handleChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();
      const newLocalRespositories = [...localRepositories, repository];

      await localStorage.setItem('repositories', JSON.stringify(newLocalRespositories));
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.last_commit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={this.handleChange}
          />

          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}

export default Main;
