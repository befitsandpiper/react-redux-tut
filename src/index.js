import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ytSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBblkHmaK7iy6x8YeOQpmSeD0TRO0_mbLI';

// most parent component should be responsible for fetching the data
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] };

    ytSearch({ key: API_KEY, term: 'hedgehogs' },
      videos => this.setState({ videos }));
      // this.setState({ videos : videos})
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.videos[0]} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
