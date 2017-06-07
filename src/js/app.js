import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';

import Search from './component/search';

class App extends Component {
  render() {
    return (
      <div
        style={{
          position: 'relative',
          top: 100,
          left: 0
        }}
      >
        <Search />
      </div>
    );
  }
}

function bootstrap() {
  const container = document.createElement('div');
  container.id = 'command-menu-root';
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'none';
  container.style.zIndex = '9999999';
  container.onclick = function(e) {
    const target = e.target;
    if (target.id === container.id) {
      container.style.display = 'none';
    }
  };
  document.body.appendChild(container);
  ReactDOM.render(<App />, container);
}

hotkeys('alt+t', function(e) {
  const container = document.getElementById('command-menu-root');
  const search = container.querySelector('#command-search-box');
  if (container) {
    container.style.display = 'block';
    search.focus();
  } else {
    bootstrap();
  }
});

bootstrap();
