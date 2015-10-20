import $ from 'jquery';
import autosize from 'autosize';
import App from './App';


App
  .toggleAnimation()
  .carousel()
  .updateBackground()
  .events();


// init autosize
autosize($('textarea'));
