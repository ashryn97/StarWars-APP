import React, { Component } from 'react';
import styles from './App.module.css';

class App extends Component {

  state = {
    peoples: null,
    count: null,
    per_page: null,
    current_page: 1
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`https://swapi.co/api/people/?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      peoples: data.results,
      count: data.count,
      per_page: data.results.length,
    });
  }


  render() {

    let peoples, renderPageNumbers;

    if (this.state.peoples !== null) {
      peoples = this.state.peoples.map(people => (
        <tr key={people.name}>
          <td>{people.name}</td>
          <td>{people.height}</td>
          <td>{people.mass}</td>
          <td>{people.hair_color}</td>
          <td>{people.skin_color}</td>
          <td>{people.eye_color}</td>
          <td>{people.birth_year}</td>
          <td>{people.gender}</td>
        </tr>
      ));
    }
    //console.log(this.state.count, Math.ceil(this.state.count / this.state.per_page));
    const pageNumbers = [];
    if (this.state.count !== null) {
      for (let i = 1; i <= Math.ceil(this.state.count / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        return (
          <span key={number}  onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
      //console.log(renderPageNumbers)
    }

    return (
      <div className={styles.app}>
        <h2><center>Star Wars: People</center></h2>
         <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
              <th>Skin Color</th>
              <th>Eye Color</th>
              <th>Birth Year</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {peoples}
          </tbody>
        </table>
        <div className={styles.pagination}>
        {renderPageNumbers}
        </div>
      </div>
    );
  }

}

export default App;