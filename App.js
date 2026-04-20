import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Share2, Wallet, Activity, ArrowUpRight, ShieldCheck } from 'lucide-react';

const App = () => {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('Disconnected');
  const [earnings, setEarnings] = useState("0.0000");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setStatus('Active & Sharing');
      } catch (err) {
        console.error("User denied access");
      }
    } else {
      alert("Por favor instala MetaMask");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Share2 className="text-blue-500" size={32} />
          <span className="text-xl font-bold tracking-tight">ETH-SHARE</span>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2"
        >
          <Wallet size={18} />
          {account ? `${account.substring(0,6)}...${account.substring(38)}` : "Connect MetaMask"}
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Monetiza tu internet sobrante en <span className="text-blue-500">Ethereum</span>.
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Únete a la red descentralizada de nodos más grande. Sin comisiones de retiro (No-Fee) y pagos instantáneos a tu wallet.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-slate-200 transition">
                Empezar Ahora
              </button>
              <button className="border border-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
                Documentación
              </button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Activity className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Estado del Nodo</p>
                  <p className="font-bold text-green-400">{status}</p>
                </div>
              </div>
              <ShieldCheck className="text-slate-500" />
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Ganancias Acumuladas</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-mono font-bold">{earnings}</span>
                  <span className="text-blue-500 font-bold mb-1">ETH</span>
                </div>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold flex justify-center items-center gap-2 hover:opacity-90 transition">
                Retirar sin Fee <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
