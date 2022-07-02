import Article from "../models/Article.mjs"
import User from "../models/User.mjs"
import fs from 'fs'

const index = (req, res) => {
    Article.find().sort({ createdAt: -1 })
        .then((articles) => {
            let modifiedArticles = articles.map(article => ({
                ...article._doc,
                thumbnail: article.thumbnail ? article.thumbnail : "/images/logo.png",
                createdAt: article._doc.createdAt.toDateString(),
            }))

            const data = {
                title: "Article Page",
                articles: modifiedArticles,
            }

            res.render("article/index", data)
        })
        .catch(err => res.send(err))
}

const paginate = (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 2

    Article.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .then(articles => {
            let modifiedArticles = articles.map(article => ({
                ...article._doc,
                thumbnail: article.thumbnail ? article.thumbnail : "/images/logo.png",
                createdAt: article._doc.createdAt.toDateString(),
            }))

            Article.countDocuments({}, (err, count) => {
                return res.render("article/index_paginate", {
                    title: "Article Page",
                    pages: Math.floor(count / limit),
                    current: page,
                    articles: modifiedArticles,
                })
            })
        })
        .catch(err => res.send(err))
}

const create = async(req, res) => {
    const data = {
        title: "Create Article Page",
    }

    const users = await User.find({}, 'name id')

    return res.json(users)

    res.render("article/create", data)
}

const store = (req, res) => {
    let articleData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        thumbnail: null,
    }

    if (req.file) {
        articleData.thumbnail = `/${req.file.path.split('/').slice(1).join('/')}`
    }

    const article = new Article(articleData)
    article.save()
        .then(() => res.json({code: 1}))
        .catch(err => {
            console.log(err)
            res.json({code: 0, message: err.message})
        })
}

const find = (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            res.json({code: 1, article: article})
        })
        .catch(err => res.send({code: 0, message: err.message}))
}

const edit = (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            const data = {
                title: "Edit Article Page",
                article: article,
            }

            res.render("article/edit", data)
        })
        .catch(err => res.send(err))
}

const update = (req, res) => {
    let articleData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        thumbnail: null,
    }

    if (req.file) {
        articleData.thumbnail = `/${req.file.path.split('/').slice(1).join('/')}`
        Article.findById(req.params.id)
        .then(article => {
            if(article.thumbnail) {
                console.log('../public' + article.thumbnail)
                fs.unlink('./public' + article.thumbnail)
            }
        })
    }

    Article.findByIdAndUpdate(req.params.id, articleData)
    .then(() => res.json({code: 1}))
    .catch(err => {
        console.log(err)
        res.json({code: 0, message: err.message})
    })
}

const destroy = (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(() => res.json({code: 1}))
        .catch(err => {
            console.log(err)
            res.json({code: 0, message: err.message})
        })
}

export default {
    index,
    paginate,
    create,
    store,
    find,
    edit,
    update,
    destroy,
}