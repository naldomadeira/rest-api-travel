import Hotel from '../models/Hotel'

class HotelController {
  async store(req, res) {
    const hotel = await Hotel.create(req.body)

    return res.json(hotel)
  }
}

export default new HotelController()
