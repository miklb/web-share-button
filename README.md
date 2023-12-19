# web-share-button
A HTML web component for sharing links

I have been reading a lot of blog posts lately about HTML Web Components and they finally are starting to click.

So when I was reading this post from Aaron Gustafson about how he's [progressively enhacing his share button](https://www.aaron-gustafson.com/notebook/sharing-in-the-age-of-3p-cookie-mageddon/), it sure sounded like what he was describing was an HTML web component. 

Scott Jehl recently walked through writing a web component for [responsive video](https://scottjehl.com/posts/even-responsiver-video/) and I used Stefan Judis' [sparkly-text](https://github.com/stefanjudis/sparkly-text) as a starting point for this project.

## Usage
`index.html` provides a basic example using Aaron's orignal code from his [demo](https://codepen.io/aarongustafson/pen/eYxajwy). 

Note you'll want to style your unordered list for graceful degradation. The button style is only applied if the browser supports the web component. The example uses Aaron's original CSS.

The idea is you wrap your unordered list with `<web-share>` `</web-share>` tags and the component will add the share button to each list item.
