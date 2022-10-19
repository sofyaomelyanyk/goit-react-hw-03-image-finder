import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    picture: '',
  };

  onChangeName = e => {
    this.setState({ picture: e.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.props.addName(this.state.picture);

    this.reset();
  };

  reset = () => {
    this.setState({ picture: '' });
  };

  render() {
    const { picture } = this.state;
    const { onChangeName, onSubmitForm } = this;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={onSubmitForm}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            value={picture}
            onChange={onChangeName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
