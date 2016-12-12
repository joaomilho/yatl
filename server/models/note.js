import fs from 'fs'

const dbPath = 'server/db/notes.json'

export function all() {
  const notes = JSON.parse(fs.readFileSync(dbPath, {encoding: 'utf-8'}))['notes']
  return notes
}

export function add(note) {
  note.id = nextId()
  note.createdAt = new Date().getTime()
  const notes = [note, ...all()]
  save(notes)
  return note
}

export function remove(id) {
  validateExistence(id)

  const notes = all().filter(note => note.id != id)
  return save(notes)
}

export function update(id, data) {
  validateExistence(id)

  const notes = all().map(note => note.id == id ? {...note, ...data} : note)
  return save(notes)
}

const nextId = () =>
  Math.max(...all().map(note => note.id)) + 1

function validateExistence(id) {
  if (!all().filter(note => note.id == id)[0])
    throw(new Error(`Note with id ${id} not found`))
}

function save(notes) {
  fs.writeFileSync(dbPath, JSON.stringify({notes: notes}), {encoding: 'utf-8'})
  return true
}
