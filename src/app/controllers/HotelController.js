import Hotel from '../models/Hotel'

class HotelController {
  async index(req, res) {
    const hotels = await Hotel.findAll({
      include: ['rooms'],
    })

    return res.json(hotels)
  }

  async store(req, res) {
    const hotel = await Hotel.create(req.body)

    return res.json(hotel)
  }
}

export default new HotelController()
