import Ember from 'ember';

var Story = Ember.Object.extend({
  id: null,
  title: null,
  url: null,
  by: null,
  score: null,
  time: null
});

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    var ajax = this.get('ajax');
    return ajax.request("https://hacker-news.firebaseio.com/v0/topstories.json").then(function(data){
      let topStories = data.slice(0,30);
      return topStories.map(function(storyId) {
        return Story.create({
          id: storyId
        });
      });
    }).then(function(stories) {
      stories.forEach(function(story){
        let id = story.get('id');
        ajax.request("https://hacker-news.firebaseio.com/v0/item/"+ id +".json").then(function(data){
          story.setProperties(data);
         });
      });
      return stories;
    });
  }
});
