import { useActionState } from "react";
export function NewOpinion() {
  function opinoinAction(prevState, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];
    if (!userName) {
      errors.push('add a user name');
    }
    if (!title) {
      errors.push('add a titel');
    }
    if (!body) {
      errors.push('add a body');
    }

    if (errors.length > 0) {
      return { errors: errors }
    }
    return {errors:null}
  }
  const [formState,fromAction,pending] = useActionState(opinoinAction,{errors:null});

  return (
    <form action={fromAction}>
      <div id="new-opinion">
        <h2>Share your opinion!</h2>
        <form>
          <div className="control-row">
            <p className="control">
              <label htmlFor="userName">Your Name</label>
              <input type="text" id="userName" name="userName" />
            </p>

            <p className="control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </p>
          </div>
          <p className="control">
            <label htmlFor="body">Your Opinion</label>
            <textarea id="body" name="body" rows={5}></textarea>
          </p>

          <p className="actions">
            <button type="submit">Submit</button>
          </p>
        </form>
      </div>
    </form>
  );
}
