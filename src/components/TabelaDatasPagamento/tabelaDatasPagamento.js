import { useEffect, useState } from "react";

export default function TabelaDatasPagamento({
  dataInicial,
  valorParcela,
  quantidadeParcela,
}) {
  const [listaDatas, setListaDatas] = useState([]);

  useEffect(() => {
    // tteste
    // var data = new Date(1995, 02, 01);
    // console.log(data.setDate(data.getDate() + 30));
    // var dataMil = data.setDate(data.getDate() + 30) * 1;
    // var newDate = new Date(dataMil);
    // console.log(dataMil);
    // console.log(newDate, "newDate");

    //meses
    // var data1 = new Date(1995,2,15);
    // console.log(data1.toLocaleDateString());
    // var dataMil = data1.setMonth(data1.getMonth() + 2);
    // var newDate = new Date(dataMil);
    // console.log(dataMil);
    // console.log(newDate.toLocaleDateString(), "newDate");
    
    function montaArrayParcelas() {
      let datas = [];
      for (let i = 1; i <= quantidadeParcela; i++) {
        let dataSplit = dataInicial.split("-");
        var data = new Date(dataSplit[0], dataSplit[1], dataSplit[2]);
        var proximaData = data.setMonth(data.getMonth() + (i-2));
        var newProximaData = new Date(proximaData);
        // console.log(newProximaData.toLocaleDateString(),'calculo');
        

        console.log(dataSplit);
        datas.push({
          key: i,
          data: (newProximaData.toLocaleDateString()),
          valor: valorParcela,
        });
      }

      setListaDatas(datas);
    }
    if (dataInicial !== undefined && dataInicial.length > 0) {
      montaArrayParcelas();
    }
  }, [dataInicial, valorParcela, quantidadeParcela]);
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
          {listaDatas.map((data, index) => {
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
