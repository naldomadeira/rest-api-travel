import { Router } from 'express'

import Hotel from './app/models/Hotel'

const router = new Router()

router.get('/', async (req, res) => {
  const hotel = await Hotel.create({
    name: 'Hotel Primavera',
    country: 'Brazil',
    details: 'Hotel com 30 anos de história',
    address: 'Av.Beira mar, 2356, Ceará',
  })
  res.json(hotel)
})

export default router
