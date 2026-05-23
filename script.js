// ==========================================================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML
// ==========================================================================
const form = document.getElementById('currency-form');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');

// Elementos do Card de Resultado (Origem)
const imgFrom = document.getElementById('img-from');
const nameFrom = document.getElementById('name-from');
const valueFrom = document.getElementById('value-from');

// Elementos do Card de Resultado (Destino)
const imgTo = document.getElementById('img-to');
const nameTo = document.getElementById('name-to');
const valueTo = document.getElementById('value-to');

// ==========================================================================
// 2. TAXAS DE CÂMBIO FIXAS (baseadas no Real)
// ==========================================================================
const exchangeRates = {
    BRL: 1,
    USD: 0.20,
    EUR: 0.18,
    GBP: 0.15,
    BTC: 0.0000031
};

// Detalhes de cada moeda: nome, imagem e símbolo
const currencyDetails = {
    BRL: { name: 'Real Brasileiro',  img: './assets/real.png',   symbol: 'R$'  },
    USD: { name: 'Dólar Americano',  img: './assets/dolar.png',  symbol: 'US$' },
    EUR: { name: 'Euro',             img: './assets/euro.png',   symbol: '€'   },
    GBP: { name: 'Libra',           img: './assets/libra.png',  symbol: '£'   },
    BTC: { name: 'Bitcoin',          img: './assets/bitcon.png', symbol: '₿'   }
};

// ==========================================================================
// 3. FUNÇÃO PRINCIPAL DE CONVERSÃO
// ==========================================================================
function convertValues(event) {
    // Evita que a página recarregue ao enviar o formulário
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Valida se o valor digitado é um número positivo
    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, digite um valor válido.");
        return;
    }

    // --- CÁLCULO DA CONVERSÃO ---
    // Tudo passa pelo Real como "ponte": origem → BRL → destino
    const valueInBrl = amount / exchangeRates[fromCurrency];
    const finalValue = valueInBrl * exchangeRates[toCurrency];

    // Pega os detalhes das moedas escolhidas
    const detailsFrom = currencyDetails[fromCurrency];
    const detailsTo   = currencyDetails[toCurrency];

    // --- ATUALIZA O CARD DE ORIGEM ---
    imgFrom.src       = detailsFrom.img;
    imgFrom.alt       = detailsFrom.name;
    nameFrom.innerText = detailsFrom.name;

    // Usa o símbolo do nosso objeto — funciona com BTC também!
    valueFrom.innerText = `${detailsFrom.symbol} ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;

    // --- ATUALIZA O CARD DE DESTINO ---
    imgTo.src       = detailsTo.img;
    imgTo.alt       = detailsTo.name;
    nameTo.innerText = detailsTo.name;

    valueTo.innerText = `${detailsTo.symbol} ${finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;
}

// ==========================================================================
// 4. ESCUTADOR DE EVENTOS
// ==========================================================================
form.addEventListener('submit', convertValues);