import { Link, useParams } from 'react-router-dom'
import { useSinglePokemon } from './hooks'

export const SinglePokemonPage = () => {
  const { id } = useParams()
  const { pokemon, isLoading, isError, error } = useSinglePokemon(id!)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <Link to="/">Volver</Link>
      <code>
        <pre>{JSON.stringify({ pokemon }, null, 2)}</pre>
      </code>
    </div>
  )
}
