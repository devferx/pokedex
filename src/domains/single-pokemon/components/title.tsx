interface Props {
  bgColor: string
  children: React.ReactNode
}

export const Title: React.FC<Props> = ({ bgColor, children }) => {
  return (
    <h3
      className="px-2 text-xl font-bold text-white"
      style={{ background: bgColor }}
    >
      {children}
    </h3>
  )
}
