var homeContent = `<div class="hero">
<div class="text">
<p style="text-decoration:underline;">Article</p>
<h1>iTravel's Top 10 places to<br>
  travel in the United Kingdom
</h1>
<p>by Lorem Ipsum</p>
</div>
</div>
<div class="articles">
<div class="header">
  <h1>Top stories</h1>
  <p style="text-decoration:underline;">View all</p>
</div>
<div class="cards-wrap">
  <div class="article-card">
    <img src="images/card1.jpeg" alt="img">
    <p style="font-weight: bold;">Sept. 16</p>
    <h4>All About Greece</h4>
    <p style="color:grey; line-height: 25px;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam officiis neque dignissimos enim commodi consectetur.</p>
  </div>
  <div class="article-card">
    <img src="images/card2.jpeg" alt="img">
    <p style="font-weight: bold;">Sept. 13</p>
    <h4>All About Greece</h4>
    <p style="color:grey; line-height: 25px;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, repellendus.</p>
  </div>
  <div class="article-card">
    <img src="images/card3.jpeg" alt="img">
    <p style="font-weight: bold;">Sept. 10</p>
    <h4>Travelling on a Budget: Van Life Edition</h4>
    <p style="color:grey; line-height: 25px;">Lorem ipsum dolor sit amet consectetur.</p>
  </div>
  <div class="article-card">
    <img src="images/card4.jpeg" alt="img">
    <p style="font-weight: bold;">Sept. 6</p>
    <h4>Your Hiking MUST-HAVES</h4>
    <p style="color:grey; line-height: 25px;">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum necessitatibus aliquam praesentium dolore quidem.</p>
  </div>
</div>
</div>
<footer>
<p>© 2023  iTravel. All Rights Reserved</p>
</footer>`;
var aboutContent = `<h1>About Page</h1>`;
var blogContent = `<h1>Services Page</h1>`;
var contactContent = `<h1>Contact Page</h1>`;

export function addPageContent(pageName) {
    let pageContentName = pageName + "Content";
    $("#app").html(eval(pageContentName));
}
