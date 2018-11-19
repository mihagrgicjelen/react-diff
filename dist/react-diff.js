'use strict';

var jsdiff = require('diff');
import React, { Component } from 'react';
import PropTypes from 'prop-types';


var fnMap = {
  'chars': jsdiff.diffChars,
  'words': jsdiff.diffWords,
  'sentences': jsdiff.diffSentences,
  'json': jsdiff.diffJson
};

export default class Diff extends Component {
  
  getDefaultProps() {
    return {
      inputA: '',
      inputB: '',
      type: 'chars'
    };
  }
 
  render() {
    var diff = fnMap[this.props.type](this.props.inputA, this.props.inputB);
    var result = diff.map(function (part, index) {
      var spanStyle = {
        backgroundColor: part.added ? 'lightgreen' : part.removed ? 'salmon' : 'lightgrey'
      };
      return React.createElement(
        'span',
        { key: index, style: spanStyle },
        part.value
      );
    });
    return React.createElement(
      'pre',
      { className: 'diff-result' },
      result
    );
  }
}


Diff.proptypes = {
  inputA: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputB: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.oneOf(['chars', 'words', 'sentences', 'json'])
}


