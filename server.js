import app from './app'

const port = 3003
app.listen(port, () => {
  console.log(`Escutando porta ${port}`)
  console.log(`CTRL + Clique para acessar: http://localhost:${port}`)
})
