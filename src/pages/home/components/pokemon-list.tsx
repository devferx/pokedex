interface Props {
  children: React.ReactNode
}

export const PokemonList = ({ children }: Props) => {
  return <div className="flex flex-wrap gap-4">{children}</div>
}
