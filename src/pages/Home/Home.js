import React, { useState } from 'react'
import styles from './Home.module.css'

// Hooks
import { useUserContext } from '../../hooks/useUserContext'
import useAuth from '../../hooks/useAuth';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {

  const { user, setUser } = useUserContext()
  const { updateUserAuth } = useAuth()

  const [treinos, setTreinos] = useState(user.ficha.treinos)
  const [edit, setEdit] = useState([])
  const [refresh, setRefresh] = useState(false)

  async function addTreino() {
    const newTreino = {
      nome: 'Treino X',
      exercicios: [
        {
          nome: 'Exercicio X',
          series: 0,
          repeticoes: 0,
          observacoes: 'Nenhuma'
        }
      ]
    }
    const arr = treinos
    arr.push(newTreino)
    setTreinos(arr)
    let u = user
    u.ficha.treinos = treinos
    setUser(u)
    await updateUserAuth()
  }

  function addExercicio(ex) {
    ex.push({
      nome: 'Exercicio X',
      series: 0,
      repeticoes: 0,
      observacoes: 'Nenhuma'
    })
  }

  function deleteExercicio(treino, ex) {
    const i = treino.exercicios.indexOf(ex)
    treino.exercicios.splice(i, 1)
  }

  async function deleteTreino(treino) {
    let u = user
    const i = treinos.indexOf(treino)
    treinos.splice(i, 1)
    u.ficha.treinos = treinos
    setUser(u)
    await updateUserAuth()
  }

  function allowEdit(key) {
    let arr = edit
    arr.push(key)
    setEdit(arr)
  }

  async function save(key) {
    let u = user
    u.ficha.treinos = treinos
    await updateUserAuth()

    setUser(u)
    setEdit(edit.filter(e => e !== key))
  }

  return (
    <div className={styles.treinos}>
      <div style={{ display: 'none' }}>
        {setTimeout(() => {
          setRefresh(!refresh)
        }, 100)}
      </div>

      {treinos.length === 0 && <h1>Começe criando seu treino</h1>}
      <div className={styles.treinos}>

        {treinos.map((treino, k) => (
          <div className={styles.table} key={k}>
            <TableContainer component={Paper} className={styles.tableBody}>

              <div className={styles.headerTable}>
                {edit.includes(k) ? (
                  <TextField className={styles.in} value={treino.nome} label="Nome" variant="standard" onChange={(e) => { treino.nome = e.target.value }} />
                ) : (
                  <h2>{treino.nome && treino.nome.trim().length === 0 ? 'Treino sem nome' : treino.nome}</h2>
                )}
                <div>
                  <IconButton color={edit.includes(k) ? 'success' : 'warning'} onClick={() => { edit.includes(k) ? save(k) : allowEdit(k) }}>
                    {edit.includes(k) ? (
                      <CheckIcon />
                    ) : (
                      <EditIcon />
                    )}
                  </IconButton>

                  <IconButton size="small" color="error" aria-label="add" onClick={() => deleteTreino(treino)}>
                    <DeleteIcon />
                  </IconButton>

                </div>

              </div>
              <Table style={{ minWidth: 700 }} aria-label="customized table">
                <TableHead className={styles.tHead}>
                  <TableRow>
                    <TableCell>Exercicio</TableCell>
                    <TableCell align="right">Séries</TableCell>
                    <TableCell align="right">Repetições</TableCell>
                    <TableCell align="right">Observações</TableCell>
                    {edit.includes(k) && (<TableCell align="right">Apagar</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {treino && treino.exercicios.map((exercicio, g) => (
                    <TableRow key={g} className={styles.tHead}>
                      <TableCell component="th" scope="row">
                        {edit.includes(k) ? (
                          <TextField className={styles.in} value={exercicio.nome} label="Exercicio" variant="standard" onChange={(e) => { exercicio.nome = e.target.value }} />
                        ) : (
                          exercicio.nome && exercicio.nome.length === 0 ? 'Sem nome' : exercicio.nome
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {edit.includes(k) ? (
                          <TextField className={styles.in} value={exercicio.series} type='number' label="Séries" variant="standard" onChange={(e) => { exercicio.series = e.target.value }} />
                        ) : (
                          !exercicio.series ? 0 : exercicio.series
                        )}

                      </TableCell>
                      <TableCell align="right">
                        {edit.includes(k) ? (
                          <TextField className={styles.in} value={exercicio.repeticoes} type='number' label="Repetições" variant="standard" onChange={(e) => { exercicio.repeticoes = e.target.value }} />
                        ) : (
                          !exercicio.repeticoes ? 0 : exercicio.repeticoes
                        )}

                      </TableCell>
                      <TableCell align="right">
                        {edit.includes(k) ? (
                          <TextField className={styles.in} value={exercicio.observacoes} label="Observações" variant="standard" onChange={(e) => { exercicio.observacoes = e.target.value }} />
                        ) : (
                          exercicio.observacoes.trim().length === 0 ? 'Nenhuma' : exercicio.observacoes
                        )}
                      </TableCell>
                      {edit.includes(k) ? (
                        <TableCell align="right">
                          <div className={styles.addEx}>
                            <IconButton size="small" color="error" aria-label="add" onClick={() => deleteExercicio(treino, exercicio)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      ) : (<></>)}
                    </TableRow>
                  ))}
                  {edit.includes(k) ? (
                    <TableCell >
                      <div className={styles.addEx}>
                        <Fab size="small" color="info" aria-label="add" onClick={() => addExercicio(treino.exercicios)}>
                          <AddIcon />
                        </Fab>
                      </div>
                    </TableCell>

                  ) : (<></>)}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
      <div className={styles.add}>
        <Fab size="large" color="success" aria-label="add" onClick={addTreino}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}

export default Home