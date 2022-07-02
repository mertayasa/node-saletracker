import dotenv from 'dotenv'
import fs from 'fs'

const index = (req, res) => {
    const article = fs.readFileSync('./data/articles.json', 'utf8')

    const data = {
      title: 'Home Page',
      article: JSON.parse(article),
      appEnv: process.env.NODE_ENV,
    }
  
    if(process.env.NODE_ENV === 'development') {
      data.appEnv = 'Local Development'
    }
  
    res.render('home/index', data)
}

const about = (req, res) => {
    res.send('page about')
}

export default {
    index,
    about
}