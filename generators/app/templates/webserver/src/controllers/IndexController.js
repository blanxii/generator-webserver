export default class IndexController {
  handle(request, response) {
    <% if(options.templateEngine === true){ %>response.render('index', {
      appName: '<%= name %>',
    });
    <% }else if(options.templateEngine === false){ %>
    response.send('Hello world');
    <% } %>
  }
}
