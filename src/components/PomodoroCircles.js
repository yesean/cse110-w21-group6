/**
 * @file pomodoro-circles web component
 */

import { createElement, validateNumber } from '../utils/utils';

/**
 * Validate if input is valid circle count (is Number and in range)
 * @param {any} value - value to check
 * @return {number | null} - circle count if valid, otherwise null
 */
const validateCircleCount = (value) => {
  const circleCount = validateNumber(value, true);
  if (circleCount === null || circleCount < 0 || circleCount > 4) {
    return null;
  }
  return circleCount;
};

/**
 * Custom web component representing pomodoro circles.
 * @extends HTMLElement
 */
class PomodoroCircles extends HTMLElement {
  static get observedAttributes() {
    return ['circle-count'];
  }

  constructor() {
    super();

    this._circleCount = 0;
    this.styleElement = createElement('style', {
      innerText: `
      .circle-container {
        display: flex;
      }
      
      .circle {
        height: 15px;
        width: 15px;
        border: 1px solid white;
        border-radius: 50%;
        margin: 15px 7px 0px;
        display: inline-block;
      }

      .circle.active {
        background-color: #fff;
      }
      `,
    });

    this.shadow = this.attachShadow({ mode: 'open' });
    // add html elements and styling
    this.counterContainer = createElement('div', {
      className: 'circle-container',
    });
    this.circles = new Array(4)
      .fill(null)
      .map(() => createElement('div', { className: 'circle' }));

    this.counterContainer.append(...this.circles);
    this.shadow.append(this.styleElement, this.counterContainer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'circle-count') {
      const circleCount = validateCircleCount(newValue);
      if (circleCount === null) {
        return;
      }

      this.circles.forEach((circle, i) => {
        if (i < circleCount) {
          circle.classList.add('active');
        } else {
          circle.classList.remove('active');
        }
      });
    }
  }

  get circleCount() {
    return this._circleCount;
  }

  set circleCount(value) {
    const circleCount = validateCircleCount(value);
    if (circleCount === null) {
      return;
    }

    this._circleCount = circleCount;
    this.setAttribute('circle-count', this._circleCount);
  }
}

export default PomodoroCircles;
