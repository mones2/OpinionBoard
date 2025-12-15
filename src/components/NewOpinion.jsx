import { useActionState,use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";
export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);
  async function opinoinAction(prevState, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];
    if (userName.length < 4) {
      errors.push(' user name');
    }
    if (title.length < 3) {
      errors.push(' titel');
    }
    if (body.length < 4) {
      errors.push('body');
    }

    if (errors.length > 0) {
      return {
        errors: errors, enteredValues: {
          title, body, userName
        },
      }; 
    }
    await addOpinion({title, body, userName}); 
    return { errors: null }
  }
  const [formState, fromAction, pending] = useActionState(opinoinAction, { errors: null });

  return (
    
      <div id="new-opinion">
        <h2>Share your opinion!</h2>
        <form action={fromAction}>
          <div className="control-row">
            <p className="control">
              <label htmlFor="userName">Your Name</label>
              <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
            </p>

            <p className="control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
            </p>
          </div>
          <p className="control">
            <label htmlFor="body">Your Opinion</label>
            <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
          </p>
          {formState.errors && <ul className="errors">
            {formState.errors.map(error => <li key={error}>{error}</li>)}
            </ul>}

          <Submit />
        </form>
      </div>
  );
}
