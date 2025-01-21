import React, { useState } from 'react';
import styles from '../ui/styles/Calculator.module.css';
import { FiDelete } from "react-icons/fi";
import { FaDivide } from "react-icons/fa6";
let valor1 = 0;
let valor2 = 0;
let operador = "";
let resultado;

function Home() {
    const [inputCalc, setInputCalc] = useState("0");
    const [result, setResult] = useState("0");
    const [history, setHistory] = useState("");

    function numberCalc(value) {
        if (parseInt(inputCalc) == 0) {
            setInputCalc(value)
        }
        else {
            if (value == "+/-") {
                setInputCalc(parseFloat(inputCalc + value) * (-1))
            }
            else if (value == '%') {
                if (operador == '*' || operador == '/') {
                    setInputCalc(parseFloat(inputCalc) / (100))
                }
                else {
                    setInputCalc(valor1 * (parseFloat(inputCalc) / (100)))
                }
            }
            else {
                setInputCalc(inputCalc + value)
            }
        }
    }

    function operacaoCalc(value) {
        const operacoes = ['+', '-', '*', '/', '%']
        if (valor1 == 0) {
            valor1 = inputCalc
        }

        else {
            valor2 = inputCalc
            calcular()
        }

        operador = value

        if (value != "=") {
            setInputCalc("0")
            if (inputCalc == '0' && operacoes.indexOf((history).substring(history.length - 1)) >= 0) {
                setHistory(((history).slice(0, -1)) + value)
            }
            else {
                if ((history).substring(history.length - 1) !== (history).substring(1)) {
                    setHistory((history + "(" + inputCalc + ")" + value))
                }
                else {
                    setHistory((history + inputCalc + value))
                }
            }
        }

        else {
            setInputCalc(resultado?.toString())
            setHistory("")
        }
    }

    function calcular() {
        switch (operador) {
            case "+":
                resultado = (parseFloat(valor1) + parseFloat(valor2))
                break;
            case "-":
                resultado = (parseFloat(valor1) - parseFloat(valor2))
                break;
            case "*":
                resultado = (parseFloat(valor1) * parseFloat(valor2))
                break;
            case "/":
                resultado = (parseFloat(valor1) / parseFloat(valor2))
                break;
            default:
                break;
        }
        valor1 = resultado
        valor2 = 0
        setResult(resultado)
    }

    function limparCalc() {
        setInputCalc("0")
        setResult("0")
        valor1 = 0
        valor2 = 0
        operador = ''
        setHistory("")
    }

    function deletarNum() {
        if (parseInt(inputCalc) != 0) {
            let value = inputCalc.slice(0, -1)
            setInputCalc(value)
            if (value.length == 0) {
                setInputCalc("0")
            }
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.containerVisor}>
                    <input value={history} disabled />
                    <input value={inputCalc} disabled />
                </div>
                <div className={styles.containerCalc}>
                    <div>
                        <a onClick={() => numberCalc('%')}>%</a>
                        <a onClick={() => operacaoCalc('*')}>x</a>
                        <a onClick={() => limparCalc()} className={styles.importBtn}>CE</a>
                        <a onClick={() => deletarNum()} className={styles.importBtn}><FiDelete size={20} /></a>
                    </div>
                    <div>
                        <a onClick={() => numberCalc('7')}>7</a>
                        <a onClick={() => numberCalc('8')}>8</a>
                        <a onClick={() => numberCalc('9')}>9</a>
                        <a onClick={() => operacaoCalc('/')}><FaDivide size={20} /></a>
                    </div>
                    <div>
                        <a onClick={() => numberCalc('4')}>4</a>
                        <a onClick={() => numberCalc('5')}>5</a>
                        <a onClick={() => numberCalc('6')}>6</a>
                        <a onClick={() => operacaoCalc('-')}>-</a>
                    </div>
                    <div>
                        <a onClick={() => numberCalc('1')}>1</a>
                        <a onClick={() => numberCalc('2')}>2</a>
                        <a onClick={() => numberCalc('3')}>3</a>
                        <a onClick={() => operacaoCalc('+')}>+</a>
                    </div>
                    <div>
                        <a onClick={() => numberCalc('0')}>0</a>
                        <a onClick={() => numberCalc('+/-')}>+/-</a>
                        <a onClick={() => numberCalc('.')}>.</a>
                        <a onClick={() => operacaoCalc('=')} className={styles.importBtn}>=</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;