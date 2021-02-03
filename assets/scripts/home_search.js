/** Create lunr index **/
var idx = lunr(function () {
  console.log('creating index...', window.searchschede);
  // disable stemmer as it is the english stemmer
  this.pipeline.remove(lunr.stemmer)

  this.ref('metaname');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('subtitle');
  this.field('url');
  this.field('type');
  this.field('subject');
  this.field('category');
  this.field('year');
  this.field('ente');
  this.field('number');
  this.field('tags');

  console.log('window.searchschede', window.searchschede);

  for (let key in window.searchschede) { // Add the data to lunr
    console.log('adding key', key);
    let entry = {
      'metaname': key,
      'title': window.searchschede[key].title,
      'description': window.searchschede[key].description,
      'subtitle': window.searchschede[key].subtitle,
      'url': window.searchschede[key].url
    }
    this.add(entry);
  }

  for (let doc_key in window.docs) { // Add the data to lunr
    this.add({
      'metaname': doc_key,
      'title': window.docs[doc_key].title,
      'tema': window.docs[doc_key].tema,
      'subject': window.docs[doc_key].subject,
      'category': window.docs[doc_key].category,
      'year': window.docs[doc_key].year,
      'ente': window.docs[doc_key].ente,
      'number': window.docs[doc_key].number,
      'url': window.docs[doc_key].url,
      'tags': window.docs[doc_key].tags
    });
  }

  for (let news_key in window.news) { // Add the data to lunr
    this.add({
      'metaname': news_key,
      'title': window.news[news_key].title,
      'subtitle': window.news[news_key].subtitle,
      'category': window.news[news_key].category,
      'year': window.news[news_key].year,
      'tags': window.news[news_key].tags
    });
  }

});

let search_for = '';

const formSubmit = function() {
  console.log('index:', idx.tokenSet.toArray())
  search_for = $('#home-cerca').val();
  console.log('searching for', search_for)

  const results = idx.search('*' + search_for + '*');
  // const results = idx.search('tema:*' + search_for + '*^100 *' + search_for + '*');
  console.log(results)
  displayResults(results);
}

/*var addResultItems = function(label, itemArray, _baseurl) {
  var appendString = '';
  if ( itemArray.length > 0 ) {
    appendString += '<h3 class="u-cf u-textLeft u-color-50 u-borderHideFocus u-margin-top-xs u-margin-bottom-xs" id="modal-title" tabindex="0">' + label + '</h3>';
    appendString += '<ul id="' + label + '-result-list">';

    $.each(itemArray, function(key,item) {
      appendString += '<li class="u-textLeft u-text-xs"><a href="' + _baseurl + item.url + '">' + item.title + '</a></li>';
    });

    appendString += '</ul><div class="u-background-grey-30 u-margin-top-xs u-padding-top-xxs"></div>';
  }
  $('#dialog-results-content').append(appendString);
}
*/
const addResultItems = function(label, itemArray, _baseurl) {
  let appendString = '';
  const appendTo = '#' + label + '-result-list';
  // console.log('home_search.js: adding result list to #', appendTo)
  if ( itemArray.length > 0 ) {
    $.each(itemArray, function(key,item) {
      appendString += '<li class="u-textLeft u-text-xs"><a href="' + _baseurl + item.url + '">' + item.title + '</a></li>';
    });
  }

  $(appendTo).append(appendString);
}

const showResults = function() {
  $('#results-div').show();
  $('#no-results-div').hide();
}

const showNoResults = function() {
  $('#results-div').hide();
  $('#no-results-div').show();
}

const displayResults = function(results) {
  // reset
  $('.search-listing').html('');

  var schedeResults = [], docsResults = [], newsResults = [];

  if (results.length > 0) { // Are there any results?
    showResults();

    for (var i = 0; i < results.length; i++) {  // Iterate over the results

      // console.log('homesearch.js results: ', results)

      var key = results[i].ref;

      // console.log('homesearch.js key: ', key)

      if ( key in searchschede) {
        schedeResults.push(searchschede[key]);
      } else if ( key in docs ) {
        docsResults.push(docs[key]);
      } else if ( key in news ) {
        newsResults.push(news[key]);
      }

      //appendString += '<li style="text-align:left"><a href="' + baseurl + item.url + '">' + item.title + ' (' + item.type + ') </a></li>';
    }

    addResultItems('schede', schedeResults, baseurl);
    addResultItems('docs', docsResults, '');
    addResultItems('news', newsResults, '');

  } else {
    // no results
    showNoResults();
  }
}

$(function() {
  /* submit handling */
  $('#home-search-form').on('submit', function(event) {
    event.preventDefault();
    formSubmit();
  });
});
