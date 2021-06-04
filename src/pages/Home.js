import { React, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResult] = useState(null);

  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

  function onSearch() {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResult(result)
    );
  }

  function onInputChange(ev) {
    setInput(ev.target.value);
  }

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  console.log(searchOption);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };
  return (
    <MainPageLayout>
      <input
        placeholder="Search for something"
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            value="shows"
            id="shows-search"
            onChange={onRadioChange}
            checked={isShowSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            value="people"
            id="actors-search"
            onChange={onRadioChange}
            checked={!isShowSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
