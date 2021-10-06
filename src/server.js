const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')
const Views = require('koa-views')

const app = new Koa()
const router = new Router()

router.get('/(.*)', async (ctx) => {
  await ctx.render('index')
})

app.use(Views(path.join(__dirname, '../dist'), {extension: 'html'}))
app.use(Static(path.join(__dirname, '../dist')))
app.use(router.routes())

app.listen(80)

