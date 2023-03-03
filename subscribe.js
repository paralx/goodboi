const form = document.getElementById('subscribe-form')
const successMessage = 'You are subscribed! Check your email for confirmation.'

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const campaignToken = 'Mi7NN'

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://api.getresponse.com/v3')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('X-Auth-Token', 'j2f9s33sctcs28i4jyk6umkrrm02fdq4')

    xhr.onload = () => {
        if(xhr.status === 201) {
            form.innerHTML = successMessage
        } else {
            const error = JSON.parse(xhr.responseText).message
            console.log(error)
        }
    }

    xhr.send(JSON.stringify({
        email, campaign: {
            campaignId: campaignToken
        }
    }))
})
