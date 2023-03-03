const titleEl = document.getElementById('article-title');
const contentEl = document.getElementById('article-content');

function displayArticle(article) {
    titleEl.textContent = article.title;
    const contentLength = article.Content.length;
    const pictureLength = article.picture_links.length;
    const maxLength = Math.max(contentLength, pictureLength);
    for (let i = 0; i < maxLength; i++) {
      if (i < contentLength) {
        const p = document.createElement('p');
        p.textContent = article.Content[i];
        contentEl.appendChild(p);
      }
      if (i < pictureLength) {
        const img = document.createElement('img');
        img.src = article.picture_links[i];
        img.classList.add('article-image');
        contentEl.appendChild(img);
      }
    }
    if (article.video_link) {
      const video = document.createElement('iframe');
      video.src = article.video_link;
      video.classList.add('article-video');
      contentEl.appendChild(video);
    }
  }
  

function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchArticle() {
  const response = await fetch('data.json');
  const articlesData = await response.json();
  const articleId = getArticleId();
  let selectedArticle = null;
  articlesData.forEach(articleObj => {
    const article = articleObj.articles.find(a => a.id == articleId);
    if (article) {
      selectedArticle = article;
    }
  });
  if (!selectedArticle) {
    console.log(`Article with id ${articleId} not found`);
    return;
  }
  displayArticle(selectedArticle);
}

fetchArticle();