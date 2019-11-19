export interface RetornoRodada {
     CodigoJogo: number,
     Diretorio: string,
     NumeroRodada: number,
     Palavras: [
        {CodigoAcerto: number, Palavra: string},
        {CodigoAcerto: number, Palavra: string},
        {CodigoAcerto: number, Palavra: string},
        {CodigoAcerto: number, Palavra: string}
]
}