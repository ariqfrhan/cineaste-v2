const apiConfig = {
    baseUrl : process.env.REACT_APP_BASEURL,
    apiKey : process.env.REACT_APP_APIKEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;