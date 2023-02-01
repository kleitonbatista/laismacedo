import { useEffect, useState } from "react";

export default function TabelaDatasPagamento({dataInicial, valorParcela, quantidadeParcela}) {
    const [listaDatas, setListaDatas] = useState([]);

    useEffect(()=>{
        function montaArrayParcelas(){
            let datas =[];
            for(let i = 1; i <= quantidadeParcela; i++){
                // console.log(dataInicial, 'aki');
                // const dataInit = new Date(1995, 11, 17);
                // console.log('aniversario', dataInit);
                // console.log(dataInit, "antes soma");
                // var dataSoma = new Date(dataInit.setDate(dataInit.getDate() + 30));
                // console.log(dataSoma, "somada")
                datas.push({
                    key : i,
                    data : dataInicial,
                    valor : valorParcela
                })
            }
            setListaDatas(datas);
        }
        montaArrayParcelas();
    },[dataInicial, valorParcela, quantidadeParcela])
  return (
    <>
      <table className="" style={{ fontSize: "0.7em" }}>
        <thead>
          <tr>
            <th>N</th>
            <th>Data</th>
            <th>R$</th>
          </tr>
        </thead>
        <tbody>
            {listaDatas.map((data, index)=>{
                return (
                    <tr key={index}>
                        <td>{data.key}</td>
                        <td>{data.data}</td>
                        <td>{data.valor}</td>
                    </tr>

                );  
            })}
        </tbody>
      </table>
    </>
  );
}
