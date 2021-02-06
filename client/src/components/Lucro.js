import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { useSelector } from 'react-redux'
import calcularLucro from '../utils/lucroUtils'

export const Lucro = () => {
  const matriz = useSelector(state => state.Display.matrix)
  const points = useSelector(state => state.Display.points)
  const resultado = useSelector(state => state.Display.result)
  const [tabela, setTabela] = useState({
    labels: ['Investimento', 'Retorno', 'Lucro'],
    values: [0, 0, 0]
  })

  useEffect(() => {
    let newState = calcularLucro(matriz, points)
    setTabela(newState)
  }, [points, matriz, resultado])

  return (
    <Table>
      <TableDataDisplay {...tabela} />
    </Table>
  )
}

const TableDataDisplay = ({ labels, values }) => {
  return (
    <tbody>
      <tr>
        {labels.map((label, index) => (
          <td key={index}>{label}</td>
        ))}
      </tr>
      <tr>
        {values.map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    </tbody>
  )
}
