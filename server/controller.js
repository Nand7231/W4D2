const db = require("./db.json")
const HouseId = 4

module.exports = {
    getHouses: (req, res) =>  res.status(200).send(db),
    deleteHouses: (req, res) => {
        let index = db.findIndex(elem => elem.id === +req.params.id)
        db.splice(index, 1)
        res.status(200).send(db)

    },
    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: HouseId,
            address,
            price,
            imageURL,
        }
        db.push(newHouse)
        res.status(200).send(db)
        HouseId++

    },
    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = db.findIndex(elem => +elem.id === +id)

        if (db[index].price <= 10000 && type === 'minus') {
            db[index].price = 0
            res.status(200).send(db)
        } else if (type === 'plus') {
            db[index].price += 10000
            res.status(200).send(db)
        } else if (type === 'minus') {
            db[index].price -= 10000
            res.status(200).send(db)
        } else {
            res.sendStatus(400)
        }

    }
    
}
