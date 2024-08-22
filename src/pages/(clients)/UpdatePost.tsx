import { useParams } from "react-router-dom"
import FormPost from "../../components/(clients)/FormPost"

const UpdatePost = () => {
    const {id} = useParams();
  return (
    <div><p>UpdatePost</p>
    <FormPost id={id as string}/>
    </div>
  )
}

export default UpdatePost