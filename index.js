const container = document.getElementById('articles-container');

function createArticleElement(article) {
  const articleEl = document.createElement('div');
  articleEl.classList.add('post');

  const imgEl = document.createElement('img');
  imgEl.src = article.picture_links[0];
  imgEl.alt = "post image";
  articleEl.appendChild(imgEl);

  const titleEl = document.createElement('h3');
  titleEl.textContent = article.title;
  articleEl.appendChild(titleEl);

  const subtitleEl = document.createElement('p');
  subtitleEl.textContent = article.subtitle;
  articleEl.appendChild(subtitleEl);

  const readMoreEl = document.createElement('a');
  readMoreEl.classList.add('read-more');
  readMoreEl.href = `article.html?id=${article.id}`;
  readMoreEl.textContent = "Read More";
  articleEl.appendChild(readMoreEl);

  return articleEl;
}

async function createArticlesList() {
  const response = await fetch('data.json');
  const articlesData = await response.json();
  articlesData.forEach(articleObj => {
    articleObj.articles.forEach(article => {
      const articleEl = createArticleElement(article);
      container.appendChild(articleEl);
    });
  });
}

createArticlesList();
