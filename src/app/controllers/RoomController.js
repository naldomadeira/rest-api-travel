import Room from '../models/Room'
import Hotel from '../models/Hotel'

class RoomController {
  async store(req, res) {
    const { hotel_id } = req.body

    const hotelExists = await Hotel.findOne({
      where: {
        id: hotel_id,
      },
    })

    if (!hotelExists) {
      res.status(400).json({ error: "Hotel don't exist'" })
    }

    const room = await Room.create(req.body)

    return res.json(room)
  }
}

export default new RoomController()
