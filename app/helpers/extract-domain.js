import Ember from 'ember';

export function extractDomain(params) {
  let url = params[0];
  if(Ember.isEmpty(url)) {
    return "";
  }
  let domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  //find & remove port number
  domain = domain.split(':')[0];

  // remove www.
  if(domain.search('www.') !== -1) {
    domain = domain.substring(4,domain.length);
  }

  return domain.toLowerCase();
}

export default Ember.Helper.helper(extractDomain);
