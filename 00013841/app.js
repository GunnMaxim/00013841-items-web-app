const express = require('express')
const app = express()
const fs = require('fs')



app.set('view engine','pug')

app.use('/static',express.static('public'))
app.use(express.urlencoded({extended: false}))
//localhost:8000
app.get('/',(req, res)=>{res.render('home')})

app.get('/create', (req,res)=>{res.render('create')} )

app.post('/create', (req,res)=>{
	const title = req.body.title
	const description = req.body.description
	const price = req.body.price
	


	if (title.trim()=== ''){
		res.render('create',{error: true})
	} else {
		fs.readFile('./database/items.json',(err, data) =>{
			if (err) throw err

			const items = JSON.parse(data)

			items.push({
				id: id(),
				title:title,
				description: description,
				price: price
			})


			fs.writeFile('./database/items.json', JSON.stringify(items), err =>{
				if (err) throw err

				res.render('create',{success:true})
			})
		})
	}


	
} )

app.get('/api/v1/00013841',(res,req)=>{
	fs.readFile('./database/items.json', (err,data)=>{
		if(err) throw err

		const items = JSON.parse(data)


		res.json(items)
	})
})


app.get('/notes', (req,res)=>{
	fs.readFile('./database/items.json', (err,data)=>{

		if(err) throw err

		const items = JSON.parse(data)


		res.render('notes', {items: items})
	})
} )

app.get('/notes/:id',(req,res)=>{
	const id = req.params.id

	fs.readFile('./database/items.json', (err,data)=>{

		if (err) throw err

		const items = JSON.parse(data)
		const item = items.filter(item => item.id == id)[0]

		res.render('detail', {item: item})
	})	
})

app.get('/api/v1/items',(req,res) =>{
 fs.readFile('./database/items.json',(err,data)=>{
 	if (err) throw err

 	const items = JSON.parse(data)
 	res.json(items)


 	})
})

app.listen(8000, err => {
    if (err) console.log(err)
    console.log('Server is running on port 8000...')
})


function id(){
	return '_' + Math.random().toString(36).substr(2,9)
}


app.get('/:id/delete',(req,res)=>{
	const id = req.params.id

	fs.readFile('./database/items.json',(err, data) =>{
			if (err) throw err

			const items = JSON.parse(data)

			const filteredItems = items.filter(item => item.id != id)

			fs.writeFile('./database/items.json', JSON.stringify(filteredItems), (err)=>{
				if (err) throw err

				res.render('notes',{items:filteredItems,deleted: true})
			})



		})
})






app.get('/:id/update',(req,res)=>{
        let id = req.params.id
        let item = getAll('items').find(item => item.id == id)
        res.render('create', { item: item })
    })
    .put((req, res) => {
        let id = req.params.id

        let items = getAll('items')

        let item = items.find(item => item.id == id)

        let idx = items.indexOf(item)

        item[idx].title = req.body.data.title
        item[idx].price = req.body.data.price
        item[idx].description = req.body.data.description

        saveAll('items', items)

        res.json({ updated: true })
    })



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./database/items.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./database/items.json`, JSON.stringify(data))
}