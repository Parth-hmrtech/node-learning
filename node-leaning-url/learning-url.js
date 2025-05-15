const { URL } = require('url');
const myUrl =new URL("https://www.google.com/search?q=how+to+work+node+js&oq=how+to+work+node+js&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIICAIQABgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIICAUQABgWGB4yCAgGEAAYFhgeMggIBxAAGBYYHjIICAgQABgWGB4yCAgJEAAYFhge0gEINDU2OGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8");
console.log(myUrl.hostName);
console.log(myUrl.host);
console.log(myUrl.port);
console.log(myUrl.href);
console.log(myUrl.search);
console.log(myUrl.hash);
console.log(myUrl.origin);
console.log(myUrl.protocol);
console.log('searchParams:', myUrl.searchParams);

// Accessing searchParams
console.log('Query param q:', myUrl.searchParams.get('q'));

// If you really want to format a URL string again:
console.log('Formatted (again):', myUrl.toString());
console.log(myUrl);

