

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
                break
                return ano;
            }
        } catch (e) {
            // Se falhar esta API, passa para a próxima da lista
            continue;
        }
    }

    // Se todas as APIs de rede falharem, usa a data do dispositivo como última opção
    return new Date().getFullYear();
}