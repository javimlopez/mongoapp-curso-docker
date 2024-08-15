/*
  El objetivo de esta aplicación es que se conecte a una instancia de Mongo
  que esté en un container de Docker y realice las acciones especificadas abajo.

*/
import express from 'express' // Framework de node.js
import mongoose from 'mongoose' // Permite conectarse con MongoDB

/* Modelo de dos atributos */
const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

/* Crear aplicación y conexión a servidor de base de datos */
const app = express()
mongoose.connect('mongodb://nico:password@monguito:27017/miapp?authSource=admin')

/* Busca en el directorio raíz y devuelve los animales existentes en la base de datos */
app.get('/', async (_req, res) => {
  console.log('listando... chanchitos')
  const animales = await Animal.find();
  return res.send(animales)
})
/* Crea un animal en la base de datos */ 
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})
/* La app escucha en el puerto 3000 */
app.listen(3000, () => console.log('listening...'))
