import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ytSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBblkHmaK7iy6x8YeOQpmSeD0TRO0_mbLI';

// most parent component should be responsible for fetching the data
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.videoSearch('surfboards');
  }
      // this.setState({ videos : videos})
  videoSearch(term) {
    ytSearch({ key: API_KEY, term: term },
      (videos) => {
        this.setState({
          videos,
          selectedVideo: videos[0],
        });
      });
  }

  render() {

    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
