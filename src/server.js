import app from './application'

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on :${process.env.APP_URL}`)
})
