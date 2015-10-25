import $ from 'jquery';
import autosize from 'autosize';
import svg4everybody from 'jonathantneal/svg4everybody';
import App from './App';


App
  .toggleAnimation()
  .updateBackground()
  .events();


// init autosize
autosize($('textarea'));

// svg polyfill for Internet Explorer
svg4everybody();