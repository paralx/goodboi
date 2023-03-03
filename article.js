const titleEl = document.getElementById('article-title')
const contentEl = document.getElementById('article-content')

function displayArticle(article) {
  titleEl.textContent = article.title
  const contentLength = article.Content.length
  const pictureLength = article.picture_links.length
  const maxLength = Math.max(contentLength, pictureLength)
  for (let i = 0; i < maxLength; i++) {
    if (i < contentLength) {
      const p = document.createElement('p')
      p.textContent = article.Content[i]
      contentEl.appendChild(p)
    }
    if (i < pictureLength) {
      const img = document.createElement('img')
      img.src = article.picture_links[i]
      img.classList.add('article-image')
      contentEl.appendChild(img)
    }
  }
  if (article.video_embed) {
    const decoded = document.createElement('div')
    decoded.innerHTML = article.video_embed
    const video = decoded.querySelector('iframe')
    video.classList.add('article-video')
    contentEl.appendChild(video)
  }
  if (article.twitter_embed) {
    const div = document.createElement('div');
    div.innerHTML = article.twitter_embed;
    div.classList.add('article-tweet');
    contentEl.appendChild(div);
    twttr.widgets.load();
  }
}

function getArticleId() {
  const params = new URLSearchParams(window.location.search)
  return params.get('id')
}

async function fetchArticle() {
  const response = await fetch('data.json')
  const articlesData = await response.json()
  const articleId = getArticleId()
  let selectedArticle = null
  articlesData.forEach((articleObj) => {
    const article = articleObj.articles.find((a) => a.id == articleId)
    if (article) {
      selectedArticle = article
    }
  })
  if (!selectedArticle) {
    console.log(`Article with id ${articleId} not found`)
    return
  }
  displayArticle(selectedArticle)
}

fetchArticle()
