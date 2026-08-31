import { FaDollarSign } from "react-icons/fa";

export function getNow() {
    return new Date().toLocaleString('pt-BR');
}

export async function getCurrentYear(setCurrentYearOnline = new Function(),
    setError = new Function(), setSuccess = new Function()) {
    const apis = [
        'http://worldtimeapi.org/api/timezone/Etc/UTC',
        'https://timeapi.io/api/time/current/zone?timeZone=UTC',
    ];

    for (const url of apis) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos de timeout

            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                // A TimeAPI traz o ano direto no campo 'year', já a WorldTimeAPI traz no 'datetime'
                const ano = data.year || new Date(data.datetime).getFullYear();
                setCurrentYearOnline(ano);
                return data;
                break
            }
        } catch (e) {
            // Se falhar esta API, passa para a próxima da lista
            continue;
        }
    }

    // Se todas as APIs de rede falharem, usa a data do dispositivo como última opção
    return new Date().getFullYear();
}

export async function getWeatherByLocation() {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. Verifica se o navegador suporta geolocalização
            if (typeof window === 'undefined' || !('geolocation' in navigator)) {
                throw new Error('Geolocalização não é suportada por este navegador');
            }

            // 2. Obtém a posição atual do navegador encapsulada em uma Promise
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                });
            });

            const { latitude, longitude } = position.coords;

            // 3. Chamada em paralelo para o clima (Open-Meteo) e a cidade (BigDataCloud)
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
            const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;

            const [weatherResponse, geoResponse] = await Promise.all([
                fetch(weatherUrl),
                fetch(geoUrl)
            ]);

            if (!weatherResponse.ok) {
                throw new Error('Falha ao buscar dados meteorológicos');
            }

            const weatherData = await weatherResponse.json();
            const geoData = geoResponse.ok ? await geoResponse.json() : null;

            const currentWeather = weatherData.current_weather;

            // 4. Monta o objeto com o nome da cidade e estado
            const dataWeather = {
                cidade: geoData?.city || geoData?.locality || 'Cidade desconhecida',
                estado: geoData?.principalSubdivisionCode?.replace('BR-', '') || '',
                temperatura: Math.round(currentWeather.temperature),
                codigoClima: currentWeather.weathercode,
                velocidadeVento: currentWeather.windspeed,
            };
            dataWeather.objectIconWeather = getIconWeather(dataWeather.codigoClima)
            resolve(dataWeather)
        } catch (error) {
            reject({ error: error })
        }
    })
}

import {
    WiDaySunny,
    WiDayCloudy,
    WiFog,
    WiRain,
    WiThunderstorm,
    WiCloudy
} from 'react-icons/wi'; // Ícones meteorológicos dedicados da biblioteca

export function getIconWeather(weathercode) {
    // 0: Céu limpo / Sol
    if (weathercode === 0) {
        return { icon: WiDaySunny, color: '#FFD700', text: 'Ensolarado' };
    }
    // 1, 2, 3: Parcialmente nublado / Ensolarado com nuvens
    else if (weathercode >= 1 && weathercode <= 3) {
        return { icon: WiDayCloudy, color: '#A0AAB2', text: 'Nublado' };
    }
    // 45, 48: Nevoeiro / Névoa
    else if (weathercode === 45 || weathercode === 48) {
        return { icon: WiFog, color: '#95A5A6', text: 'Nevoeiro' };
    }
    // 51 a 67, 80 a 82: Chuva / Garoa / Pancadas
    else if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) {
        return { icon: WiRain, color: '#36AAC7', text: 'Chuvoso' };
    }
    // 95, 96, 99: Tempestade
    else if (weathercode >= 95) {
        return { icon: WiThunderstorm, color: '#E74C3C', text: 'Tempestade' };
    }

    // Padrão / Outros
    return { icon: WiCloudy, color: '#36AAC7', text: 'Tempo bom' };
}

var count = 0
export async function getDolarExchangeRate() {
    return new Promise(async (resolve, reject) => {
        count++
        try {
            const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            resolve(data)
        } catch (error) {
            reject({ error: error })
        }
    })
}

export async function APIsCAller(arrayChildren, ChildrenSlidingToast, setComponentContent) {
    Promise.all([getWeatherByLocation(), getDolarExchangeRate()]).then((values) => {
        const dataWeather = values[0]
        const dataDolar = values[1]
        console.warn(dataWeather?.error, dataDolar?.eror, dataWeather, dataDolar)
        if (dataWeather?.error == undefined) {
            console.info('dataWeather diferente de null >>> ', dataWeather)
            const IconWeatherComponent = (dataWeather?.objectIconWeather?.icon)
            const WeatherComponent = (
                <div className={`flex flex-row items-center justify-center`}>
                    <span className={`text-4xl`}><IconWeatherComponent color={dataWeather?.objectIconWeather?.color} /></span>
                    {`Em ${dataWeather?.cidade}-${dataWeather?.estado}, faz ${dataWeather?.temperatura}°C, Velocidade do Vento: ${dataWeather?.velocidadeVento?.toString()?.replace('.', ',')} km/h, sendo um dia ${dataWeather?.objectIconWeather?.text}. Tenha uma ótimo dia. `}
                </div>
            )
            arrayChildren.push(WeatherComponent)
        }
        if (dataDolar?.error == undefined) {
            const data = dataDolar
            let newText = `${`Dólar Compra: US$ ${data.USDBRL.bid} | Dólar Venda: US$ ${data.USDBRL.ask} | Variação: US$ ${data.USDBRL.pctChange} | Máxima do dia: US$ ${data.USDBRL.high} | Mínima do dia: US$ ${data.USDBRL.low} | Data de Criação/Registro: ${data.USDBRL.create_date}`}`
            const DolarComponent = (
                <div className={`flex flex-row items-center justify-center`}>
                    <span className={`tex-4xl`}>
                        <FaDollarSign />
                        {newText}
                    </span>
                </div>
            )
            arrayChildren.push(DolarComponent)
        }
        setComponentContent(<ChildrenSlidingToast children={arrayChildren}/>)
    })
}