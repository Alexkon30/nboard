import { useParams, Navigate } from "react-router-dom"
import { Article } from "../../components"
import { useNewsStore } from "../../store";
import { shallow } from "zustand/shallow";

export const ArticlePage = () => {
  const { id } = useParams();

  const { getItemById, setError } = useNewsStore(state => ({
    getItemById: state.getItemById,
    setError: state.setError
  }), shallow)

  if (id === undefined) {
    setError('Parametr "ID" is not specified')
    return <Navigate to="/" replace />
  }

  const item = getItemById(id)

  if (item === undefined) {
    setError('Article not found')
    return <Navigate to="/" replace />
  }

  return (
    <Article article={item}/>
  )
}
