import React, { useState } from 'react'
import styles from '../LoginRegister.module.css'

// MUI
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';

// Hooks
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

function Register() {

    const { enqueueSnackbar } = useSnackbar();
    const { setUser } = useUserContext()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nascimento, setNascimento] = useState(undefined)
    const [cSenha, setCSenha] = useState('')

    const { loading, register } = useAuth()

    async function handleSubmit() {
        let variant = 'error'

        if (nome.trim().length === 0 || senha.trim().length === 0 || email.trim().length === 0 || !nascimento) {
            enqueueSnackbar('Todos os campos são obrigatórios', { variant });
            return
        }

        if (senha.trim().length < 6) {
            enqueueSnackbar('A senha deve ter mais de 6 caratéres', { variant });
            return
        }

        if (cSenha !== senha) {
            enqueueSnackbar('As senhas não estão iguais', { variant });
            return
        }



        const u = await register({ nome, email, senha, nascimento })

        if (!u) {
            enqueueSnackbar('Digite um email válido', { variant });
        } else {
            variant = 'success'
            setUser(u)
            enqueueSnackbar('Bem Vindo!', { variant });
        }



    }

    return (
        <div className={styles.container}>
            <form>
                <h1>Crie sua conta</h1>
                <TextField className={styles.in} value={nome} label="Nome" variant="standard" onChange={(e) => setNome(e.target.value)} />
                <TextField className={styles.in} value={email} label="Email" variant="standard" placeholder='email@email.com' onChange={(e) => setEmail(e.target.value)} />
                <div className={styles.password}>
                    <TextField className={styles.in} value={senha} label="Senha" variant="standard" type='password' onChange={(e) => setSenha(e.target.value)} />
                    <TextField className={styles.in} value={cSenha} label="Confirme a Senha" variant="standard" type='password' onChange={(e) => setCSenha(e.target.value)} />
                </div>
                <TextField className={styles.in} value={nascimento} variant="standard" type='date' onChange={(e) => setNascimento(e.target.value)} />


                <LoadingButton
                    className={styles.in}
                    size="large"
                    endIcon={<LoginIcon />}
                    loading={loading}
                    onClick={(e) => handleSubmit(e)}
                    loadingPosition="end"
                    variant="contained"
                >Cadastrar</LoadingButton>
            </form>
            <Link className={styles.btCadastro} to='/login'>
                <h3>Já possui conta?</h3>
            </Link>
        </div>
    )
}

export default Register