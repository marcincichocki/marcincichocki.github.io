import $ from 'jquery';
import autosize from 'autosize';
import App from './App';


App
  .updateBackground()
  .toggleAnimation()
  .events();


// init autosize
autosize($('textarea'));
