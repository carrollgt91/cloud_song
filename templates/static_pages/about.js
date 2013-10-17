App.Templates['static_pages/about'] = _.template('\
<div class="row">\
  <div class="large-8 columns">\
    <h1>About Cloudsong</h1>\
    <p> For this project, I\'m building a site inspired heavily by <a href="https://www.soundcloud.com">Soundcloud</a>.\
    </p>\
    <p> It\'s by far my favorite web application, and the constraint of having music play as you navigate the site brings up some interesting technological challenges. The primary obstacle is being unable to utilize page redirects at all. This means that every interaction on the site must be asynchronous.\
    </p>\
\
    <p>In order to accomplish this, I\'m using a few tools and techniques that go beyond the scope of the class but are quite standard in modern web development. This page will give you an overview of the tools I\'m using and how the different parts of the application function come together.\
    </p>\
    <h2>Frameworks</h2>\
    <h4>Front end </h4>\
    <h5> <a href="http://foundation.zurb.com/">Zurb-foundation</a></h5>\
    <p>This is an incredible UI/Front end framework. Foundation allows you to make your websites beautiful without having to write a lot of the more common code yourself. The biggest perks are the grid system (which allows you to build your website for desktop and mobile simultaneously. It\'s built on <a href="http://sass-lang.com/">SASS</a>, which helps you keep your CSS concise and effective.</p>\
\
    <h4>Backbone</h4>\
    <h5><a href="http://backbonejs.org/">Backbone.js</a></h5>\
    <p>This framework is what\'s doing the heavy lifting in this application. It\'s built for Javascript, so the majority of the actual functionality of the site will be written on top of this framework. It is what allows me to change the content of the pages without having to redirect to any other pages.\
    </p>\
    <p>\
    Instead, it simply grabs information from the server/database asynchronously (using AJAX) and then repopulates the views on the front end according to what is returned. It has a templating engine (think how you replace parts of your html page with php), a routing engine (which is how it knows that /explore should render the template to list all the artists), and model functionality (which allows you to really easily and intuitively interact with the backend without having to write SQL in javascript. More on that later.)</p>\
    <h4> Back End </h4>\
    <h5> <a href="http://www.slimframework.com/">Slim</a></h5>\
    <p> Slim is a tiny PHP framework that takes care of some really common necessities in modern web development. It provides a number of functionalities that they describe well on the site, but the reason I\'m using it is for it\'s API functionality.\
\
    <h4> APIs </h4>\
    <p>\
      APIs (Or application programming interfaces) are the way modern web services provide data from servers to the any source who might need it. For Backbone to be able to interact with the database, it needs some way of talking to it through a secure, consistant channel. It does so by responding to requests at given <b>endpoints</b>.\
      </p> \
      <p>\
      For example, sending a GET request to the <a href="api/index.php/artists"> /artists </a> endpoint will return the data needed to populate a list of artists. Most APIs communicate with their clients via JSON (<b>J</b>ava<b>s</b>cript <b>O</b>bject <b>N</b>otation), because nearly every programming language can easily parse JSON, it\'s human readable, and Javascript itself is often the language that\'s consuming these APIs, which is the case for CloudSong as well The Backbone AJAX calls I mentioned earlier hit these endpoints in order to get information on artists, songs, tags, and all the other data that makes the app tick.\
      </p>\
    </p>\
  </div>\
</div>\
');