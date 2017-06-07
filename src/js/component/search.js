/**
 * Created by axetroy on 17-6-7.
 */
import React, { Component } from 'react';

import COMMANDS from '../commands';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '> ',
      commands: COMMANDS
    };
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  search(input) {
    console.log(`run command ${input}`);
  }

  onKeyDown(e) {
    let commands = this.state.commands.toArray();
    let index = commands.findIndex(command => command.active === true);
    switch (e.keyCode) {
      // enter
      case 13:
        const command = commands[index];
        if (!command) return;
        this.setState({ value: command.toString() });
        command.dispatch();
        break;
      // left
      case 37:
        break;
      // up
      case 38:
        // 最后一个
        if (index === -1) {
          this.refs.input.focus();
        } else {
          index = index - 1;
        }
        commands.map((command, i) => (command.active = i === index));
        this.setState(commands);
        break;
      // right
      case 39:
        break;
      // down
      case 40:
        // 最后一个
        if (index === commands.length - 1) return;

        index = index + 1;

        commands.map((command, i) => {
          command.active = i === index;
        });
        this.setState(commands);
        break;
      default:
        break;
    }
  }

  render() {
    const WIDTH = 600;
    const PADDING = 5;
    const MARGIN = 5;
    const BORDER_WIDTH = 1;
    const inputWidth = WIDTH - PADDING * 2 - MARGIN * 2 - BORDER_WIDTH * 2;

    return (
      <div
        style={{
          width: WIDTH,
          margin: '0 auto',
          backgroundColor: 'rgb(68, 64, 64)',
          color: '#e3e3e3',
          border: '1px solid #e5e5e5'
        }}
      >
        <input
          id="command-search-box"
          ref="input"
          type="text"
          style={{
            padding: PADDING,
            width: inputWidth,
            border: '1px solid #e3e3e3',
            margin: MARGIN,
            boxSizing: 'content-box'
          }}
          value={this.state.value}
          onChange={event => {
            const value = event.target.value;
            this.setState({ value });
            this.search(value);
          }}
          onKeyDown={e => this.onKeyDown(e)}
        />
        <div style={{ margin: MARGIN }}>
          <ul style={{ listStyle: 'none' }}>
            {this.state.commands.map((command, i) => {
              return (
                <li
                  key={command.command}
                  style={{
                    lineHeight: PADDING * 2 + 'px',
                    padding: `${PADDING * 2}px 0`,
                    margin: `0 ${MARGIN}`,
                    backgroundColor: command.active === true
                      ? 'rgb(89, 89, 89)'
                      : 'inherit'
                  }}
                >
                  <span
                    style={{
                      padding: PADDING,
                      marginRight: MARGIN * 2,
                      backgroundColor: '#009688'
                    }}
                  >
                    {command.type}
                  </span>
                  <span>
                    {command.command}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
