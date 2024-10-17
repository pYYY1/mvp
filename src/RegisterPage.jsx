import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/organizadores', { nome, email, senha });
            console.log('Organizador cadastrado:', response.data);
            navigate('/login'); // redireciona para a página de login
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao cadastrar');
        }
    };

    return (
        <section className="bg-[#4B5842] h-screen flex items-center justify-center">
            <div className="flex w-full max-w-3xl">
                <div className="flex-1 w-full bg-white rounded-[12px] shadow-lg border border-[#8FB339] p-10 flex">
                    <div className="flex justify-center items-center w-3/6">
                        <img 
                            src='/img/Logo PNG (estranho).png'
                            className="max-w-full"
                            alt="Logo"
                        />
                    </div>
                    <div className="flex-1 w-full p-6">
                        <h2 className="text-xl font-semibold text-[#4B5842] text-center mb-4">Cadastre-se</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <img src="/img/usercadastro.png" alt="Usuário" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-3 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Nome Completo" 
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <img src="/img/email.png" alt="Email" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-3 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <img src="/img/cadeado.png" alt="Senha" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    id="password" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-10 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Senha" 
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility} 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                >
                                    <img 
                                        src={showPassword ? "/img/olhofechado.png" : "/img/olho.png"} 
                                        alt={showPassword ? "Ocultar Senha" : "Mostrar Senha"} 
                                        className="h-4 w-4" // Tamanho diminuído
                                    />
                                </button>
                            </div>
                            <div className="relative">
                                <img src="/img/cadeado.png" alt="Confirmar Senha" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-3 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Confirmar Senha" 
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required 
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button 
                                type="submit" 
                                className="w-full text-white bg-[#8FB339] hover:bg-[#7A9E2E] focus:ring-4 focus:outline-none focus:ring-[#4B5842] font-medium rounded-[8px] text-sm px-5 py-2.5 text-center transition-colors duration-200 font-inter"
                            >
                                Cadastrar
                            </button>
                            <p className="text-sm text-center text-[#8FB339] font-inter">
                                Já possui uma conta? 
                                <a href="/login" className="font-medium text-[#4B5842] hover:underline">Faça Login</a>
                            </p>
                        </form>
                    </div>
                </div>
                <button 
                    onClick={handleBack} 
                    className="absolute top-5 left-5 text-white bg-[#8FB339] hover:bg-[#7A9E2E] focus:ring-4 focus:outline-none focus:ring-[#4B5842] font-medium rounded-[8px] text-sm px-5 py-2.5 transition-colors duration-200 font-inter"
                >
                    Voltar
                </button>
            </div>
        </section>
    );
}
