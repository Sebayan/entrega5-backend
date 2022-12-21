const express = require('express')
const productRouter = require('./routes/productRouter')
const products = require('./class/productsClass')
const path = require ("path")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', path.resolve(__dirname, './views'))

app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.render('ejs/form.ejs')
})

app.get('/productos', async (req, res) => {
  let productos = await products.getAll()
  res.render('ejs/table.ejs', { productos })
})


app.use('/api', productRouter)




const PORT = 8080
const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
)

server.on('error', err => console.log(`Error: ${err}`));
