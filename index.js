let baseUrl = 'https://opentdb.com/api.php?amount=10'

const fetchData = () => {
    fetch(baseUrl)
    .then(req => req.json())
    .then(res => {
        console.log('success' )

    })
}

fetchData()